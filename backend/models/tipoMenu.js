const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tipoMenuSchema = new Schema({
    tipoMenuCod: Number,
    tipoMenuNombre: String,
    tipoMenuCalorias: Number,
})

const TipoMenu = mongoose.model('TipoMenu', tipoMenuSchema);
export default TipoMenu;