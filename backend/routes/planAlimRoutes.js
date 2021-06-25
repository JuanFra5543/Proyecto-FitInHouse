import express from 'express'
const router = express.Router()

import PlanAlim from '../models/PlanAlim'
const _ = require('underscore');


const {verificarUsuario,verificarAdmin} = require('../autenticacion/autenticacion.js')

//Ruta para obtener todos los planes alimenticios
router.get('/planAlim',[verificarUsuario,verificarAdmin], async (req, res) =>{
    try{
        const planAlimDB = await PlanAlim.find().populate('tipoMenu')
        res.json(planAlimDB)
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

router.get('/planAlim/nuevosUsuarios', async (req, res) =>{
    try{
        const planAlimDB = await PlanAlim.find().populate('tipoMenu')
        res.json(planAlimDB)
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

//Ruta para obtener un plan alimenticio 
router.get('/planAlim/:id', [verificarUsuario,verificarAdmin], async (req,res) =>{
    const _id = req.params.id
    try{
        const planAlimDB = await PlanAlim.findById(_id).populate('tipoMenu')
        res.json(planAlimDB)
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})

//Ruta para obtener un plan alimenticio 
router.get('/planAlim/cliente/:id', verificarUsuario, async (req,res) =>{
    const _id = req.params.id
    try{
        const planAlimDB = await PlanAlim.findById(_id).populate('tipoMenu')
        res.json(planAlimDB)
    } catch(e){
        return res.status(500).json({
            message:'Error al obtener',
            e
        })
    }
})


router.post('/nuevoPlanAlim',[verificarUsuario,verificarAdmin], async (req, res) => {
    const body = {
        planAlimNombre: req.body.planAlimNombre,
        planAlimDesc: req.body.planAlimDesc,
        planAlimPrecio: req.body.planAlimPrecio,
        planAlimCalcMin: req.body.planAlimCalcMin,
        planAlimCalcMax: req.body.planAlimCalcMax,
        tipoMenu: req.body.tipoMenu
    }
    try{
        const planAlimDB = await PlanAlim.create(body)
        res.status(200).json(planAlimDB)
    } catch(e){
        return res.status(500).json({
            message:'Error al crear',
            e
        })
    }
})

router.delete('/deletePlanAlim/:id',[verificarUsuario,verificarAdmin], async (req, res) => {
    const _id = req.params.id
    try {
        const planAlimDB = await PlanAlim.findByIdAndDelete({_id})
        if(!planAlimDB){
            return res.status(404).json({message:'El id no existe',error})
        }
        return res.json(planAlimDB)
    } catch(e){
        return res.status(500)
    }
})

router.put('/updatePlanAlim/:id',[verificarUsuario,verificarAdmin], async (req, res) => {
    const _id = req.params.id
    const body = _.pick(req.body,['planAlimPrecio','tipoMenu','planAlimCalcMin','planAlimCalcMax'])

    try{
        const planAlimDB = await PlanAlim.findByIdAndUpdate(
            _id,
            body,
            {
                new:true,
                runValidator:true
            })
        return res.json(planAlimDB)
    } catch(e){
        return res.status(500).json({
            message: 'Error al momendo de actualizar',
            e
        })
    }
})

module.exports = router;