const { request, response } = require('express');
const { Usuario } = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

class Auth {

    login = async (req = request, res = response) => {

        const { email, password } = req.body;

        try {
            const usuario = await Usuario.findOne({ email })
            if(!usuario) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Usuario o Password inválidos'
                });
            }

            if(!usuario.estado) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Usuario o Password inválidos'
                });
            }

            const validPassword = bcryptjs.compareSync(password, usuario.password)

            if(!validPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Usuario o Password inválidos'
                });
            }

            const token = await generarJWT(usuario.id);

            
            res.json({
                ok: true,
                usuario,
                token
            })

        } catch {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: 'Lea los logs'
            })
        }

    }
}

module.exports = {
    Auth: new Auth()
  }