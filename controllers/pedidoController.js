const express   = require('express');
var router      = express.Router();

//Modelos do Sistema
var {Pedido}    = require('./../models/pedido.model');

router.get('/', (req, res) => {
    res.render('./pedido/index');
});

router.post('/', (req, res) => {
    res.send('bateu');
});

module.exports = router;