const db = require('./db');
const User = require('./models/users');
const Cashback = require('./models/cashbacks');

db.then(async ({ disconnect, connection }) => {
  await connection.db.dropDatabase();
  const cashbacks = await Promise.all([
    new Cashback({
      cashback: 200,
      cost: '33200',
      cause: 'Order 956702',
    }).save(),
    new Cashback({
      cashback: 400,
      cost: '-',
      cause: 'Gift',
    }).save(),
    new Cashback({
      cashback: -330,
      cost: '1200',
      cause: 'Order 1233131',
    }).save(),
  ])
  const users = await Promise.all([
    new User({
      number: '8-928-232-67-45',
      password: '8-928-232-67-45',
      cashbackHistory: [cashbacks[0]]
    }).save(),
    new User({
      number: '8-800-555-35-35',
      password: '8-800-555-35-35',
      cashbackHistory: [cashbacks[1], cashbacks[2]]
    }).save(),
    new User({
      number: '8-914-125-75-34',
      password: '8-914-125-75-34',
      cashbackHistory: [cashbacks[1], cashbacks[2]]
    }).save(),
  ])
  disconnect()
})
