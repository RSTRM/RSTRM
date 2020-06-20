const bathroomInfo = require('./refugeData')

const badgesInfo = [
  {
    name: 'welcome',
    nameDisplay: 'Welcome to RSTRM',
    table: 'user',
    formula: 'id !== null',
  },
  {
    name: 'firstCheckin',
    nameDisplay: 'First Check-in',
    table: 'user',
    formula: 'totalCheckins === 1',
  },
  {
    name: 'tenCheckin',
    nameDisplay: 'Ten Check-ins',
    table: 'user',
    formula: 'totalCheckins === 10',
  },
  {
    name: 'fiftyCheckin',
    nameDisplay: 'Fifty Check-ins',
    table: 'user',
    formula: 'totalCheckins === 50',
  },
  {
    name: 'firstReview',
    nameDisplay: 'First Review',
    table: 'user',
    formula: 'totalReviews === 1',
  },
  {
    name: 'tenReview',
    nameDisplay: 'Ten Reviews',
    table: 'user',
    formula: 'totalReviews === 10',
  },
  {
    name: 'fiftyReview',
    nameDisplay: 'Fifty Reviews',
    table: 'user',
    formula: 'totalCheckins === 50',
  },
  {
    name: 'stateNY',
    nameDisplay: "Answering Nature's Call in New York",
    table: 'bathroom',
    formula: "state === 'NY'",
  },
  {
    name: 'stateCO',
    nameDisplay: 'Seeking the Commode in Colorado',
    table: 'bathroom',
    formula: "state === 'CO'",
  },
  {
    name: 'StateOH',
    nameDisplay: 'Checking Out-house in Ohio',
    table: 'bathroom',
    formula: "state === 'OH'",
  },
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
  { nameFirst: 'Vinayak', nameLast: 'Khare' },
]

module.exports = {
  bathroomInfo,
  badgesInfo,
  usersInfo,
}
