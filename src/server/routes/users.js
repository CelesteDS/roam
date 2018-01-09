const router = require('express').Router()
const { addUser, verifyUser, updateProfile } = require('../../model/db/users')

router.get('/sign-up', (req, res) => {
  res.render(/*signup form ejs goes here*/)
})

router.get('/log-in', (req, res) => {
  res.render(/*log in form ejs goes here*/)
})

module.exports = router
