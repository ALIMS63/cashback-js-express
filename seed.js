const db = require('./db');
const User = require('./models/users');
const Cashback = require('./models/cashbacks');

db.then(async ({ disconnect, connection }) => {
  await connection.db.dropDatabase();
  const cashbacks = await Promise.all([
    new Cashback({
      cashback: 200,
      description: 'For your purchase #1',
      createdAt: Date.now(),
    }).save(),
    new Cashback({
      cashback: 400,
      description: 'Gift',
      createdAt: Date.now(),
    }).save(),
    new Cashback({
      cashback: -330,
      description: 'For your purchase #2',
      createdAt: Date.now(),
    }).save(),
  ])
  const users = await Promise.all([
    new User({
      number: '8999999999',
      password: '8999999999',
      cashbackHistory: [cashbacks[0]]
    }).save(),
    new User({
      number: '8-800-555-35-35',
      password: '8-800-555-35-35',
      cashbackHistory: [cashbacks[1], cashbacks[2]]
    }).save(),
  ])
  disconnect()
})
