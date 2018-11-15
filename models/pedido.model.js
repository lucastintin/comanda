const {mongoose} = require('./db');

var pedidoSchema = new mongoose.Schema({
    numComanda :{
        type: Number
    }, 
    item: {
        type: String
    },
    qtd: {
        type: Number,
        default: 1
    },
    _clienteId: {
        type: mongoose.Schema.Types.ObjectId
    },
    matFuncionario: {
        type: Number
    },
    isClosed: {
        type: Boolean, 
        default: false
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = {Pedido}