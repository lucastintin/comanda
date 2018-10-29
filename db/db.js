const config = require('./../config/config');
const mongoose = require('mongoose');

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true });

module.exports = {mongoose}