var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message:'{VALUE} no es un rol permitido'
};

var usuarioSchema = new Schema({
    nombre: {type: String, required: [true, 'el nombre es necesario']},
    email: {type: String, unique: true, required: [true, 'el email es requerido']},
    password: {type: String, required: [true, 'La contraseña es requerida']},
    img: {type: String, required: false},
    role: {type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }
});

usuarioSchema.plugin(uniqueValidator, {message: 'Este {PATH} ya fue usado previamente'});

module.exports = mongoose.model('Usuario', usuarioSchema);