const { MongoClient } = require('mongodb')

let client, db

class LoadUserByEmailRepository{
  constructor(userModel) {
    this.userModel = userModel
  }

  async load(email) {
    const user = await this.userModel.findOne({email})
    return user
  }
}

const makeSut = () =>{
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return {
    userModel,
    sut
  }
}


describe('LoadUserByEmail Repository',  () => {

  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser:true,
      useUnifiedTopology:true
    })
    db = client.db()
  })

  beforeEach(async () => {
    db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await client.close()
  })


  test('Should return null if no user is found', async () => {
    const {sut} = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const {sut, userModel} = makeSut()
    const fakeUser = await userModel.insertOne({
      email:'valid_email@mail.com',
      name:'any_name',
      age:50,
      state:'any_state',
      password:'hashed_password'
    })
    const user = await sut.load('valid_email@mail.com')
    expect(user.email).toEqual('valid_email@mail.com')
    expect(user._id.toString()).toEqual(fakeUser.insertedId.toString())
  })
})