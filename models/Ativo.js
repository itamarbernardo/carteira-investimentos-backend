const mongoose = require('mongoose')
const { Schema } = mongoose

const ativoSchema = new Schema({
    codigo: String,
    dataCompra: Date,
    quantidade: {
        type: Number,
        integer: true, // Esta opção é usada para indicar que o número deve ser um inteiro
    }, 
    valorTotal: Number,
    userId: mongoose.ObjectId, //O tipo tem que ser diff pra guardar o id do usuário
}, {
    timestamps: true
})

const Ativo = mongoose.model('Ativo', ativoSchema)

module.exports = Ativo