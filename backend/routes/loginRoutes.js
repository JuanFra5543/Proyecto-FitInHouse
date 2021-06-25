import express from 'express';
const router = express.Router();
const jwt = require('jsonwebtoken');
import Usuario from '../models/usuarios';
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', async (req, res) => {
    const body = req.body;

    try{
        const userDB = await Usuario.findOne({usuarioMail: body.usuarioMail})

        if(!userDB){
            return res.status(400).json({
                message: 'Email no encontrado'
            });
        }

        if(!bcrypt.compareSync(body.usuarioPassword, userDB.usuarioPassword)){
            return res.status(500).json({
                message:'Password Incorrecto'
            });
        }

        //Aqui se genera el token 
        const token = jwt.sign({
            data: userDB
        }, 'secret' , {expiresIn:60*60*24*30});

        res.json({
            userDB,
            token
        })
    } catch(e){
        return res.status(400).json({
            message:'Error',
            e
        })
    }
});

module.exports= router;