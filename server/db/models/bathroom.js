const { UUID, UUIDV4, STRING, INTEGER, BOOLEAN, FLOAT } = require('sequelize')
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
    type: STRING,
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

module.exports = Bathroom
