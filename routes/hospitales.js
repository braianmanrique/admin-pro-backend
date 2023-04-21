const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar_campo');
const { validarJWT } = require('../middlewares/validar-jwt');

const {  getHospitales,
   crearHospitales,
   borrarHospital,
   actualizarHospital} = require('../controllers/hospitales')

   
const router = Router();

router.get('/', validarJWT , getHospitales);


router.put('/:id' ,
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
  ],
  actualizarHospital);


router.post('/', 
    [validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
    ]
     , crearHospitales);


router.delete('/:id' ,
borrarHospital);


module.exports = router;