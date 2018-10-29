const express       = require ('express');
const bodyParser    = require('body-parser');

//Meus imports
const config  = require('./config/config');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))


//Modelos do Sistema
var {Pedido}    = require('./models/pedido.model');
var {Cliente}   = require('./models/cliente.model');
var {Utils}     = require('./utils/utils');

app.get('/', (req, res) => {
    res.send('Ola Mundo');
})

//Rotas Cliente
app.post('/cliente/add', (req, res) => {

    //Mover para uma rota POST de adicionar
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
    });
});

app.get('/cliente/list', (req, res) => {
    res.send(Cliente.find());
});

//Rotas Pedido

//Sevidor
app.listen(config.PORT, () => {
    Utils.gravarLog(`Servidor rodando na porta ${config.PORT}`);
})
