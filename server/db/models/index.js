const User = require('./user')
const Bathroom = require('./bathroom')
const Review = require('./review')
const Checkin = require('./checkin')
const Image = require('./image')

Review.belongsTo(User)
User.hasMany(Review)
Review.belongsTo(Bathroom)
Bathroom.hasMany(Review)

Checkin.belongsTo(User)
User.hasMany(Checkin)
Checkin.belongsTo(Bathroom)
Bathroom.hasMany(Checkin)

Image.belongsTo(User)
User.hasMany(Image)
Image.belongsTo(Bathroom)
Bathroom.hasMany(Image)

module.exports = {
  User,
  Bathroom,
  Review,
  Checkin,
  Image,
}
