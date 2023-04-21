const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
 const {generarJWT} = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


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
        }
        )
    }

}

const googleSignIn = async (req, res = response)=>{

    try {
        const {email, name, picture} = await googleVerify(req.body.token);
        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if(!usuarioDB){
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        }else{
            usuario = usuarioDB;
            usuario.google = true;
        }
        usuario.save();
        const token = await generarJWT(usuario.id)


        res.json({
            ok: true,
            msg: req.body.token,
            email, name, picture,
            token   
        })
    } catch (error) {
          response.status(400).json({
            ok: true,
            msg: 'token google is not correct'
        })
    }
 
}

const renewToken  = async(req, res= resposne ) => {
    const uid = req.uid;
     //generar jwt
     const token = await generarJWT(uid)   

    res.json({
        ok: true,
        token

    })
}
module.exports = {
    login,
    googleSignIn,
    renewToken
}