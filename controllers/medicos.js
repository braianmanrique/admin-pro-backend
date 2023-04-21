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

const actualizarMedico = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const medico = await Medico.findById(id);
        console.log('first')
        if(!medico){
            return  res.status(404).json({
                ok: false,
                msg: 'No se encontro nada por id'
            })
        }
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true});

        res.json({
            ok: true,
            hospital: medicoActualizado
            
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'go to admin'
        })
    }
}

const borrarMedico = async(req, res = response) => {
    const id = req.params.id;

    try {
        const medico = await Medico.findById(id);
        if(!medico){
            return  res.status(404).json({
                ok: false,
                msg: 'No se encontro nada por id'
            })
        }

        await Medico.findByIdAndDelete(id)        

        res.json({
            ok: true,
            msg: 'Medico deleted'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'go to admin'
        })
    }    
}
module.exports = {
    getMedicos,
    crearMedicos,
    borrarMedico,
    actualizarMedico
}