const User = require('./user')
const Bathroom = require('./bathroom')
const Review = require('./review')
const Checkin = require('./checkin')
const Image = require('./image')
const Badge = require('./badge')
const UserBadge = require('./user-badge')
// const BadgeCriteria = require('./badge-criteria')
// const Criteria = require('./criteria')

Review.belongsTo(User)
User.hasMany(Review, {
  foreignKey: {
    allowNull: false,
  },
})
Review.belongsTo(Bathroom)
Bathroom.hasMany(Review, {
  foreignKey: {
    allowNull: false,
  },
})

Checkin.belongsTo(User)
User.hasMany(Checkin, {
  foreignKey: {
    allowNull: false,
  },
})
Checkin.belongsTo(Bathroom)
Bathroom.hasMany(Checkin, {
  foreignKey: {
    allowNull: false,
  },
})

Review.belongsTo(Checkin)
Checkin.hasOne(Review, {
  foreignKey: {
    allowNull: false,
  },
})

Image.belongsTo(User)
User.hasMany(Image)
Image.belongsTo(Bathroom)
Bathroom.hasMany(Image)

UserBadge.belongsTo(User)
User.hasMany(UserBadge, {
  foreignKey: {
    allowNull: false,
  },
})
UserBadge.belongsTo(Badge)
Badge.hasMany(UserBadge, {
  foreignKey: {
    allowNull: false,
  },
})

// BadgeCriteria.belongsTo(Badge)
// Badge.hasMany(BadgeCriteria, {
//   foreignKey: {
//     allowNull: false,
//   },
// })

// BadgeCriteria.belongsTo(Criteria)
// Criteria.hasMany(BadgeCriteria, {
//   foreignKey: {
//     allowNull: false,
//   },
// })

module.exports = {
  User,
  Bathroom,
  Review,
  Checkin,
  Image,
  Badge,
  UserBadge,
  // BadgeCriteria,
  // Criteria,
}
