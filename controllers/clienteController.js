const express   = require('express');
var router      = express.Router();

//Modelos do Sistema
var {Utils}     = require('./../utils/utils');

//Model
var {Cliente}   = require('./../models/cliente.model');

router.get('/', (req, res) => {
    res.render('./cliente/index');
});

router.post('/', async (req, res) => {

    let cliente = new Cliente({
        nome: req.body.nome,
        telefone: req.body.telefone
    });

    var gravou = await cliente.save();
    if (gravou) {
        Utils.gravarLog(`Cliente: ${cliente}. Gravado com sucesso.`);
        res.status(200).redirect('/cliente');
    }
});

router.get('/list', (req, res) => {
    Cliente.find().then((clientes) => {
        res.send(clientes);
    }, (erro) =>{
        res.status(400).send(erro);
    });
});

module.exports = router;