const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')
// sut = System under test

const MakeSut = () => {
  return new LoginRouter()
}

describe('Login router', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = MakeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const sut = MakeSut()
    const httpRequest = {
      body: {
        email: 'any_password@hotmail.com'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 500 if no httpRequest is provided', () => {
    const sut = MakeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if httpRequest has no body', () => {
    const sut = MakeSut()
    const httpResponse = sut.route({})
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should call AuthUseCase with correct params', () => {
    const sut = MakeSut()
    const httpResponse = sut.route({})
    expect(httpResponse.statusCode).toBe(500)
  })
})
