const express = require('express');
const User = require('../models/users.js');
const { unregisterDecorator } = require('handlebars');

const router = express.Router();


router
  .get('/', async (req, res) => {
    const user = await User.findOne({ number: '+7(777) 777 - 77 - 77' }).populate('cashbackHistory');
    console.log(user);
    const total = user.cashbackHistory.reduce((sum, obj) => sum + obj.cashback, 0);
    user.cashbackAll = total;
    await user.save();
    res.render('user/general', { arr: user.cashbackHistory, total });
  });

module.exports = router;

// const bcrypt = require('bcrypt');
// const salt = 10;
