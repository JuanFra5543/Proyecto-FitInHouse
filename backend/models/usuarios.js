const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

//Schema para roles
const rol ={
    values: ['ADMIN','CLIENTE'],
    message: '{VALUE} rol no existe'
}

const usuarioSchema = new Schema({
    usuarioNombre: { 
        type: String, 
        required: true
    },
    usuarioMail: { 
        type: String,
        required: [true,'Email required'],
        unique: true
    },
    usuarioPassword: { 
        type:String,
        required: [true,'Password required']
    },
    usuarioRol: {
        type:String,
        default: 'CLIENTE',
        enum: rol
    },
    usuarioStatus:{
        type: Boolean,
        default: true
    },
    usuarioCodigo:{type:Number, required: true, unique: true}
});

usuarioSchema.plugin(uniqueValidator , {message: 'Error, expected {} unique'});

usuarioSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.usuarioPassword;
    return obj; 
}

//Exportar modelo
const Usuario = mongoose.model('Usuario',  usuarioSchema);
export default Usuario;