const express       = require ('express');
const bodyParser    = require('body-parser');

//Meus imports
const config    = require('./config/config');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Modelos do Sistema
var {Utils}     = require('./utils/utils');

//Controllers
var pedidoController    = require('./controllers/pedidoController');
var clienteController   = require('./controllers/clienteController');
var produtoController   = require('./controllers/produtoController');
var userController      = require('./controllers/userController');

app.get('/', (req, res) => {
    res.render('index');
});

//Rotas de Teste do leitor com https do Heroku
app.get('/ingresso', (req, res) => {
    res.render('./ingresso/index');
});

app.get('/ingresso/leitor', (req, res) => {
    res.render('./ingresso/leitor');
});

app.get('/ingresso/gerador', (req, res) => {
    res.render('./ingresso/qr');
});
//Fim das rotas de teste do Leitor

app.get('/teste', (req, res) => {
    res.send('Ola Mundo');
});

app.get('/sucess', (req, res) => {
    let mensagem = req.query.mensagem;
    res.render('sucess', { mensagem } );
});

//Rotas Cliente
app.use('/cliente', clienteController); 

//Rotas Pedido
app.use('/pedido', pedidoController);

//Rotas Pedido
app.use('/produto', produtoController);

//Rotas Usuário
app.use('/usuario', userController);

//Sevidor
app.listen(config.PORT, () => {
    Utils.gravarLog(`Servidor rodando na porta ${config.PORT}`);
})
