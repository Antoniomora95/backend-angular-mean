/*VERIFICAR TOKEN Y PERMITIR ACCESO*/
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

exports.verificaToken = function(request, response, next){
    var token = request.query.token;
    jwt.verify( token, SEED, (error, decoded) => {
        if(error) {
            return response.status(401).json({
                ok: false,
                mensaje: 'Token invalido',
                errors: error
            });
        }
        request.usuario = decoded.usuario;
        next();
    });
}
    