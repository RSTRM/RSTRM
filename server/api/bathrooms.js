const router = require("express").Router();
const { Bathroom } = require("../db/models");
const geolib = require("geolib");
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {
  try {
    // const region = req.body.region;
    // const radius = req.params.radius;
    console.log(req.body,'req.params in server')
    const point = {
      latitude: region.latitude,
      longitude: region.longitude
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
