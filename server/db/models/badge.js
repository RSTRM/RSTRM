const { UUID, UUIDV4, STRING } = require('sequelize')
const db = require('../db')

const Badge = db.define('badge', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
})

module.exports = Badge
