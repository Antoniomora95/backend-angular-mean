// Requires
var express = require('express');
var mongoose = require('mongoose');

// Inicializar variables
var app = express();


// Conexxion a la BD
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (error, response) => {
    if(error) throw error;
    console.log('Base de datos \x1b[32m%s\x1b[0m','online');
});

// Rutas
app.get('/', (request, res, next) => {
    res.status(403).json({
        ok:true,
        mensaje: 'Peticion realizada correctamente'
    })
});


//Escuchar peticiones

app.listen(3000, () => {
    console.log('express server en puerto 3000: \x1b[32m%s\x1b[0m','corriendo');
});