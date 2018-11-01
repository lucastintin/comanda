const config = require('./../config/config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URL, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('ERRO: Conexão com banco de dados.');
    }
});

module.exports = {mongoose}