const jwt = require('jsonwebtoken')
const MissignParamError = require('../errors/missing-param-error')

module.exports = class TokenGenerator {
  constructor(secret){
    this.secret = secret
  }

  async generate(id) {
    if(!this.secret){
      throw new MissignParamError('secret')
    }    
    if(!id){
      throw new MissignParamError('id')
    }          
    return jwt.sign(id, this.secret)
  }
}
