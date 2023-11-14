const express = require('express')
const router = express()

router.use('/api/users', require('./UserRoutes'))
router.use('/api/ativos', require('./AtivoRoutes'))

//Rota de teste
router.get('/', (req, res) => {
    res.send('API trabalhando!!') 
})

module.exports = router