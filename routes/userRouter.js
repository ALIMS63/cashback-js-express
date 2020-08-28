const express = require('express');
const User = require('../db/models/users.js');
const Cashback = require('../db/models/cashbacks.js');
const { unregisterDecorator } = require('handlebars');

const router = express.Router();


router
  .get('/transferCashback', (req, res) => {
    res.render('user/transferCashback');
  })
  .post('/transferCashbackOn', async (req, res) => {
    const userToDown = await User.findOne({ _id: req.session.userid });
    const userToUp = await User.findOne({ number: req.body.phone });
    if (userToDown.cashbackAll * 0.2 >= Number(req.body.cashback && userToUp.cashbackAll)) {
      let newCashbackDown = await new Cashback({ cashback: -req.body.cashback, cost: '-', cause: `Gift to ${userToUp.number}` }).save();
      userToDown.cashbackHistory.push(newCashbackDown._id);
      await userToDown.save();
      let newCashbackUp = await new Cashback({ cashback: -req.body.cashback, cost: '-', cause: `Gift from ${userToDown.number}` }).save();
      userToUp.cashbackHistory.push(newCashbackUp._id);
      await userToUp.save();
      newCashbackDown = userToDown.cashbackAll - Number(req.body.cashback);
      newCashbackUp = userToUp.cashbackAll + Number(req.body.cashback);
      updateCashbackDown = await User.updateOne({ _id: req.session.userid }, { $set: { cashbackAll: Number(newCashbackDown) } });
      updateCashbackUp = await User.updateOne({ number: req.body.phone }, { $set: { cashbackAll: Number(newCashbackUp) } });

    }
    res.render(`user/general`)
  })
  .get('/:id', async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).populate('cashbackHistory');
    const total = user.cashbackHistory.reduce((sum, obj) => sum + obj.cashback, 0);
    user.cashbackAll = total;
    await user.save();
    res.render('user/general', { arr: user.cashbackHistory, total });
  });

module.exports = router;
