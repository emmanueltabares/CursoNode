const { request, response } = require('express');
const { Usuario } = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

    googleSignIn = async (req, res = response) => {

        const { id_token } = req.body;

        try {
            const { nombre, imagen, email } = await googleVerify(id_token);
            
            let usuario = await Usuario.findOne({ email })

            if(!usuario) {
                const data = {
                    nombre,
                    email,
                    password: '',
                    imagen,
                    google: true
                }

                usuario = new Usuario(data);
                await usuario.save();
            }

            if(!usuario.estado) {
                return res.status(401).json({
                    ok: false,
                    msg: 'Unauthorized'
                })
            }

            const token = await generarJWT( usuario.id )
            
            res.json({
                ok: true,
                msg: {
                    nombre,
                    token
                }
            })

        } catch (error) {
            res.status(400).json({
                ok: false,
                msg: 'El token no se pudo validar',
                error,
            })
        }
        
    }
}

module.exports = {
    Auth: new Auth()
  }