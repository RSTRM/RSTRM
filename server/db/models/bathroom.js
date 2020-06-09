const { UUID, UUIDV4, STRING, INTEGER, ENUM, BOOLEAN } = require('sequelize')
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
  type: {
    type: ENUM(['N', 'F', 'M']),
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
  rating: {
    type: INTEGER,
    validate: {
      min: 1,
      max: 5,
    },
  },
  confirmed: {
    type: BOOLEAN,
  },
  checkinCount: {
    type: INTEGER,
  },
})

module.exports = Bathroom
