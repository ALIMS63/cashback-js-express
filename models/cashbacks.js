const mongoose = require('mongoose');

const CashbackSchema = mongoose.Schema({
  cashback: Number,
  cost: String,
  cause: String,
  createdAt: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
});

module.exports = mongoose.model('Cashback', CashbackSchema);
