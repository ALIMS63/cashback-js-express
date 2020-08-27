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
  .post('/create', (req, res) => {
    res.render('admin/newUser');
  })
  .post('/createUser', async (req, res) => {

    let newUser = await new User({ number: req.body.phone, password: req.body.pass });
    res.redirect('/admin');
  })
  .post('/addCashback', (req, res) => {
    res.render('admin/addCashback');
  })
  .post('/addCashbackOn', async (req, res) => {
    console.log(req.body);
    let newCashback = await new Cashback({ });
    res.redirect('/admin');
  })
  .post('/unload', async (req, res) => {
    // if (req.body === 'xls') {



    //   var content = toExcel.exportXLS(headers, data, 'filename');
    //   require('fs').writeFileSync('filename.xls', content);

    // } else {

    // };
  })
  .post('/delete', async (req, res) => {
    res.render('admin/deleteUser');
  })
  .post('/deleteUser', async (req, res) => {
    // let delUser = await User.delete({number: req.body.phone})
    res.redirect('/admin')
  })

module.exports = router;
