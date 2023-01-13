const { Router } = require('express');
const { check } = require('express-validator');
const { Auth } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio'),
    check('password', 'La contrasea es obligatorio').not().isEmpty(),
    validarCampos
], Auth.login )

module.exports = router;