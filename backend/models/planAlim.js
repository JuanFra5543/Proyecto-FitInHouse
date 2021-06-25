const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const planAlimSchema = new Schema({
    planAlimNombre: { 
        type: String, 
        required: true
    },
    planAlimDesc: { 
        type: String, 
        required: true
    },
    planAlimPrecio: {
        type: Schema.Types.Decimal128, 
        min: 0, 
        required: [true, 'Precio del Plan alimenticio es requerido']
    },
    planAlimCalcMin:{
        type: Schema.Types.Decimal128, 
        min: 0, 
        required: [true, 'Minimo IMC del Plan alimenticio es requerido']
    },
    planAlimCalcMax:{
        type: Schema.Types.Decimal128, 
        min: 0, 
        required: [true, 'Maximo IMC del Plan alimenticio es requerido']
    },
    tipoMenu: {type: Schema.Types.ObjectId, ref:'TipoMenu'}
});

//Exportar modelo
const PlanAlim = mongoose.model('PlanAlim', planAlimSchema);
export default PlanAlim;
