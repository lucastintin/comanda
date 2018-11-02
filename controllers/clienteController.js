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
        telefone: req.body.telefone,
        numComanda: req. body.numComanda
    });

    cliente.save((err, cliente) => {
        if(!err){
            Utils.gravarLog(`Cliente: ${cliente}. Gravado com sucesso.`);
            res.redirect('./cliente/list');
        }
    })
});

router.get('/list', (req, res) => {
    if (req.query.telefone) {
        Cliente.find({ telefone: req.query.telefone}, 
            (err, clientes) => {
                if(!err) {
                    res.render('./cliente/list', { clientes});
                }
            }
        );
    } else {
        Cliente.find((err, clientes) =>{
            if(!err) {
                res.render('./cliente/list', { clientes });
            }
        });
    }
});

router.get('/edit/:id', (req, res) =>{
    Cliente.findById(req.params.id, (err, cliente) => {
        if(!err) {
            res.render('./cliente/edit', {cliente});
        }
    })
});

router.post('/edit', (req, res) => {
    Cliente.findByIdAndUpdate(req.body.id, {$set:req.body}, (err, cliente) => {
        if(!err) {
            Utils.gravarLog(`Cliente: ${cliente}. Editado com sucesso.`);
            res.redirect('./../../cliente/list');
        }
    })
});

router.get('/delete/:id', (req, res) => {
    Cliente.findByIdAndRemove(req.params.id, (err, cliente) => {
        if(!err) {
            Utils.gravarLog(`Cliente: ${cliente}. Deletado com sucesso.`);
            res.redirect('./../../cliente/list');
        }
    })
});

module.exports = router;