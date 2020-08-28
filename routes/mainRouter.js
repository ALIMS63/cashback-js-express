const express = require('express');
const router = express.Router();
const User = require('../db/models/users');
require('dotenv').config();


router.route('/image')
  .get((req, res) => {
    res.render('index');
  })
router.get('/', (req, res) => {
  res.render('authorization');
});
router.post('/api', async (req, res) => {
  const person = await User.findOne({ number: req.body.number, password: req.body.password })
  console.log(person)
  if (person) {
    req.session.invalidpass = false;
    req.session.admin = person.admin;
    req.session.userid = person._id;
    if (person.admin) {
      res.redirect('/admin');
    } else {
      res.redirect(`/user/${person._id}`);
    }
  }
  req.session.invalidpass = true
  res.redirect('/')
})

router.get('/api/logout', (req, res) => {
  console.log('im here')
  req.session.destroy()
  res.locals.logout = false
  res.redirect('/')
})

router.post('/telephone', async (req, res) => {
  const accountSid = 'ACed3dc2afb8dde4cb42c75b24ccaf3561';
  const authToken = process.env.TWILO;
  const client = require('twilio')(accountSid, authToken);
  const newUser = await new User({
    number: req.body.number,
    password: 123
  })
  console.log(req.body.number.split(/([+\d+])+/).join())
  client.messages
    .create({
      body: '123',
      from: '+14787724166',
      to: '9150820751'
    })
    .then(message => console.log(message.sid));
  req.session.smssend = true
  res.redirect('/')
})

module.exports = router;
