const Ativo = require('../models/Ativo')
const User = require('../models/User')

const mongoose = require('mongoose')

//Inserir um ativo com usuário relacionado a ela
const insertAtivo = async (req, res) => {
    const {codigo, dataCompra, quantidade, preco} = req.body

    console.log(req.body)

    const reqUser = req.user
  
    const user = await User.findById(reqUser._id)
  
    console.log(user.name)
  
    // Create a Ativo
    const newAtivo = await Ativo.create({
      codigo,
      dataCompra,
      quantidade,
      preco,
      userId: user._id,
    })
  
    //Se não salvou o ativo
    if (!newAtivo) {
      res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]})
      return
    }
    
    //Se salvou com sucesso
    res.status(201).json(newAtivo)

}

// Remove o ativo from the DB
const deleteAtivo = async (req, res) => {
    const { id } = req.params
  
    const reqUser = req.user
    try {
        const ativo = await Ativo.findById(new mongoose.Types.ObjectId(id))
    
        // Checa se o ativo existe
        if (!ativo) {
        res.status(404).json({ errors: ["Ativo não encontrado!"] })
        return
        }

        // Checa se o usuário logado que tá tentando excluir é o dono do ativo
        if (!ativo.userId.equals(reqUser._id)) {
          res.status(422).json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] })
          return
        }

        await Ativo.findByIdAndDelete(ativo._id)
    
        res.status(200).json({ id: ativo._id, message: "Ativo excluído com sucesso." })

    } catch (error) {
        res.status(404).json({ errors: ["Ativo não encontrado. Id Errado"] })
        return        
    }
}

// Get Ativos de um usuario
const getUserAtivos = async (req, res) => {
    //Pego o usuario que mandou a requisicao, pois um usuario não pode ver ativos de outro usuario
    const reqUser = req.user
    
    const ativos = await Ativo.find({ userId: reqUser._id })
      .sort([["createdAt", -1]])
      .exec()
  
    return res.status(200).json(ativos)
}

// Get ativo by id
const getAtivoById = async (req, res) => {
    const { id } = req.params
    
    const reqUser = req.user
    
    try {
        const ativo = await Ativo.findById(new mongoose.Types.ObjectId(id))

        // Checa se o ativo não existe
        if (!ativo) {
            res.status(404).json({ errors: ["Ativo não encontrado!"] })
            return
        }
        
        if(!ativo.userId.equals(reqUser._id)){
          res.status(404).json({ errors: ["Você não possui permissão para acessar esse ativo!"] })
          return
        }

        res.status(200).json(ativo)
    } catch (error) {
        res.status(404).json({ errors: ["Ativo não encontrado!"] })
        return        
    }
}

// Update a ativo
const updateAtivo = async (req, res) => {
    const { id } = req.params
    const { codigo,
        dataCompra,
        quantidade,
        preco,
         } = req.body
 
    const reqUser = req.user
  
    const ativo = await Ativo.findById(id)
  
    // Checar se o ativo existe
    if (!ativo) {
      res.status(404).json({ errors: ["Ativo não encontrado!"] })
      return
    }
  
    // Checar se o ativo pertence ao usuário que quer altera-la
    if (!ativo.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] })
      return
    }
  
    if (codigo) {
      ativo.codigo = codigo;
    }
    
    if (dataCompra) {
        ativo.dataCompra = dataCompra;
    }
    
    if (quantidade) {
    ativo.quantidade = quantidade;
    }
    
    if (preco) {
        ativo.preco = preco;
    }
    
    await ativo.save();
  
    res.status(200).json({ ativo, message: "Ativo atualizado com sucesso!" });
}


// Buscar ativos pelo codigo
const searchAtivos = async (req, res) => {
  const { q } = req.query;
  const reqUser = req.user;

  const ativos = await Ativo.find({ 
    codigo: new RegExp(q, "i"),
    userId: reqUser._id 
  }).exec(); //Essa pesquisa ignora a case sensitive e vai buscar em qualquer lugar da string

  res.status(200).json(ativos);
};

module.exports = {
    insertAtivo,
    deleteAtivo,
    getUserAtivos,
    getAtivoById,
    updateAtivo,
    searchAtivos,
}