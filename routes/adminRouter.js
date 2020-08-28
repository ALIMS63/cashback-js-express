const express = require('express');
// const bcrypt = require('bcrypt');
// const salt = 10;
const User = require('../models/users');
const Cashback = require('../models/cashbacks')
// let toExcel = require('to-excel').toExcel;
let excel = require('excel4node');
let workbook = new excel.Workbook();
let worksheet = workbook.addWorksheet('Sheet 1');
let style = workbook.createStyle({
  font: {
    color: '#FF0800',
    size: 12,
  },
  numberFormat: '$#,##0.00; ($#,##0.00); -',
});

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
    let dataForOut = await User.find();
    if (req.body.docType === 'xls') {
      worksheet.cell(1, 1)
        .string('User')
        .style(style);
      worksheet.cell(1, 2)
        .string('Cashback')
        .style(style);
      for (let i = 0; i < dataForOut.length; i++) {
        worksheet.cell(i + 2, 1)
          .string(dataForOut[i].number)
          .style(style);
        worksheet.cell(i + 2, 2)
          .number(dataForOut[i].cashbackAll)
          .style(style);
      }
      workbook.write('Cashback.xlsx', res);
    } else if (req.body.docType === 'csv') {
      let fullString = '';
      for (let i = 0; i < dataForOut.length; i++) {
        fullString += `${dataForOut[i].number}` + ', ' + `${dataForOut[i].cashbackAll}` + `\n`;
      }
      res.set({
        'Content-Type': 'application/CSV',
        'Content-Disposition': 'attachment;filename=Cashback.csv',
      });
      res.send(fullString);
    };
  })
  .get('/delete', async (req, res) => {
    res.render('admin/deleteUser');
  })
  .post('/deleteUser', async (req, res) => {
    let userForDelCashback = await User.findOne({ number: req.body.phone });

    userCashbackHistory = userForDelCashback.cashbackHistory;
    usecCashbackHistory.forEach(async (element) => {
      cashbackForDel = await Cashback.findOne({ _id: element });
      if (cashbackForDel.cashback === req.body.cashback) {
        cashbackAllChange = userForDelCashback.cashbackAll - req.body.cashback;
        let cashbackAllDown = await User.updateOne({ number: req.body.phone }, { cashbackAll: cashbackAllChange });
        let cashbackDelete = await Cashback.deleteOne({ _id: element });
        res.redirect('/admin');
      }
    })
  })
module.exports = router;
