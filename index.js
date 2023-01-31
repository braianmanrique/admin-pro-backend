const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {dbConnection} = require('./database/config');

// create server express
const app = express();
//configurar cors
app.use(cors());
//Bd
dbConnection()


// Rutas
app.get('/' , (req, res) => {
    res.json({
        ok:true,
        msg: 'hello'
    })
});

// ibwBbfsN8EuP1Fv5
// mean_user

app.listen(process.env.PORT, () =>{
    console.log('server run'+ process.env.PORT);
});