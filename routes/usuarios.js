const {Router} = require('express');
const {check} = require('express-validator');
const {getUsuarios, crearUsuarios, actualizarUsuario, deleteUsuario} = require('../controllers/usuario')
const router = Router();
const {validarCampos} = require('../middlewares/validar_campo');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/', validarJWT , getUsuarios);
router.delete('/:id', validarJWT ,
        deleteUsuario);

router.put('/:id' ,
  [
    validarJWT,
    check('nombre', 'Name is required').not().isEmpty(),
    check('role', 'Role is required').not().isEmpty(),
    check('email', 'email is requireed').isEmail(),
    validarCampos
  ],
   actualizarUsuario);

router.post('/', 
    [
        check('nombre', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'email is requireed').isEmail(),
        validarCampos
    ]
     , crearUsuarios);


module.exports = router;