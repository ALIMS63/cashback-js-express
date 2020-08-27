const express = require('express');
// const bcrypt = require('bcrypt');
// const salt = 10;
const User = require('../models/users');
const Cashback = require('../models/cashbacks')

const router = express.Router();



router
  .get('/', (req, res) => {
    res.render('admin/admin');
  })
  .post('/create', (req, res) => {
    res.render('admin/newUser');
  })
  .post('/createUser', async (req, res) => {
    let newUser = await new User.create({ number: req.body.phone, password: req.body.pass });
    res.render('admin/secessCreated');
  })
  .post('/addCashback', (req, res) => {
    res.render('admin/addCashback');
  })
  .post('/addCashbackOn', async (req, res) => {
    // let newCashback = await new Cashback.create({ });
    res.render('admin/addCashbackOn');
  })

module.exports = router;
