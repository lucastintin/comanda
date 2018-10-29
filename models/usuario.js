const {mongoose} = require('./../db/db');

var userSchema = new mongoose.Schema({
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

var Usuario = mongoose.model('Usuario', userSchema);

module.exports = { Usuario };