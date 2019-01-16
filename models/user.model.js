const {mongoose} = require('./db');

var userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    nome: {
        type: String
    }, 
    telefone: {
        type: String
    },
    dt_nascimento: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var User = mongoose.model('User', userSchema);

module.exports = { User };