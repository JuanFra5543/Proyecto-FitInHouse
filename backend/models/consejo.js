const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consejoSchema = new Schema({
    consejoNombre: String,
    planAlimenticio: {type: Schema.Types.ObjectId, ref:'PlanAlim'},
})

const Consejo = mongoose.model('Consejo', consejoSchema);
export default Consejo;