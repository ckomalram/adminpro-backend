const mongoose = require('mongoose');
require('dotenv').config();

const dbconnection = async () => {
    console.log(process.env.DBCONN  );

    try {
        await mongoose.connect(
            process.env.DBCONFIG  
        );

        console.log('Conexión Exitosa!');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos...ver logs');
    }

}

module.exports = { dbconnection }