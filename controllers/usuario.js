
const { response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    });
};
const deleteUsuario = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con este id'
            })
        }   

        await Usuario.findByIdAndDelete(uid);

        return res.status(200).json({
            ok: true,
            msg: 'User deleted',
            
        })
    
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
   
}
const actualizarUsuario =  async(req, res = response) => {
    const uid = req.params.id;
    
    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario'
            })
        }
        const { password , google, email, ...campos} = req.body;
        if(usuarioDB.email !== email){
        
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    of: false,
                    msg: 'Ya existe un usuario con este Email'
                });
            }
        }
        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new :true});

        res.json({
            ok: true,
            usario : usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        })
    }
}

const crearUsuarios = async(req, res = response) => {
    const {email, password, nombre} = req.body;
 
    try {
        const existeEmail =await Usuario.findOne({email});
        if(existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado epa'
            });
        }

        const usuario = new Usuario(req.body);

        // encrypt password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
    
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            usuario,
            token
        });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }
 
};

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    deleteUsuario
}