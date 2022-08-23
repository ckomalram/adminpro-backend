const express = require('express');
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





app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});