const express = require('express');
const User = require('../db/models/users.js');
const { unregisterDecorator } = require('handlebars');

const router = express.Router();


router
  .get('/:id', async (req, res) => {
    console.log(req.params.id);
    const user = await User.findOne({ _id: req.params.id }).populate('cashbackHistory');
    console.log(user);
    const total = user.cashbackHistory.reduce((sum, obj) => sum + obj.cashback, 0);
    user.cashbackAll = total;
    await user.save();
    res.render('user/general', { arr: user.cashbackHistory, total });
  });

module.exports = router;
