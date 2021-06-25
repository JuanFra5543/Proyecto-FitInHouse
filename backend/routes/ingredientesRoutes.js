import express from 'express'
const router = express.Router();
import Ingrediente from '../models/ingrediente'
import Macronutriente from '../models/macronutriente'

const {verificarUsuario,verificarAdmin} = require('../autenticacion/autenticacion.js')

router.get('/ingredientes', [verificarUsuario,verificarAdmin],async (req,res)=>{
    try{
        const ingredienteDB = await Ingrediente.find();
        for(const propiedad in ingredienteDB){
            ingredienteDB[propiedad].macronutriente = await Macronutriente.findOne({_id:ingredienteDB[propiedad].macronutriente})
        }
        res.json(ingredienteDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

router.get('/ingredientes/:macronutrienteNombre', [verificarUsuario,verificarAdmin],async (req,res)=>{
    const macroNombre = req.params.macronutrienteNombre;
    try{
        const ingredienteDB = await Ingrediente.find().populate({path:'macronutriente', match:{ macronutrienteNombre: { $eq: macroNombre }}});
        for(var i in ingredienteDB){
            if(ingredienteDB[i].macronutriente===null) delete ingredienteDB[i] 
        }
        res.json(ingredienteDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

router.get('/ingredientes/cliente/:macronutrienteNombre', verificarUsuario,async (req,res)=>{
    const macroNombre = req.params.macronutrienteNombre;
    try{
        const ingredienteDB = await Ingrediente.find().populate({path:'macronutriente', match:{ macronutrienteNombre: { $eq: macroNombre }}});
        for(var i in ingredienteDB){
            if(ingredienteDB[i].macronutriente===null) delete ingredienteDB[i] 
        }
        res.json(ingredienteDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

router.get('/ingrediente/:id', [verificarUsuario,verificarAdmin],async (req,res)=>{
    const _id = req.params.id;
    try{
        const ingredienteDB = await Ingrediente.findById(_id);
        ingredienteDB.macronutriente = await Macronutriente.findOne({_id:ingredienteDB.macronutriente})
        res.json(ingredienteDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})


router.post('/nuevoIngrediente', [verificarUsuario,verificarAdmin],async (req,res)=>{
    const body = {
        ingredienteNombre: req.body.ingredienteNombre,
        macronutriente: req.body.macronutriente
    }
    try{
        const ingredienteDB = await Ingrediente.create(body);
        res.status(200).json(ingredienteDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

router.delete('/deleteIngrediente/:id', [verificarUsuario,verificarAdmin],async (req, res) => {
    const _id = req.params.id;
    try {
        const ingredienteDB = await Ingrediente.findByIdAndDelete({_id});
        if(!ingredienteDB){
            return res.status(400).json({message:'El id no existe',error});
        }
        res.json(ingredienteDB);
    } catch (error) {
        return res.status(500);
    }
});

module.exports = router