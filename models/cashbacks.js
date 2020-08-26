const { Schema, model } = require('mongoose');

const CashbackSchema = new Schema({
  cashback: Number,
  description: String,
  createdAt: String,
});

module.exports = model('Cashback', CashbackSchema);
