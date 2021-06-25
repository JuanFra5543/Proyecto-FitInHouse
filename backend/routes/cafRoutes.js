import express from 'express'
const router = express.Router();

import Caf from '../models/caf'

router.get('/caf', async (req, res) => {
    try {
        const cafDB = await Caf.find();
        res.json(cafDB);
    } catch (error) {
        return res.status(500);
    }
});

router.get('/caf/:cafMayor/:cafGenero', async (req, res) => {
    const cafMayor = req.params.cafMayor;
    const cafGenero = req.params.cafGenero;
    try {
        const cafDB = await Caf.find({cafMayor: cafMayor, cafGenero: cafGenero});
        res.json(cafDB);
    } catch (error) {
        return res.status(500);
    }
});

router.post('/nuevoCaf',async (req, res) => {
    const body = {
        cafValor: req.body.cafValor,
        cafDesc: req.body.cafDesc,
        cafGenero: req.body.cafGenero,
        cafMayor: req.body.cafMayor,
    }
    try{
        const cafDB = await Caf.create(body);
        res.status(200).json(cafDB);
    }catch (error){
        return res.status(500);
    }
});

module.exports = router;