import express from 'express'
const router = express.Router();
import Macronutriente from '../models/macronutriente';

router.get('/macronutrientes', async(req,res) => {
    try{
        const macronutrienteDB = await Macronutriente.find();
        res.json(macronutrienteDB);
    } catch(e){
        return res.status(500).json({
            message: 'Error al obtener',
            e
        })
    }
})
router.post('/nuevoMacronutriente', async(req,res) => {
    const body = {
        macronutrienteNombre: req.body.macronutrienteNombre,
    }
    
    try{
        const macronutrienteDB = await Macronutriente.create(body);
        res.status(200).json(macronutrienteDB);
    } catch(e){
        return res.status(500).json({
            message: 'Error al crear',
            e
        })
    }
})
module.exports = router;