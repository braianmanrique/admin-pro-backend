const { response} = require('express');
const Medico = require('../models/medico')


const getMedicos = async (req, res = response) => {
    const medicos = await Medico.find()
                .populate('usuario','nombre')
                .populate('hospital','nombre')

    res.json({
        ok: true,
        msg: 'get medicos ',
        medicos
    })
}

const crearMedicos = async(req, res = response) => {
    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body,
        medico: ''
    });
    try {
        const medicoDB= await medico.save();
        res.json({
            ok: true,
            medico: medicoDB
        })
    } catch (error) {
        res.json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
  
}

const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizar medico '
    })
}

const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: ' borrar medico '
    })
}
module.exports = {
    getMedicos,
    crearMedicos,
    borrarMedico,
    actualizarMedico
}