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
      number: '+7(777) 777 - 77 - 77',
      password: '123',
      admin: true,
      cashbackHistory: []
    }).save(),
    new User({
      number: '+7(777) 888 - 77 - 77',
      password: '123',
      cashbackHistory: [cashbacks[1], cashbacks[0]]
    }).save(),
    new User({
      number: '+7(777) 999 - 77 - 77',
      password: '123',
      cashbackHistory: [cashbacks[1], cashbacks[2]]
    }).save(),
  ])
  disconnect()
})
