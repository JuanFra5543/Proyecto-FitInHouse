import express from 'express'
const router = express.Router();
//Importar el modelo
import Usuario from '../models/usuarios';
const {verificarUsuario,verificarAdmin} = require('../autenticacion/autenticacion.js')

const bcrypt = require('bcrypt');
const saltRounds = 10;
const _ = require('underscore');

router.post('/nuevoUsuario', async (req, res) => {

    const body = {
        usuarioNombre: req.body.usuarioNombre,
        usuarioMail: req.body.usuarioMail,
        usuarioRol: req.body.usuarioRol,
        usuarioCodigo: req.body.usuarioCodigo
    }
    //encriptacion contraseña usuarios
    body.usuarioPassword = bcrypt.hashSync(req.body.usuarioPassword, saltRounds);

    try{
        const usuarioDB = await Usuario.create(body);
        res.status(200).json(usuarioDB)
    } catch(e){
        return res.status(500).json({
            message: 'Error al crear Usuario',
            e
        });
    }
});

//PARA OBTENER TODAS LOS DATOS
router.get('/usuarios', async (req, res) => {
    try {
        const usuarioDB = await Usuario.find();
        res.json(usuarioDB);
    } catch (e) {
        return res.status(500).json({
            message: 'Error al obtener',
            e
        });
    }
});

//update usuarios
//,[verificarUsuario,verificarAdmin], 
router.put('/updateUsuario/:id',[verificarUsuario,verificarAdmin], async (req, res) => {
    const _id = req.params.id;
    const body = _.pick(req.body, ['usuarioNombre','usuarioEmail','usuarioPassword','usuarioRol']);

    if(body.usuarioPassword){
        body.usuarioPassword = bcrypt.hashSync(req.body.usuarioPassword,saltRounds);
    }

    try{
        const usuarioDB = await Usuario.findByIdAndUpdate(
            _id,
            body,
            {
                new: true,
                runValidators:true
            });
        return res.json(usuarioDB);
    } catch(e){
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            e
        })
    }
});


module.exports = router