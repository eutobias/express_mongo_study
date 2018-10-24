const config = require('./config');
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI || config.db.url;
mongoose.connect(mongoDB, {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;