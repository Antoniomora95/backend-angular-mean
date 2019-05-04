var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var app = express();

var mdAutenticacion = require('../middlewares/autentificacion');
var Usuario = require('../models/usuario');
// Obtener todos los usuarios
app.get('/', (request, response, next) => {
    Usuario.find({},'nombre email img')
    .exec(
        (error, users) => {
        if(error){
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al cargar usuarios BD',
                errors: error
            });
        }
        response.status(200).json({
            ok: true,
            users:users
        });
    });
});


/*MIDDLEWARE PARA VERIFICAR EL TOKEN Y FILTRAR EL ACCESO A LAS RUTAS INFERIORES*/



// Crear un nuevo usuario
app.post('/',mdAutenticacion.verificaToken,(request, response, next ) => {
    var body = request.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password:bcrypt.hashSync(body.password,10),
        img: body.img,
        role: body.role
    });
    usuario.save((error, usuarioGuardado) => {
        if(error) {
            return response.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario.',
                errors: error
            });
        }
        response.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuarioToken : request.usuario
        });
    });
});

// Actualizar un usuario
app.put('/:id',mdAutenticacion.verificaToken,(request, response) => {
    var id = request.params.id;
    var body = request.body;
    Usuario.findById(id, (error, usuario) => {
        if (error){
           return  response.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: error
            });
        }
        if(!usuario){
            return response.status(400).json({
                ok: false,
                mensaje: 'El usuario con ID'+ id +'no fue encontrado',
                errors: {message: 'No existe un usuario con ese ID'}
            });
        }
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((error, usuarioActualizado) => {
            if(error){
                return response.status(400).json({
                    ok: false,
                    mensaje: 'Error al intentar actualizar usuario',
                    errors: error
                });
            }
            usuarioActualizado.password = ';)';
            return response.status(200).json({
                ok: true,
                mensaje: 'Usuario actualizado correctamente',
                usuario: usuarioActualizado
            });
        });
    });
});

/* BORRAR UN USUARIO*/
 app.delete('/:id',mdAutenticacion.verificaToken,(request, response) => {
     var id = request.params.id;
     Usuario.findByIdAndRemove(id, (error, usuarioBorrado) =>{
         if(error){
             return response.status(500).json({
                ok: false,
                mensaje: 'Error al intentar borrar usuario',
                errors: error
             });
         }
         if(!usuarioBorrado) {
             return response.status(400).json({
                 ok: false,
                 mensaje: 'No existe un usuario con ese ID',
                 errors: {message: 'No existe un usuario con ese id'}
             });
         } else {
            response.status(200).json({
                ok: true,
                usuario: usuarioBorrado
            });
         }
        
     });
 });


module.exports = app;