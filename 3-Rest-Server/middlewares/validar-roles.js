const { request, response } = require("express")

const isAdmin = (req = request, res = response, next) => {

    if(!req.usuario) {
        return res.status(500).json({
            ok: false,
            msg: 'No se validó correctamente el token'
        })
    }

    const { rol, nombre } = req.usuario

    if(rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            msg: 'Sin permisos suficientes'
        }) 
    }
}

const tieneRol = (...roles) => {

    return (req = request, res = response, next) => {

        if(!req.usuario) {
            return res.status(500).json({
                ok: false,
                msg: 'No se validó correctamente el token'
            })
        }

        if(roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                ok: false,
                msg: 'Sin permisos suficientes'
            }) 
        }

        next()
    }
}

module.exports = {
    isAdmin,
    tieneRol
}