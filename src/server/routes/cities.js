const router = require('express').Router()
const { getPostsByCityId } = require('../../model/db/posts')

router.get('/cities/:id', (req, res) => {
  const cityId = req.params.id

  getPostsByCityId(cityId)
    .then((postInfo) => {
      res.render('/cities', { postInfo })
    })
    .catch((error) => {
      console.error
      res.send(error)
    })
})

module.exports = router
