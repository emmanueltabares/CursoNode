const { isAdmin, tieneRol } = require('./validar-roles')
const { validarCampos } = require('./validar-campos')
const { validarJWT } = require('./validar-jwt')

module.exports = {
    isAdmin,
    tieneRol,
    validarCampos,
    validarJWT
}

