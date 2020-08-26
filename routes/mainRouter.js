const express = require('express');
// const bcrypt = require('bcrypt');
// const salt = 10;


const router = express.Router();

router
  .get('/', (req, res) => {
    res.render('index');
  });

module.exports = router;
