const { UUID, UUIDV4, STRING } = require('sequelize')
const db = require('../db')

const Criteria = db.define('criteria', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  table: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  formula: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
})

module.exports = Criteria
