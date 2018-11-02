const moment    = require('moment');
const express   = require('express');
var router      = express.Router();

//Modelos do Sistema
var {Utils}     = require('./../utils/utils');

//Model
var {Pedido}    = require('./../models/pedido.model');

router.get('/', (req, res) => {
    res.render('./pedido/index', { mensagem : null });
});

router.post('/', (req, res) => {
    let pedido = new Pedido({
        numComanda: req.body.numComanda,
        matFuncionario: req.body.matFuncionario,
        item: req.body.item,
        qtd: req.body.qtd
    });

    pedido.save((err, pedido) =>{
        if(!err){
            Utils.gravarLog(`Pedido ${pedido}. Gravado com sucesso.`);
            res.render('./pedido/index', { mensagem: 'Pedido gravado com sucesso.'});
        }
    });
});

router.get('/list', (req, res) => {
    if (req.query.comanda) {
        Pedido.find({ numComanda: req.query.comanda, isClosed: false}, 
            (err, pedidos) => {
                if(!err) {
                    res.render('./pedido/list', { pedidos});
                }
            }
        );
    } else {
        res.render('./pedido/list', { pedidos: null});
    }
});


module.exports = router;