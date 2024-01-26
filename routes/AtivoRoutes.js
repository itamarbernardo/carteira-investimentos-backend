const express = require('express')
const router = express.Router()

//Controllers
const { insertAtivo, deleteAtivo, getUserAtivos, getAtivoById, updateAtivo, searchAtivos } = require('../controllers/AtivoController')

//Middlewares
const { ativoInsertValidation, ativoUpdateValidation } = require('../middlewares/ativoValidation')
const authGuard = require('../middlewares/authGuard')
const validate = require('../middlewares/handleValidation')
const { imageUpload } = require('../middlewares/imageUpload')

//Routes
router.post('/', authGuard, ativoInsertValidation(), validate, insertAtivo)
//authGuard = precisa estar autenticado para realizar o insert do ativo
//ativoInsertValidation() = faz as validacoes e cria o array de erros
//validates = recebe o array de erros pra mandar pro front
//insertAtivo = função no controller
router.delete('/:id', authGuard, deleteAtivo)
router.get('/user', authGuard, getUserAtivos)

//Temos que criar essa aqui em cima pra que o parametro "q" não seja confundido com as rotas de baixo
router.get('/search', authGuard, searchAtivos)

router.get('/:id', authGuard, getAtivoById)
router.put('/:id', authGuard, ativoUpdateValidation(), validate, updateAtivo)

module.exports = router