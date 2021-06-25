const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cronogramaSchema = new Schema({
    cronogramaDia: Date,
    planAlimenticio: {type: Schema.Types.ObjectId, ref:'PlanAlim'},
    menu: {type: Schema.Types.ObjectId, ref:'Menu'},
})

cronogramaSchema.index({ cronogramaDia: 1, planAlimenticio: 1 }, { unique: true , dropDups: true})

const Cronograma = mongoose.model('Cronograma', cronogramaSchema);
export default Cronograma;