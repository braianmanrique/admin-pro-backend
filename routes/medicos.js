const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar_campo');
const { validarJWT } = require('../middlewares/validar-jwt');

const {   getMedicos,
    crearMedicos,
    borrarMedico,
    actualizarMedico} = require('../controllers/medicos')

   
const router = Router();

router.get('/', validarJWT , getMedicos);
router.delete('/:id', validarJWT ,
borrarMedico);

router.put('/:id' ,
  [],
  actualizarMedico);

router.post('/', 
    [
      validarJWT,
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('hospital', 'El id del hospital debe de ser valido').isMongoId(),
      
      validarCampos

    ]
     , crearMedicos);


module.exports = router;