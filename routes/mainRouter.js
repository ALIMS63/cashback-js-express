const express = require('express');
const router = express.Router();
const User = require('../models/users');
const { registerDecorator } = require('handlebars');
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

//отправка sms
router.post('/telephone', async (req, res) => {
  //подключение twilio
  const accountSid = 'ACed3dc2afb8dde4cb42c75b24ccaf3561';
  const authToken = process.env.TWILO;
  const client = require('twilio')(accountSid, authToken);
  //поиск юзера по базе
  const currentUser = await User.findOne({ number: req.body.number })
  //валидация инпута телефона
  req.body.number.match(/\+|[\d]+/g).join('')
  if (currentUser) {
    //если пользователь найден
    //создание пароля
    const digits = '0123456789';
    let newPass = '';
    for (let i = 0; i < 4; i++) {
      newPass += digits[Math.floor(Math.random() * 10)];
    }
    await User.updateOne({ _id: currentUser._id }, { $set: { password: newPass } })
    client.messages
      .create({
        body: `${newPass}`,
        from: '+14787724166',
        to: req.body.number.match(/\+|[\d]+/g).join('')
      })
      .then(message => console.log(message.sid));
    //выводит возможность ввести пароль
    req.session.smssend = true
    return res.redirect('/')
  } else {
    //выводит нет данного телефона в базе
    req.session.cantfind = true
    res.redirect('/')
  }
})

//есть пароль
router.post('/havepassword', (req, res) => {
  req.session.smssend = true
  return res.redirect('/')
})
module.exports = router;
