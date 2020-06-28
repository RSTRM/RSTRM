const router = require("express").Router();
const { Bathroom } = require("../db/models");
const geolib = require("geolib");
const { Op } = require("sequelize");

router.get("/:latitude/:longitude/:radius", async (req, res, next) => {
  try {
    const radius = req.params.radius;
    const point = {
      latitude: req.params.latitude,
      longitude: req.params.longitude,
    };
    const result = geolib.getBoundsOfDistance(point, radius);

    let whereStatement = {
      latitude: { [Op.between]: [result[0].latitude, result[1].latitude] },
      longitude: {
        [Op.between]: [result[0].longitude, result[1].longitude],
      },
    };
    if (req.query.unisexFilter === "on") {
      whereStatement.unisex = true;
    }
    if (req.query.accessibleFilter === "on") {
      whereStatement.accessible = true;
    }
    if (req.query.changingFilter === "on") {
      whereStatement.changingTable = true;
    }
    if (parseInt(req.query.minimumRating) > 1) {
      whereStatement.avgRating = {
        [Op.gte]: parseInt(req.query.minimumRating),
      };
    }

    let bathrooms = await Bathroom.findAll({
      where: whereStatement,
    });

    bathrooms.sort(function (a, b) {
      return (
        geolib.getDistance(
          { latitude: a.latitude, longitude: a.longitude },
          point
        ) -
        geolib.getDistance(
          { latitude: b.latitude, longitude: b.longitude },
          point
        )
      );
    });

    res.json(bathrooms);
  } catch (err) {
    next(err);
  }
});

router.get("/:bathroomId/reviews", async (req, res, next) => {
  //To get recent, pass number of days to /:id/reviews?daysWithin=<numOfDays>
  try {
    let bathroom = await Bathroom.findByPk(req.params.bathroomId);

    let reviews = {};
    if (req.query.daysWithin !== undefined) {
      reviews = await bathroom.getReviews(req.query.daysWithin);
    } else {
      reviews = await bathroom.getReviews();
    }
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

router.get("/:bathroomId/rating", async (req, res, next) => {
  try {
    const bathroom = await Bathroom.findByPk(req.params.bathroomId);
    const rating = await bathroom.getAvgRating();
    res.json(rating);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/checkins", async (req, res, next) => {
  //To get recent, pass number of days to /:id/checkins?daysWithin=<numOfDays>
  try {
    const bathroom = await Bathroom.findByPk(req.params.id);
    let checkins;
    if (req.query.daysWithin) {
      checkins = await bathroom.getReviews(req.query.daysWithin);
    } else {
      checkins = await bathroom.getReviews();
    }
    res.json(checkins);
  } catch (err) {
    next(err);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const bathroom = await Bathroom.create(req.body);
    res.json(bathroom);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
