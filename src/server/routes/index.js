const router = require('express').Router()

const postRoutes = require('./posts')
const userRoutes = require('./users')

router.get('/', (req, res) => {
  res.render(/*ejs goes here*/)
})

router.use(postRoutes)
router.use(userRoutes)
module.exports = router
