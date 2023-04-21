const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {dbConnection} = require('./database/config');

// create server express
const app = express();
//configurar cors
app.use(cors());

//carpeta public
app.use(express.static('public'))

// read and parser body
app.use(express.json());
//Bd
dbConnection()


// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));







app.listen(process.env.PORT, () =>{
    console.log('server run'+ process.env.PORT);
});