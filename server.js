const express       = require ('express');
const bodyParser    = require('body-parser');

//Meus imports
const config    = require('./config/config');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Modelos do Sistema
var {Utils}     = require('./utils/utils');

//Controllers
var pedidoController    = require('./controllers/pedidoController');
var clienteController   = require('./controllers/clienteController');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/teste', (req, res) => {
    res.send('Ola Mundo');
});

//Rotas Cliente
app.use('/cliente', clienteController);

//Rotas Pedido
app.use('/pedido', pedidoController);

//Sevidor
app.listen(config.PORT, () => {
    Utils.gravarLog(`Servidor rodando na porta ${config.PORT}`);
})
