const router = require('express').Router()
const {
  addUser,
  verifyUser,
  updateProfile,
  getgetgetUserById,
} = require('../../model/db/users')
const { sessionChecker, hashPassword, comparePassword } = require('./utils')

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', (req, res) => {
  const {
    fullName, email, password, current_city,
  } = req.body
  hashPassword(password).then((hashedPassword) => {
    addUser(fullName, email, hashedPassword, current_city)
      .then((user) => {
        if (user) {
          req.session.user = user
          const userId = req.session.user.id
          return res.redirect(`/profile/${userId}`)
        }
      })
      .catch(console.error)
  })
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  verifyUser(email)
    .then((user) => {
      comparePassword(password, user.password).then((isValid) => {
        if (isValid) {
          req.session.user = user
          return res.redirect(`/profile/${user.id}`)
        }
        return res.redirect('/login')
      })
    })
    .catch(console.error)
})

module.exports = router
