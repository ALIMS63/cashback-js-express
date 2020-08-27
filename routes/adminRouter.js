const express = require('express');
// const bcrypt = require('bcrypt');
// const salt = 10;
const User = require('../models/users');
const Cashback = require('../models/cashbacks')
let toExcel = require('to-excel').toExcel;
const router = express.Router();



router
  .get('/', (req, res) => {
    res.render('admin/admin');
  })
  .get('/create', (req, res) => {
    res.render('admin/newUser');
  })
  .post('/createUser', async (req, res) => {
    let newUser = await new User({ number: req.body.phone, password: req.body.pass, cashbackAll: 0 }).save();
    res.redirect('/admin');
  })
  .get('/addCashback', (req, res) => {
    res.render('admin/addCashback');
  })
  .post('/addCashbackOn', async (req, res) => {
    console.log(req.body);
    let newCashback = await new Cashback({ cashback: req.body.cashback, cost: req.body.orderCost, cause: req.body.cause, }).save();
    let userForUpdate = await User.findOne({ number: req.body.phone });
    let cashbackCalc = parseInt(req.body.cashback) + userForUpdate.cashbackAll;
    let userCashback = userForUpdate.cashbackHistory;
    console.log(newCashback._id);
    userCashback.push(newCashback._id)
    let userUpdate = await User.updateOne({ _id: userForUpdate._id }, { cashbackAll: cashbackCalc, cashbackHistory: userCashback });
    res.redirect('/admin');
  })
  .post('/unload', async (req, res) => {
    // if (req.body === 'xls') {



    //   var content = toExcel.exportXLS(headers, data, 'filename');
    //   require('fs').writeFileSync('filename.xls', content);

    // } else {

    // };
  })
  .get('/delete', async (req, res) => {
    res.render('admin/deleteUser');
  })
  .post('/deleteUser', async (req, res) => {
    let userForDel = await User.findOne({ number: req.body.phone });
    if (userForDel.password === req.body.pass) {
      let userDelete = await User.deleteOne({ number: req.body.phone })
    }
    res.redirect('/admin')
  })

module.exports = router;
