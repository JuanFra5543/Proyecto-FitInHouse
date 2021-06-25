import express from 'express'
const router = express.Router();

import Menu from '../models/menu';

const {verificarUsuario,verificarAdmin} = require('../autenticacion/autenticacion.js')

const _ = require('underscore');

router.get('/menu', [verificarUsuario,verificarAdmin],async (req,res)=>{
    try{
        const menuDB = await Menu.find().populate('ingredienteP').populate('ingredienteC').populate('ingredienteG');
        res.json(menuDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

router.get('/menu/:id', [verificarUsuario,verificarAdmin],async (req,res)=>{
    const _id = req.params.id;
    try{
        const menuDB = await Menu.findById(_id).populate('ingredienteP').populate('ingredienteC').populate('ingredienteG');
        res.json(menuDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

router.get('/menu/cliente/ingredienteP/:ingredienteP', verificarUsuario,async (req,res)=>{
    const ingP = req.params.ingredienteP;

    try{
        const menuDB = await Menu.find().populate({path:'ingredienteP', match:{ _id: { $eq: ingP }}}).populate('ingredienteC').populate('ingredienteG');
        for(var i in menuDB){
            if(menuDB[i].ingredienteP===null) delete menuDB[i] 
        }
        res.json(menuDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

router.get('/menu/cliente/ingredienteC/:ingredienteC', verificarUsuario,async (req,res)=>{
    const ingC = req.params.ingredienteC;
    try{
        const menuDB = await Menu.find().populate('ingredienteP').populate({path:'ingredienteC', match:{ _id: { $eq: ingC }}}).populate('ingredienteG');
        for(var i in menuDB){
            if(menuDB[i].ingredienteC===null) delete menuDB[i] 
        }
        res.json(menuDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

router.get('/menu/cliente/ingredienteG/:ingredienteG', verificarUsuario,async (req,res)=>{
    const ingG = req.params.ingredienteG;
    try{
        const menuDB = await Menu.find().populate('ingredienteP').populate('ingredienteC').populate({path:'ingredienteG', match:{ _id: { $eq: ingG }}});
        for(var i in menuDB){
            if(menuDB[i].ingredienteG===null) delete menuDB[i] 
        }
        res.json(menuDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

router.post('/nuevoMenu', [verificarUsuario,verificarAdmin],async (req, res) => {
    const body = {
        menuNombre: req.body.menuNombre,
        ingredienteP: req.body.ingredienteP,
        ingredienteC: req.body.ingredienteC,
        ingredienteG: req.body.ingredienteG,
    }
    try{
        const menuDB = await Menu.create(body);
        res.status(200).json(menuDB);
    }catch (error){
        return res.status(500);
    }
});

router.delete('/deleteMenu/:id', [verificarUsuario,verificarAdmin],async (req, res) => {
    const _id = req.params.id;
    try {
        const menuDB = await Menu.findByIdAndDelete({_id});
        if(!menuDB){
            return res.status(400).json({message:'El id no existe',error});
        }
        res.json(menuDB);
    } catch (error) {
        return res.status(500);
    }
});

router.put('/updateMenu/:id',[verificarUsuario,verificarAdmin], async (req, res) => {
    const _id = req.params.id;
    const body = _.pick(req.body, ['menuNombre','ingredienteP','ingredienteC','ingredienteG']);
    console.log(body)
    try{
        const menuDB = await Menu.findByIdAndUpdate(
            _id,
            body,
            {
                new: true,
                runValidators:true
            });
        return res.json(menuDB);
    } catch(e){
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            e
        })
    }
});

module.exports = router;