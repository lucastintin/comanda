const {mongoose} = require('../db/db');

var clienteSchema = new mongoose.Schema({
    nome: {
        type: String, 
        required: true
    }, 
    telefone: {
        type: String, 
        required: true
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