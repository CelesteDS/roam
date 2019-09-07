const router = require('express').Router()

const authRoutes = require('./authentication')
const postRoutes = require('./posts')
const usersRoutes = require('./users')
const cityRoutes = require('./cities')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/logout', (req, res) => {
  req.session.destroy(err => console.log(err))
  res.clearCookie('connect.sid')
  res.redirect('/')
})

router.use('/', authRoutes)
router.use('/', postRoutes)
router.use('/', usersRoutes)
router.use('/', cityRoutes)

module.exports = router
