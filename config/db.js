const mongoose = require("mongoose");


//Conexão com o BD
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const conn = async () => {
    try {
        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.cisqqt8.mongodb.net/`
        )

        console.log('Conectou ao banco!')

        return dbConn
    } catch (error) {
        console.log('erro: ', error)
        
    }
}

conn()

module.exports = conn
