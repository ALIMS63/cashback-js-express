const express = require('express');
const router = express.Router();
const User = require('../db/models/users')
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

module.exports = router;
