const express   = require('express');
var router      = express.Router();

//Modelos do Sistema
var {Utils}     = require('./../utils/utils');

//Model
var {Produto}   = require('./../models/produto.model');

router.get('/', (req, res) => {
  res.render('./produto/index', { mensagem : null });
});

router.post('/', (req, res) => {
  let produto = new Produto({
    nome: req.body.nome,
    quantidade: req.body.quantidade,
    precoCompra: req.body.precoCompra,
    precoVenda: req.body.precoVenda
  });

  produto.save((err, produto) =>{
    if(!err){
      let msg = `Produto ${produto.nome}. Gravado com sucesso.`;
      Utils.gravarLog(msg);
      res.render('./produto/index', {mensagem: msg});
    }});
});

router.get('/list', (req, res) => {
  Produto.find({}, (err, produtos) => {
    if(!err) {
      res.render('./produto/list', { produtos });
    }
  });
});

module.exports = router;