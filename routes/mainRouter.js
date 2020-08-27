const express = require('express');
const router = express.Router();
const User = require('../models/users')

router.get('/', (req, res) => {
  res.render('authorization');
});

router.post('/api', async (req, res) => {
  const person = await User.find({ number: req.body.number, password: req.body.password })
  if (person.length != 0) {
    console.log(person[0].number)
    console.log(req.session.user)
    req.session.user = person[0].number
    console.log(req.session.user)
    res.redirect('/admin')
  }
  res.redirect('/')
})

module.exports = router;
