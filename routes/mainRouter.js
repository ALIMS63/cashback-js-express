const express = require('express');
const router = express.Router();
const User = require('../models/users')

router.use((req, res, next) => {
  //неправильный пароль
  if (req.session.invalidpass) {
    res.locals.invalidpass = true;
  } else {
    res.locals.invalidpass = false;
  }
  next()
})

router.get('/', (req, res) => {
  res.render('authorization');
});

router.post('/api', async (req, res) => {
  const person = await User.find({ number: req.body.number, password: req.body.password })
  if (person.length != 0) {
    req.session.invalidpass = false
    console.log(person[0].number)
    console.log(req.session.user)
    req.session.user = person[0].number
    console.log(req.session.user)
    res.redirect('/admin')
  }
  req.session.invalidpass = true
  console.log(req.session.invalidpass)
  res.redirect('/')
})

module.exports = router;
