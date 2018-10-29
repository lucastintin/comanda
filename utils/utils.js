var moment = require('moment-timezone');
const fs   = require('fs');

var horarioBrasilia = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');

class Utils {

    static gravarLog(mensagem){
        console.log(horarioBrasilia + ' - ' + mensagem);
    }
}

module.exports = {Utils};