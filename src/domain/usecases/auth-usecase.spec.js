const { MissingParamError } = require('../../utils/errors')

class AuthUseCase {
  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }

    if (!password) {
      throw new MissingParamError('password')
    }
  }
}

describe(('Auth UseCase'), () => {
  test('Should throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    const promise = await sut.auth()
    expect(promise).toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provided', async () => {
    const sut = new AuthUseCase()
    const promise = await sut.auth('any_email@mail.com')
    expect(promise).toThrow(new MissingParamError('password'))
  })
})
