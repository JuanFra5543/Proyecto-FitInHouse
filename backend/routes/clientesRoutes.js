//Siempre crear router
import express from 'express'
const router = express.Router();
//Importar el modelo 
import Cliente from '../models/clientes'

const _ = require('underscore');
const {verificarUsuario,verificarAdmin} = require('../autenticacion/autenticacion.js')
//Importar nanoID el cual acorta el mongoDB ID
const {customAlphabet} = require('nanoid');
//customAlphabet('Caracteres a utilizar para el id', cantidad de caracteres maximos)
const nanoid = customAlphabet('1234567890', 3);

//PARA OBTENER TODAS LOS DATOS
router.get('/cliente', [verificarUsuario,verificarAdmin], async (req, res) => {
    try {
        const clienteDB = await Cliente.find().populate({path:'planAlimenticio', select:'planAlimNombre'}).populate({path: 'caf' ,select:'cafDesc'});
        res.json(clienteDB);
    } catch (error) {
        return res.status(500);
    }
});

//PARA OBTENER LOS DATOS DEL CLIENTE SELECCIONADO
router.get('/cliente/:id', [verificarUsuario,verificarAdmin], async (req, res) => {
    const _id = req.params.id;
    try {
        const clienteDB = await Cliente.findById(_id).populate({path:'planAlimenticio', select:'planAlimNombre'}).populate('caf');
        res.json(clienteDB);
    } catch (error) {
        return res.status(500);
    }
});

//PARA OBTENER LOS DATOS DEL CLIENTE SELECCIONADO
router.get('/cliente/codigoUnico/:codigo', verificarUsuario, async (req, res) => {
    const codigo = req.params.codigo;
    try {
        const clienteDB = await Cliente.findOne({ clienteCodigo: codigo }).populate({path:'planAlimenticio', select:'planAlimNombre'}).populate('caf');
        res.json(clienteDB);
    } catch (error) {
        return res.status(500);
    }
});

//PARA OBTENER LOS DATOS DE LOS CLIENTES SUSCRITOS A UN PLAN
router.get('/cliente/planAlim/:idPlan', [verificarUsuario,verificarAdmin], async (req, res) => {
    const _id = req.params.idPlan;
    try {
        const clienteDB = await Cliente.find().populate({path:'planAlimenticio', select:'planAlimNombre',  match:{ _id: { $eq: _id }}}).populate('caf');
        for(var i in clienteDB){
            if(clienteDB[i].planAlimenticio===null) delete clienteDB[i] 
        }
        res.json(clienteDB);
    } catch (error) {
        return res.status(500);
    }
});


//Generar un post ESTO ES PARA POSTEAR
router.post('/nuevoCliente',async (req, res) => {
    const body = {
        clienteId: nanoid(),
        clienteNombre: req.body.clienteNombre,
        clienteEdad: req.body.clienteEdad,
        clienteEstatura: req.body.clienteEstatura,
        clientePeso: req.body.clientePeso,
        clienteAlergias: req.body.clienteAlergias === '' ? false : true,
        clienteNota: req.body.clienteNota,
        clienteIMC: req.body.clienteIMC,
        clienteGenero: req.body.clienteGenero,
        clienteCalDiarias: req.body.clienteCalDiarias,
        caf: req.body.caf,
        planAlimenticio: req.body.planAlimenticio
    }
    try{
        const clienteDB = await Cliente.create(body);
        res.status(200).json(clienteDB);
    }catch (error){
        return res.status(500);
    }
});

//funcion para eliminar dato
router.delete('/deleteCliente/:id', [verificarUsuario,verificarAdmin],async (req, res) => {
    const _id = req.params.id;
    try {
        const clienteDB = await Cliente.findByIdAndDelete({_id});
        if(!clienteDB){
            return res.status(400).json({message:'El id no existe',error});
        }
        res.json(clienteDB);
    } catch (error) {
        return res.status(500);
    }
});

router.put('/updateCliente/:id',[verificarUsuario,verificarAdmin], async (req, res) => {
    const _id = req.params.id;
    const body = _.pick(req.body, ['clienteEdad','clientePeso','clienteNota','clienteEstatura','clienteIMC','caf','clienteCalDiarias']);
    try{
        const clienteDB = await Cliente.findByIdAndUpdate(
            _id,
            body,
            {
                new: true,
                runValidators:true
            });
        return res.json(clienteDB);
    } catch(e){
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            e
        })
    }
});

//SIEMPRE EXPORTA LAS RUTAS
module.exports = router;