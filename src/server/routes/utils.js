const bcrypt = require('bcrypt')

const sessionChecker = (req, res, next) => {
  const sid = req.sessionId
}

const loggedIn = (req, res, next) => {
  if (req.session.user) {
    res.locals.loggedIn = true
    next()
  } else {
    res.locals.loggedIn = false
    next()
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

const comparePassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword)

module.exports = {
  sessionChecker, loggedIn, hashPassword, comparePassword,
}
