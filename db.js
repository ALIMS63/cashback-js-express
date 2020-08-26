const { connect } = require("mongoose");

module.exports = connect('mongodb+srv://pavel:134qerADF@cluster0.bnkdi.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
