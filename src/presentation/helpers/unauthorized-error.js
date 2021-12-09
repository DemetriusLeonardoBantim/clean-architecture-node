module.exports = class UnauthorizedError extends Error {
  constructor (paramName) {
    super('Unauthorized error')
    this.name = 'UnauthorizedError'
  }
}
