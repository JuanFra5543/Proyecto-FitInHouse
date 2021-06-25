const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cafSchema = new Schema({
    cafValor: {
        type: Schema.Types.Decimal128, 
        min: 0, 
        required: [true, 'Calorias Diarias de cliente es requerida']
    },
    cafDesc: String,
    cafGenero: String,
    cafMayor: Boolean,
});

//Exportar modelo
const Caf = mongoose.model('Caf', cafSchema);
export default Caf;