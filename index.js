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
app.use('/api/hospital', require('./routes/hospital.route'));
app.use('/api/medico', require('./routes/medico.route'));
app.use('/api/generalsearch', require('./routes/generalsearch.route'));
app.use('/api/upload', require('./routes/upload.route'));
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