const {mongoose} = require('../db/db');

var pedidoSchema = new mongoose.Schema({
    comanda :{
        type: Number,
        required: true
    }, 
    item: {
        type: Number, 
        required: true
    },
    qtd: {
        type: Number,
        default: 1,
        required: true,
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