const {Router} = require('express');
const {login, googleSignIn, renewToken} = require('../controllers/auth');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campo');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post('/' ,
 [
    check('email', 'email is requireed').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validarCampos

 ], 
 login
 )

 
router.post('/google' ,
[
   check('token', 'google token is required').not().isEmpty(),
   validarCampos

], 
googleSignIn
)

router.get('/renew' ,
   validarJWT, 
   renewToken
)

module.exports = router;