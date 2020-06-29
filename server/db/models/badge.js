const { UUID, UUIDV4, STRING, TEXT } = require('sequelize')
const db = require('../db')

const Badge = db.define('badge', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  nameDisplay: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageURL: {
    type: TEXT
  },
  table: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  formula: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Badge
