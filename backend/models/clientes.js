const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema Cliente
const clienteSchema = new Schema({
    clienteId: Number,
    clienteNombre: { 
        type: String, 
        required: true
    },
    clienteEdad: {
        type: Number, 
        min: 0, 
        required: [true, 'Edad de cliente es requerido']
    },
    clienteEstatura: {
        type: Schema.Types.Decimal128, 
        min: 0, 
        required: [true, 'Estatura de cliente es requerida']
    },
    clientePeso: {
        type: Schema.Types.Decimal128, 
        min: 0,
        required: [true, 'Peso de cliente es requerido']
    },
    clienteAlergias: Boolean,
    clienteNota: String,
    clienteIMC: {
        type: Schema.Types.Decimal128, 
        min: 0, 
        required: [true, 'IMC de cliente es requerida']
    },
    clienteGenero: String,
    clienteCalDiarias: {
        type: Schema.Types.Decimal128, 
        min: 0, 
        required: [true, 'Calorias Diarias de cliente es requerida']
    },
    caf: {type: Schema.Types.ObjectId, ref:'Caf'},
    planAlimenticio: {type: Schema.Types.ObjectId, ref:'PlanAlim'},
    clienteCodigo:{type:Number, required: true, unique: true}
});

//Exportar modelo
const Cliente = mongoose.model('Cliente', clienteSchema);
export default Cliente;
