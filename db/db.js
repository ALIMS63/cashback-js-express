const mongoose = require("mongoose");

module.exports = mongoose.connect('mongodb+srv://pavel:134qerADF@cluster0.bnkdi.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
