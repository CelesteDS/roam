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

module.exports = { sessionChecker, loggedIn }
