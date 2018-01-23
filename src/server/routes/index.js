const router = require('express').Router()

const authRoutes = require('./authentication')
const postRoutes = require('./posts')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/logout', (req, res) => {
  req.session.destroy(err => console.log)
  res.clearCookie('connect.sid')
  res.redirect('/')

})

module.exports = router
