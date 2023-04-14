const { response} = require('express');

const Hospital = require('../models/hospital')


const getHospitales = async (req, res = response) => {
    const hospitales = await Hospital.find()
                                        .populate('usuario','nombre')

    res.json({
        ok: true,
        msg: 'hospitales ',
        hospitales
    })
}

const crearHospitales = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });


    try {
        const hospitalDB= await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB 
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'talk admi'
        })
    }

 
}

const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizar hospital '
    })
}

const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: ' borrar hospitales '
    })
}
module.exports = {
    getHospitales,
    crearHospitales,
    borrarHospital,
    actualizarHospital
}