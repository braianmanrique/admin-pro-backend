const {Router} = require('express');
const {login} = require('../controllers/auth');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campo');


const router = Router();

router.post('/' ,
 [
    check('email', 'email is requireed').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validarCampos

 ], 
 login
 )

module.exports = router;