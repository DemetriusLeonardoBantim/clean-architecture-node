const MongoHelper = require('../helpers/mongo-helper')
let db

class UpdateAccessTokenRepository{
  constructor(userModel){
    this.userModel = userModel
  }
  async update(userId, accessToken){
    await this.userModel.updateOne({
      _id: userId
    }, {
      $set: {
        accessToken
      }
    })
  }
}

describe('UpdateAccessToken Repository', () => {

  beforeAll(async () => {
    client = await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.getDb()
  })

  beforeEach(async () => {
    db.collection('users').deleteMany()
  })

  afterAll(async () => {
     await MongoHelper.disconnect()
  })

  test('Should update the user with the given accessToken', async () =>{
    const userModel = db.collection('users')
    const sut = new UpdateAccessTokenRepository(userModel)
    const fakeUser = await userModel.insertOne({
      email:'valid_email@mail.com',
      name:'any_name',
      age:50,
      state:'any_state',
      password:'hashed_password'
    })
    await sut.update(fakeUser.insertedId.toString(), 'valid_token')
    const updatedFakeUser = await userModel.findOne({_id: fakeUser.insertedId.toString()})
    expect(updatedFakeUser.accessToken).toBe('valid_token')

  })
})