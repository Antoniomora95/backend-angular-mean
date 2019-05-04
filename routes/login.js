var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var app = express();
var Usuario = require('../models/usuario');



app.post('/',(request, response) => {
    var body = request.body;

    Usuario.findOne({email: body.email}, (error, usuarioBD) => {
        if (error) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuarios'
            });
        }
        if(!usuarioBD) {
            return response.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: error
            }); 
        } 
        if (!bcrypt.compareSync(body.password, usuarioBD.password)) {
            return response.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: error
            }); 
        } 

        //Crear un token
        usuarioBD.password = ':)';
        var token = jwt.sign({
            usuario: usuarioBD}, 
            SEED,{expiresIn: 14400});  // 4 horas
        return response.status(200).json({
            ok: true,
            mensaje: 'login funcionando',
            token: token,
            id: usuarioBD._id
        });
    });
});

module.exports = app;