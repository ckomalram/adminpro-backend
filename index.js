const express = require('express');
require('dotenv').config();
const { dbconnection } = require('./database/config');
const cors = require('cors')

const app = express();

//iniciando base de datos
dbconnection();

// configurar cors
app.use(cors())

//Leer body
app.use(express.json());

//rutas
app.use('/api/users', require('./routes/user.route'));
app.use('/api/login', require('./routes/auth.route'));


app.get('/', (req, res)=> {
    res.json({
        ok: true,
        msg: 'Hola Carlyle desde raiz'
    })
});

app.listen(process.env.port, () => {
    console.log(`Servidor corriendo en puerto ${process.env.port}`);
});