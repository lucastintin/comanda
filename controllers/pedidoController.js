const express   = require('express');
var router      = express.Router();

router.get('/', (req, res) => {
    res.send('Dentro de pedido por rota.');
});

module.exports = router;