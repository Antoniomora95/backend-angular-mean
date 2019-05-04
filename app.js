// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();

// Configurar el body parser
// parse application/x-www-form-url-encoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Importar rutas

var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

// Conexion a la BD
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB',{ useNewUrlParser: true },(err, res) => {
    if (err) throw err;
    console.log('Base de datos \x1b[32m%s\x1b[0m','online');
});
// usar Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

//Escuchar peticiones

app.listen(3000, () => {
    console.log('express server en puerto 3000: \x1b[32m%s\x1b[0m','corriendo');
});