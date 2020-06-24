const router = require("express").Router();
const { Review } = require("../db/models");
const geolib = require("geolib");
const { Op } = require("sequelize");

router.get("/reviews", async (req, res, next) => {
  //To get recent, pass number of days to /:id/reviews?daysWithin=<numOfDays>
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res, next) => {
  Review.create(req.body)
    .then((review) => res.send(review))
    .catch(next);
});

module.exports = router;
