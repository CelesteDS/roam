const router = require('express').Router()
const { getCityById } = require('../../model/db/cities')
const { getPostById, addPost } = require('../../model/db/posts')
// const users = require('../../model/db/users')

router.get('/posts/new', (req, res) => {
  const cityId = req.query.city_id
  getCityById(cityId)
    .then((city) => {
      res.render('new_post', { cityId, city })
    })
})

router.get('/posts/:id', (req, res) => {
  const cityId = req.params.id
  getPostById(Number(cityId))
    .then((post) => {
      res.render('posts', { post, cityId })
    })
    .catch(console.error)
})


router.post('/posts/new', (req, res) => {
  const { title, content, city_id } = req.body
  const { user } = req.session

  addPost(title, user.id, city_id, content)
    .then((newPost) => {
      if (newPost) {
        return res.redirect(`/cities/${city_id}`)
      }
    })
    .catch(console.error)
})

module.exports = router
