const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    menuNombre: String,
    ingredienteP: {type: Schema.Types.ObjectId, ref:'Ingrediente', required: true},
    ingredienteC: {type: Schema.Types.ObjectId, ref:'Ingrediente', required: true},
    ingredienteG: {type: Schema.Types.ObjectId, ref:'Ingrediente', required: true},
})

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;