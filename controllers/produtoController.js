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

router.get('/edit/:id', (req, res) =>{
  Produto.findById(req.params.id, (err, produto) => {
      if(!err) {
          res.render('./produto/edit', {produto});
      }
  })
});

router.post('/edit', (req, res) => {
  Produto.findByIdAndUpdate(req.body.id, {$set:req.body}, (err, produto) => {
      if(!err) {
          Utils.gravarLog(`Produto: ${produto}. Editado com sucesso.`);
          res.redirect('./../../produto/list');
      }
  })
});

router.get('/delete/:id', (req, res) => {
  Produto.findByIdAndRemove(req.params.id, (err, produto) => {
      if(!err) {
          Utils.gravarLog(`Produto: ${produto.nome}. Deletado com sucesso.`);
          res.redirect('./../../produto/list');
      }
  })
});


module.exports = router;