const router = require("express").Router();

const { getPostsByCityId, getAllCities } = require("../../model/db/cities");

router.get("/cities/:id", (req, res) => {
  getPostsByCityId(Number(req.params.id)).then(cities => {
    res.render("cities", { cities, post });
  });
});

module.exports = router;
