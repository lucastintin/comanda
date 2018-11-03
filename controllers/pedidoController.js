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
                    res.render('./pedido/list', { pedidos, detalhe: 1 });
                }
            }
        );
    } else {
        Pedido.distinct('numComanda', { isClosed: false }, 
            (err, pedidos) => {
                if(!err) {
                    res.render('./pedido/list', { pedidos, detalhe: null });
                }
            }
        );
    }
});

router.get('/delete/:id', (req, res) => {
    Pedido.findByIdAndRemove(req.params.id, (err, pedido) => {
        if(!err) {
            Utils.gravarLog(`Pedido: ${pedido}. Deletado com sucesso.`);
            res.redirect(`./../../pedido/list?comanda=${pedido.numComanda}`);
        }
    })
});

router.get('/fechar', (req, res) => {
    Pedido.updateMany({ numComanda: req.query.comanda, isClosed: false}, 
        { $set: { isClosed: true } },
        (err, pedidos) => {
            if(!err){
                res.redirect(`/cliente/fechar?comanda=${req.query.comanda}`);
            }
        }
    );    
});

router.get('/report/fechados', (req, res) => {
    let startDate;
    let endDate;
    if (!req.query.dtInicio){
        startDate = moment().format('YYYY-MM-DD 00:00:00.000');
    } else {
        startDate = moment(req.query.dtInicio).format('YYYY-MM-DD 00:00:00.000');
    }
    if (!req.query.dtFim){
        endDate = moment().format('YYYY-MM-DD 23:59:59.999');;
    } else {
        endDate = moment(req.query.dtFim).format('YYYY-MM-DD 23:59:59.999');;
    }
    // console.log(startDate);
    // console.log(endDate);

    Pedido.find({'isClosed': true, 'createdAt': { $gte: startDate, $lt: endDate } }, (err, pedidos) => {
        if(!err){
            res.render('./pedido/rel_fechados', { pedidos
                // pedidos : {
                // createdAt: moment(doc.createdAt).format('DD-MM-YYYY'),
                // item: doc.item,
                // qtd: doc.qtd
                // }
            })
            console.log(pedidos);
        }
    });

    
});


module.exports = router;