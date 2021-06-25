const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const macronutrienteSchema = new Schema({
    macronutrienteNombre: String,
})

const Macronutriente = mongoose.model('Macronutriente', macronutrienteSchema);
export default Macronutriente;