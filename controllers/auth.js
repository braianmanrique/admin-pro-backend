const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
 const {generarJWT} = require('../helpers/jwt')


const login = async (req , res = response) => {
    const {email, password} = req.body;


    try {

        const usuarioDB =  await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email is not valid'
            });
        }
        // verificar password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Password is not valid'
            })
        }

        //generar jwt
        const token = await generarJWT(usuarioDB.id)

        res.json({
            ok: true,
            msg: 'hello you are into',
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Talk with admi'
        })
    }
}

module.exports = {
    login
}