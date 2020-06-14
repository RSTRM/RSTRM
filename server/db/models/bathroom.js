const {
  UUID,
  UUIDV4,
  STRING,
  TEXT,
  INTEGER,
  BOOLEAN,
  FLOAT,
} = require('sequelize')
const db = require('../db')

const Bathroom = db.define('bathroom', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  refugeId: {
    type: INTEGER,
    unique: true,
  },
  unisex: {
    type: BOOLEAN,
  },
  accessible: {
    type: BOOLEAN,
  },
  changingTable: {
    type: BOOLEAN,
  },
  directions: {
    type: TEXT,
  },
  AvgRating: {
    type: INTEGER,
    validate: {
      min: 1,
      max: 5,
    },
  },
  checkinCount: {
    type: INTEGER,
  },
  establishment: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  street: {
    type: STRING,
  },
  city: {
    type: STRING,
  },
  state: {
    type: STRING,
  },
  country: {
    type: STRING,
  },
  latitude: {
    type: FLOAT,
  },
  longitude: {
    type: FLOAT,
  },
  website: {
    type: STRING,
  },
})

/**
 * instanceMethods
 */

Bathroom.prototype.getReviews = async function () {
  return db.models.review.findAll({ where: { bathroomId: this.id } })
}

Bathroom.prototype.getCheckins = async function () {
  return db.models.checkin.findAll({ where: { bathroomId: this.id } })
}

/**
 * classMethods
 */

/**
 * hooks
 */
module.exports = Bathroom
