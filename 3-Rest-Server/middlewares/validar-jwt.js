const { response, request } = require('express');
const { jwt } = require('jsonwebtoken');

const Usuario = require('../models/user');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.headers('x-token')

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Unauthorized'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETKEY)

        const usuario = await Usuario.findById(uid)
        
        if(!usuario) {
            return res.status(401).json({
                ok: false,
                msg: 'Invalid token - non-existent user'
            }) 
        }
        
        if(!usuario.estado) {
            return res.status(401).json({
                ok: false,
                msg: 'Invalid token - Status user false'
            }) 
        }

        req.usuario = usuario
        
        next();
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        })
    }
}

module.exports = {
    validarJWT
}