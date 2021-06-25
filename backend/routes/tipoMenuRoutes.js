import express from 'express'
const router = express.Router();

import TipoMenu from '../models/tipoMenu'

router.get('/tipoMenu', async (req, res) => {
    try {
        const tipoMenuDB = await TipoMenu.find();
        res.json(tipoMenuDB);
    } catch (error) {
        return res.status(500);
    }
});

router.post('/nuevoTipoMenu',async (req, res) => {
    const body = {
        tipoMenuCod: req.body.tipoMenuCod,
        tipoMenuNombre: req.body.tipoMenuNombre,
        tipoMenuCalorias: req.body.tipoMenuCalorias,
    }
    try{
        const tipoMenuDB = await TipoMenu.create(body);
        res.status(200).json(tipoMenuDB);
    }catch (error){
        return res.status(500);
    }
});


module.exports = router;