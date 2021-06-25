import express from 'express'
const router = express.Router();

import Cronograma from '../models/cronograma'

const {verificarUsuario,verificarAdmin} = require('../autenticacion/autenticacion.js')
const _ = require('underscore');

router.get('/cronograma', [verificarUsuario,verificarAdmin],async (req,res)=>{
    try{
        const cronogramaDB = await Cronograma.find().populate('planAlimenticio').populate('menu');
        res.json(cronogramaDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

router.get('/cronograma/:id', [verificarUsuario,verificarAdmin],async (req,res)=>{
    const _id = req.params.id;
    try{
        const cronogramaDB = await Cronograma.findById(_id).populate('planAlimenticio').populate({ path: 'menu', select: 'menuNombre' });
        res.json(cronogramaDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

//Ruta para obtener el cronograma desde la vista de cliente
router.get('/cronograma/cliente/menuDia/:id', verificarUsuario,async (req,res)=>{
    const _id = req.params.id;
    try{
        const cronogramaDB = await Cronograma.findById(_id).populate('planAlimenticio').populate({ path: 'menu', select: 'menuNombre' });
        res.json(cronogramaDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

//Obtener los cronogramas de plan alimenticio
router.get('/cronograma/planAlim/:idPlanAlim', [verificarUsuario,verificarAdmin],async (req,res)=>{
    const _id = req.params.idPlanAlim;
    try{
        const cronogramaDB = await Cronograma.find().populate({path:'planAlimenticio', match:{ _id: { $eq: _id }}}).populate('menu');
        for(var i in cronogramaDB){
            if(cronogramaDB[i].planAlimenticio===null) delete cronogramaDB[i] 
        }
        res.json(cronogramaDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

//Obtener los cronogramas de plan alimenticio
router.get('/cronograma/cliente/:idPlanAlim', verificarUsuario,async (req,res)=>{
    const _id = req.params.idPlanAlim;
    const date = new Date()
    const start = date.toLocaleDateString()
    const end = new Date()
    end.setDate(end.getDate() + 6)
    try{
        const cronogramaDB = await Cronograma.find(({"cronogramaDia": {"$gte": start, "$lte": end.toLocaleDateString()}})).populate({path:'planAlimenticio', match:{ _id: { $eq: _id }}}).populate('menu');
        for(var i in cronogramaDB){
            if(cronogramaDB[i].planAlimenticio===null) delete cronogramaDB[i] 
        }
        res.json(cronogramaDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

//ruta para obtener query de todos los dias de un mes especifico
router.get('/cronograma/mes/:mes', [verificarUsuario,verificarAdmin],async (req,res)=>{
    const mes = req.params.mes;

    var d = new Date();
    var y = d.getFullYear();

    var daysOfMonth = new Date(y,mes, 0).getDate()

    var start = y+'/'+mes+'/1'
    var end = y+'/'+mes+'/'+daysOfMonth


    try{
        const cronogramaDB = await Cronograma.find(({"cronogramaDia": {"$gte": start, "$lte": end}})).populate('planAlimenticio').populate('menu');
        console.log(Object.keys(cronogramaDB).length)
        res.json(cronogramaDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

//ruta para obtener query de todos los dias de un mes especifico de un plan alimenticio especifico
router.get('/cronograma/:idPlanAlim/:mes', [verificarUsuario,verificarAdmin],async (req,res)=>{
    const mes = req.params.mes;
    const id = req.params.idPlanAlim;

    var d = new Date();
    var y = d.getFullYear();

    var daysOfMonth = new Date(y,mes, 0).getDate()

    var start = y+'/'+mes+'/1'
    var end = y+'/'+mes+'/'+daysOfMonth


    try{
        const cronogramaDB = await Cronograma.find(({"cronogramaDia": {"$gte": start, "$lte": end}})).populate({path:'planAlimenticio', match:{ _id: { $eq: id }}}).populate('menu');
        for(var i in cronogramaDB){
            if(cronogramaDB[i].planAlimenticio===null) delete cronogramaDB[i] 
        }
        res.json(cronogramaDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})


router.post('/nuevoCronograma', [verificarUsuario,verificarAdmin],async (req,res)=>{
    const body = {
        cronogramaDia: req.body.cronogramaDia,
        planAlimenticio: req.body.planAlimenticio,
        menu: req.body.menu
    }
    try{
        const cronogramaDB = await Cronograma.create(body);
        res.status(200).json(cronogramaDB);
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

router.delete('/deleteCronograma/:id', [verificarUsuario,verificarAdmin],async (req, res) => {
    const _id = req.params.id;
    try {
        const cronogramaDB = await Cronograma.findByIdAndDelete({_id});
        if(!cronogramaDB){
            return res.status(400).json({message:'El id no existe',error});
        }
        res.json(cronogramaDB);
    } catch (error) {
        return res.status(500);
    }
});

router.put('/updateCronograma/:id',[verificarUsuario,verificarAdmin], async (req, res) => {
    const _id = req.params.id;
    const body = _.pick(req.body, ['menu']);
    try{
        const cronogramaDB = await Cronograma.findByIdAndUpdate(
            _id,
            body,
            {
                new: true,
                runValidators:true
            });
        return res.json(cronogramaDB);
    } catch(e){
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            e
        })
    }
});

//Ruta para poder cambiar el menu desde la vista del cliente
router.put('/updateCronograma/cliente/:id',verificarUsuario, async (req, res) => {
    const _id = req.params.id;
    const body = _.pick(req.body, ['menu']);
    try{
        const cronogramaDB = await Cronograma.findByIdAndUpdate(
            _id,
            body,
            {
                new: true,
                runValidators:true
            });
        return res.json(cronogramaDB);
    } catch(e){
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            e
        })
    }
});

module.exports = router