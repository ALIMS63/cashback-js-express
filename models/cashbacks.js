const { Schema, model } = require('mongoose');

const CashbackSchema = new Schema({
  cashback: Number,
  cost: Number,
  orderNumber: Number,
  description: String,
  createdAt: String,
});

module.exports = model('Cashback', CashbackSchema);
