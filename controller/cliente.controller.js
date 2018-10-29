const Cliente = require('../models/cliente.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.add = function (req, res) {
    const cliente = new Cliente({
        nome: req.body.nome,
        telefone: req.body.telefone
    });

    cliente.save()
    .then((cliente) => {
        Utils.gravarLog(`Cliente: ${cliente}. Gravado com sucesso.`);
    })
    .catch((err) => {
        res.send().status(400);
    })
};