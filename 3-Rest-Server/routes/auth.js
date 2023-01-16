const { Router } = require('express');
const { check } = require('express-validator');
const { Auth } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio'),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
], Auth.login )

router.post('/google', [
    check('id_token', 'El google id_token es obligatorio').not().isEmpty(),
    validarCampos
], Auth.googleSignIn )

module.exports = router;