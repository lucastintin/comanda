const express   = require('express');
var router      = express.Router();

var {Cliente}   = require('./../models/cliente.model');

router.get('/', (req, res) => {
    res.render('./cliente/index');
});

router.post('/add', (req, res) => {

    let cliente = new Cliente({
        nome: req.body.nome,
        telefone: req.body.telefone
    }); 

    //O codigo funciona, porém a promsessa não. Ele salva e vai direto.
    //Provavelmente eu tenho que tratar a promessa do lado de fora.
    return cliente.save()
        .then((cliente) => {
            Utils.gravarLog(`Cliente: ${cliente}. Gravado com sucesso.`);
            res.status(200).redirect('/');;
        })
        .catch((erro) => {
            res.status(400).send(erro);
        });
    
});

router.get('/list', (req, res) => {
    Cliente.find().then((clientes) => {
        res.send(clientes);
    }, (erro) =>{
        res.status(400).send(erro);
    });
});

module.exports = router;