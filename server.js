const express       = require ('express');
const bodyParser    = require('body-parser');

//Meus imports
const config  = require('./config/config');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

//Modelos do Sistema
var {Pedido}    = require('./models/pedido.model');
var {Cliente}   = require('./models/cliente.model');
var {Utils}     = require('./utils/utils');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/teste', (req, res) => {
    res.send('Ola Mundo');
});

//Rotas Cliente
app.get('/cliente', (req, res) => {
    res.render('./cliente/index.ejs');
});

app.post('/cliente/add', (req, res) => {

    let cliente = new Cliente({
        nome: "Lucas Amiune2", //req.body.nome,
        telefone: "2199394-9392" //req.body.telefone
    }); 

    cliente.save()
    .then((cliente) => {
        Utils.gravarLog(`Cliente: ${cliente}. Gravado com sucesso.`);
        res.status(200).send();
    })
    .catch((erro) => {
        res.status(400).send(erro);
    });
});

app.get('/cliente/list', (req, res) => {
    Cliente.find().then((clientes) => {
        res.send(clientes);
    }, (erro) =>{
        res.status(400).send(erro);
    });
});

//Rotas Pedido
app.get('/pedido', (req, res) => {
    res.render('./pedido/index.ejs');
});

//Sevidor
app.listen(config.PORT, () => {
    Utils.gravarLog(`Servidor rodando na porta ${config.PORT}`);
})
