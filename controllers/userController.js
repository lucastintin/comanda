const express   = require('express');
var router      = express.Router();

//Modelos do Sistema
var {Utils}     = require('./../utils/utils');

//Model
var {User}      = require('./../models/user.model');

router.get('/', (req, res) => {
    res.status(200).send('OK');
});

router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    
    User.findOne({email: email, password: password}, (err, user) => {
        if(!err) {
            return res.status(200).send();
        } else {
            console.log('Credenciais do usuário não são válidas');
            return res.status(500).send();
        }
    });
    
});

router.post('/register', (req, res) => {
    let user = new User({
        email: req.body.email,
        nome: req.body.nome,
        telefone: req.body.telefone,
        dt_nascimento: req. body.dt_nascimento
    });

    user.password = req.body.password; //Fazer hash e salt.


    user.save((err, user) => {
        if(!err){
            Utils.gravarLog(`Usuario: ${user}. Gravado com sucesso.`);
            return res.status(200).send();
        }
    });
});

module.exports = router;