const {mongoose} = require('./db');

var clienteSchema = new mongoose.Schema({
    nome: {
        type: String
    }, 
    telefone: {
        type: String
    }, 
    numComanda: {
        type: Number,
        default: null
    },
    isRedlist:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = { Cliente };