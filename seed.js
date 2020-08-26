const db = require('./db');
const User = require('./models/users');
const Cashback = require('./models/cashbacks');

db.then(async ({ disconnect, connection }) => {
  await connection.db.dropDatabase();
  const cashbacks = await Promise.all([
    new Cashback({
      cashback: 200,
      cost: 33200,
      orderNumber: 121,
      description: 'For your purchase #1',
      createdAt: new Date(),
    }).save(),
    new Cashback({
      cashback: 400,
      cost: 800,
      orderNumber: 21,
      description: 'Gift',
      createdAt: new Date(),
    }).save(),
    new Cashback({
      cashback: -330,
      cost: 1200,
      orderNumber: 31,
      description: 'For your purchase #2',
      createdAt: new Date(),
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
