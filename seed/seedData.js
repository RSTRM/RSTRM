const bathroomInfo = require('./refugeData')

const badgesInfo = [
  {
    name: 'welcome',
    nameDisplay: 'Welcome to RSTRM',
    table: 'user',
    formula: 'id !== null',
    imageURL: ''
  },
  {
    name: 'firstCheckin',
    nameDisplay: 'First Checkin',
    table: 'user',
    formula: 'totalCheckins === 1',
    imageURL:
      'https://cdn0.iconfinder.com/data/icons/numbers-16/24/one-square-512.png'
  },
  {
    name: 'tenCheckin',
    nameDisplay: 'Ten Checkins',
    table: 'user',
    formula: 'totalCheckins === 10',
    imageURL:
      'https://cdn0.iconfinder.com/data/icons/numbers-16/24/ten-square-512.png'
  },
  {
    name: 'fiftyCheckin',
    nameDisplay: 'Fifty Checkins',
    table: 'user',
    formula: 'totalCheckins === 50',
    imageURL:
      'https://visualpharm.com/assets/892/50-595b40b75ba036ed117d4ee5.svg'
  },
  {
    name: 'firstReview',
    nameDisplay: 'First Review',
    table: 'user',
    formula: 'totalReviews === 1',
    imageURL: 'https://cdn0.iconfinder.com/data/icons/numbers-16/24/one-512.png'
  },
  {
    name: 'tenReview',
    nameDisplay: 'Ten Reviews',
    table: 'user',
    formula: 'totalReviews === 10',
    imageURL: 'https://cdn0.iconfinder.com/data/icons/numbers-16/24/ten-512.png'
  },
  {
    name: 'fiftyReview',
    nameDisplay: 'Fifty Reviews',
    table: 'user',
    formula: 'totalCheckins === 50',
    imageURL:
      'https://visualpharm.com/assets/352/50-595b40b75ba036ed117d5207.svg'
  },
  {
    name: 'stateNY',
    nameDisplay: "Answering Nature's Call in New York",
    table: 'bathroom',
    formula: "state === 'NY'",
    imageURL:
      'data:image/png;base64,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'
  },
  {
    name: 'stateCO',
    nameDisplay: 'Seeking the Commode in Colorado',
    table: 'bathroom',
    formula: "state === 'CO'",
    imageURL:
      'data:image/png;base64,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'
  },
  {
    name: 'StateOH',
    nameDisplay: 'Checking Out-house in Ohio',
    table: 'bathroom',
    formula: "state === 'OH'",
    imageURL:
      'data:image/jpeg;base64,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'
  }
]

const usersInfo = [
  { nameFirst: 'Katt', nameLast: 'Baum', admin: true },
  { nameFirst: 'Denis', nameLast: 'McPhillips', admin: true },
  { nameFirst: 'Valmik', nameLast: 'Vyas', admin: true },
  { nameFirst: 'Yeung', nameLast: 'Lo', admin: true },
  { nameFirst: 'Eric', nameLast: 'Katz' },
  { nameFirst: 'Manny', nameLast: 'Bugallo' },
  { nameFirst: 'Peet', nameLast: 'Klecha' },
  { nameFirst: 'Mark', nameLast: 'Bae' },
  { nameFirst: 'Crystal', nameLast: 'Fields-Sam' },
  { nameFirst: 'Dezzi', nameLast: 'Marshall' },
  { nameFirst: 'Josh', nameLast: 'Avon' },
  { nameFirst: 'Mike', nameLast: 'Olsen' },
  { nameFirst: 'Aleksander', nameLast: 'Kayner' },
  { nameFirst: 'Andres', nameLast: 'Callanaupa' },
  { nameFirst: 'Dan', nameLast: 'Yoo' },
  { nameFirst: 'Diana', nameLast: 'Aguilar' },
  { nameFirst: 'Jonathan', nameLast: 'Cordero' },
  { nameFirst: 'Joshua', nameLast: 'Buchman' },
  { nameFirst: 'Kalvin', nameLast: 'Zhao' },
  { nameFirst: 'Lindsay', nameLast: 'Zurochak' },
  { nameFirst: 'Mark', nameLast: 'Baydoun' },
  { nameFirst: 'Robert', nameLast: 'Peng' },
  { nameFirst: 'Stanley', nameLast: 'Lim' },
  { nameFirst: 'Tandid', nameLast: 'Alam' },
  { nameFirst: 'Thomas', nameLast: 'Kassa' },
  { nameFirst: 'Vinayak', nameLast: 'Khare' }
]

const avatarInfo = [
  {
    name: 'Domo',
    url:
      'https://cdn3.iconfinder.com/data/icons/geek-3/24/Domo_Kun_character-512.png'
  },
  {
    name: 'Toro',
    url:
      'https://cdn3.iconfinder.com/data/icons/geek-3/24/Totoroanimationcharacter-512.png'
  },
  {
    name: 'Autobots',
    url:
      'https://cdn3.iconfinder.com/data/icons/geek-3/24/Autobots_transformers_robot_movie-512.png'
  },
  {
    name: 'R2D2',
    url:
      'https://cdn3.iconfinder.com/data/icons/geek-3/24/R2D2_star_wars_droid_robot-512.png'
  },
  {
    name: 'Groot',
    url:
      'https://cdn3.iconfinder.com/data/icons/geek-3/24/Baby_Groot_guardians_of_galaxy_marvel_movie-512.png'
  },
  {
    name: 'Avengers',
    url:
      'https://cdn3.iconfinder.com/data/icons/geek-3/24/Avengers_marvel_movie_comic_book_action-512.png'
  },
  {
    name: 'StarFleet',
    url:
      'https://cdn3.iconfinder.com/data/icons/geek-3/24/Star-Trek_logo_geek_movie-512.png'
  },
  {
    name: 'Mario',
    url:
      'https://cdn3.iconfinder.com/data/icons/geek-3/24/Mario_Hat_super_mario_retro_video_game-512.png'
  },
  {
    name: 'Snitch',
    url:
      'https://cdn3.iconfinder.com/data/icons/geek-3/24/Golden_Snitch_harry_potter_magic_movie-512.png'
  },
  {
    name: 'Creeper',
    url:
      'https://cdn3.iconfinder.com/data/icons/geek-3/24/Minecraft_Mug_geek_video_game_cup-512.png'
  }
]

module.exports = {
  bathroomInfo,
  badgesInfo,
  usersInfo,
  avatarInfo
}
