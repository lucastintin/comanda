const express   = require('express');
var router      = express.Router();

//Modelos do Sistema
var {Utils}     = require('./../utils/utils');

//Model
var {Cliente}   = require('./../models/cliente.model');

router.get('/', (req, res) => {
    res.render('./cliente/index');
});

router.post('/', (req, res) => {

    let cliente = new Cliente({
        nome: req.body.nome,
        telefone: req.body.telefone
    });

    cliente.save((err, doc) => {
        if(!err){
            Utils.gravarLog(`Cliente: ${cliente}. Gravado com sucesso.`);
            res.redirect('./cliente/list');
        }
    })
    //DEPRECATED
    // var gravou = await cliente.save();
    // if (gravou) {
    //     Utils.gravarLog(`Cliente: ${cliente}. Gravado com sucesso.`);
    //     res.status(200).redirect('/cliente');
    // }
});

router.get('/list', (req, res) => {
    Cliente.find((err, clientes) =>{
        if(!err) {
            res.render('./cliente/list', { clientes });
        }
    });
});

module.exports = router;