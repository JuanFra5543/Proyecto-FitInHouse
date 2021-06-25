const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredienteSchema = new Schema({
    ingredienteNombre:{
        type: String,
        required: true
    },
    macronutriente: {type: Schema.Types.ObjectId, ref:'Macronutriente'}
})

const Ingrediente = mongoose.model('Ingrediente', ingredienteSchema);
export default Ingrediente;