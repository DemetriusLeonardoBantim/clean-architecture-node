
class AuthUseCase {
  async auth (email) {
    if (!email) {
      throw new Error()
    }
  }
}

describe(('Auth UseCase'), () => {
  test('Should throw if no is provided', async () => {
    const sut = new AuthUseCase()
    const promise = await sut.auth()
    expect(promise).rejects.toThrow()
  })
})
