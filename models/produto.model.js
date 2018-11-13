const {mongoose} = require('./db');

var produtoSchema = new mongoose.Schema({
    nome: {
        type: String
    }, 
    precoCompra: {
        type: Number
    }, 
    precoVenda: {
        type: Number,
        default: null
    },
    quantidade:{
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var Produto = mongoose.model('Produto', produtoSchema);

module.exports = { Produto };