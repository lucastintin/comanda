const express   = require('express');
var router      = express.Router();

//Modelos do Sistema
var {Utils}     = require('./../utils/utils');

//Model
var {Pedido}    = require('./../models/pedido.model');

router.get('/', (req, res) => {
    res.render('./pedido/index');
});

router.post('/', (req, res) => {
    let pedido = new Pedido({
        comanda: req.body.comanda,
        matFuncionario: req.body.matFuncionario,
        item: req.body.item,
        qtd: req.body.qtd
    });

    pedido.save((err, pedido) =>{
        if(!err){
            Utils.gravarLog(`Pedido ${pedido}. Gravado com sucesso.`);
            res.redirect('./pedido/list');
        }
    });
});

router.get('/list', (req, res) => {
    //Tem que ter um filtro por data
    Pedido.find((err, pedidos))
});

module.exports = router;