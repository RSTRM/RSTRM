const router = require("express").Router();
const { Checkin } = require("../db/models");

router.get("/", (req, res, next) => {
  Checkin.findAll()
    .then((checkins) => res.send(checkins))
    .catch(next);
});

router.post("/", (req, res, next) => {
  Checkin.create(req.body)
    .then((checkin) => res.send(checkin))
    .catch(next);
});

module.exports = router;
