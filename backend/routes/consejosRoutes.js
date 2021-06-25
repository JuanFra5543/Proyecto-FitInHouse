import express from 'express'
const router = express.Router();
import Consejo from '../models/consejo';

const {verificarUsuario,verificarAdmin} = require('../autenticacion/autenticacion.js')

router.get('/consejos',[verificarUsuario,verificarAdmin], async(req,res) => {
    try{
        const consejoDB = await Consejo.find().populate('planAlimenticio');
        res.json(consejoDB);
    } catch(e){
        return res.status(500).json({
            message: 'Error al obtener',
            e
        })
    }
})

router.get('/consejos/:planAlim',verificarUsuario, async(req,res) => {
    const id = req.params.planAlim;
    try{
        const consejoDB = await Consejo.find().populate({path:'planAlimenticio', match:{ _id: { $eq: id }}});
        for(var i in consejoDB){
            if(consejoDB[i].planAlimenticio===null) delete consejoDB[i] 
        }
        res.json(consejoDB);
    } catch(e){
        return res.status(500).json({
            message: 'Error al obtener',
            e
        })
    }
})

router.post('/nuevoConsejo',[verificarUsuario,verificarAdmin], async(req,res) => {
    const body = {
        consejoNombre: req.body.consejoNombre,
        planAlimenticio: req.body.planAlimenticio
    }
    
    try{
        const consejoDB = await Consejo.create(body);
        res.status(200).json(consejoDB);
    } catch(e){
        return res.status(500).json({
            message: 'Error al crear',
            e
        })
    }
})
module.exports = router;