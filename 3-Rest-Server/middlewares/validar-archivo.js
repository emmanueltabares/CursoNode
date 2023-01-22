const { request, response } = require("express");

const validarArchivo = (req = request, res = response, next) => {
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json('No hay archivos para subir - validar archivo a subir');
    }

    next()
}

module.exports = {
    validarArchivo,
}