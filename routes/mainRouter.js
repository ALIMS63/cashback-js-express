const express = require('express');
const router = express.Router();
const User = require('../models/users')



router.route('/image')
  .get((req, res) => {
    res.render('index');
  })

router.get('/', (req, res) => {
  res.render('authorization');
});

router.post('/api', async (req, res) => {
  const person = await User.find({ number: req.body.number, password: req.body.password })
  console.log(person[0])
  if (person.length != 0) {
    req.session.invalidpass = false
    req.session.admin = person[0].admin
    if (person[0].admin) {
      res.redirect('/admin')
    } else {
      res.redirect('/user')
    }
  }
  req.session.invalidpass = true
  res.redirect('/')
})

module.exports = router;
