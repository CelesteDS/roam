const router = require('express').Router()
const { addPost, getPostsByUserId, getPostById } = require('../../model/db/posts')

router.get('/post/:id', (req, res) => {
  getPostById(Number(req.params.id))
    .then((post) => {
      res.render('post', { post })
    })
})

module.exports = router
