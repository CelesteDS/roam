const bcrypt = require('bcrypt')

const sessionChecker = (request, response, next) => {
  const sid = request.sessionId
}

const loggedIn = (request, response, next) => {
  if (!request.session.user_id) {
    return false
  } else {
    return true
  }
}

/**
 * hashes password using bcrypt
 * @param  {string} password 72 characters or less
 * @return {Promise} - resolves to hashed password
 */
const hashPassword = (password) => {
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword)
}
module.exports = { sessionChecker, loggedIn, hashPassword, comparePassword }
