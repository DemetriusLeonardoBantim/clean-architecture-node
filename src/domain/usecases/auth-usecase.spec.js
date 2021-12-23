const { MissingParamError } = require('../../utils/errors')

class AuthUseCase {
  async auth (email) {
    if (!email) {
      throw new Error(new MissingParamError('email'))
    }
  }
}

describe(('Auth UseCase'), () => {
  test('Should throw if no is provided', async () => {
    const sut = new AuthUseCase()
    const promise = await sut.auth()
    console.log()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
})
