var moment = require('moment-timezone');

var horarioBrasilia = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');

class Utils {

    gravarLog(mensagem){
        console.log(horarioBrasilia + ' - ' + mensagem);
    }
}

module.exports = {Utils};