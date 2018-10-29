const express       = require ('express');
const bodyParser    = require('body-parser');

//Meus imports
const config  = require('./config/config');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))

//Modelos do Sistema
var {Pedido}    = require('./models/pedido');
var {Usuario}   = require('./models/usuario');
var Utils       = require('./utils/utils');

app.get('/', (req, res) => {
    res.send('Ola Mundo');
})

//Rotas Usuario
app.post('/usuario/add', (req, res) => {

    //Mover para uma rota POST de adicionar
    const usuario = new Usuario({
        nome: req.body.nome,
        telefone: req.body.telefone
    });

    usuario.save()
    .then((usuario) => {
        console.log(`Usuario ${usuario} gravado com sucesso.`);
    })
    .catch((err) => {
        res.send().status(400);
    });
});

app.get('/usuario/list', (req, res) => {
    res.send(Usuario.find());
});

//Rotas Pedido

app.listen(config.PORT, () => {
    console.log(`Servidor rodando na porta ${config.PORT}`);
})
