const express = require('express');
require('dotenv').config();
const { dbconnection } = require('./database/config');

const app = express();

//iniciando base de datos
dbconnection();


//rutas
app.get('/', (req, res)=> {
    res.json({
        ok: true,
        msg: 'Hola Carlyle'
    })
});





app.listen(process.env.port, () => {
    console.log(`Servidor corriendo en puerto ${process.env.port}`);
});