const config = require('./../config/config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URL, { useNewUrlParser: true });

module.exports = {mongoose}