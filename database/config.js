const mongoose = require('mongoose');


const dbconnection = async () => {

    try {
        await mongoose.connect(
            'mongodb+srv://adminpro:adminpro@cluster0.4azzpsj.mongodb.net/hospitaldb'    
        );

        console.log('Conexión Exitosa!');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos...ver logs');
    }

}

module.exports = { dbconnection }