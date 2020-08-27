const mongoose = require('mongoose');
const Cashback = require('./cashbacks.js');

const UserSchema = mongoose.Schema({
  number: String,
  password: String,
  cashbackAll: Number,
  admin: {
    default: false,
    type: Boolean,
  },
  cashbackHistory: [{
    type: mongoose.ObjectId,
    ref: 'Cashback'
  }],
});

module.exports = mongoose.model('User', UserSchema);
