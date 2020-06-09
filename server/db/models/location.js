const { UUID, UUIDV4, STRING, INTEGER, FLOAT } = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
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

module.exports = Location
