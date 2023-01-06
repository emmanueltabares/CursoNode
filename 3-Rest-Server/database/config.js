const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('BD Conectada')
    } catch (error) { 
        throw new Error('Error intentanto conectar a la base de datos').message
    }

}

module.exports = {
    dbConnection
}