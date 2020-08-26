const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  number: String,
  password: String,
  cashbackAll: Number,
  cashbackHistory: [{
    type: Schema.Types.ObjectId,
    ref: 'Purchase'
  }],
});

module.exports = model('User', UserSchema);
