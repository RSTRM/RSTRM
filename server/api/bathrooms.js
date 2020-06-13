const router = require("express").Router();
const { Bathroom } = require("../db/models");
const geolib = require("geolib");
const { Op } = require("sequelize");

router.get("/:latitude/:longitude/:radius", async (req, res, next) => {
  try {
    console.log(req.body, 'body');
    const radius = req.params.radius;
    const point = {
      latitude: req.params.latitude,
      longitude: req.params.longitude
    };
    const result = geolib.getBoundsOfDistance(point, radius);
    console.log(result, "result");
    const bathrooms = await Bathroom.findAll({
      where: {
        latitude: { [Op.between]: [result[0].latitude, result[1].latitude] },
        longitude: { [Op.between]: [result[0].longitude, result[1].longitude] }
      }
    });
    res.json({ count: bathrooms.length, bathrooms });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
