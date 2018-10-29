const express = require('express');
const router = express.Router();

const clienteController = require('./../controller/cliente.controller');

router.get('/test', clienteController.test);

router.post('/add', clienteController.add);

module.exports = router;