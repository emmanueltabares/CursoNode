const { response, request } = require('express')
const Usuario = require('../models/user')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');

class User {

  get = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        usuarios
    });
  }

  put = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
  }

  patch = async (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


  post = async (req, res = response) => {

    const errors = validationResult(req);

    if(errors.isEmpty()) {
      return res.status(400).json(errors)
    }

    const { nombre, email, password, rol } = req.body;
    const usuario = new Usuario({ nombre, email, password, rol });

    const existeEmail = await Usuario.findOne({ email })
    if(existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya está registrado'
      });
    }

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save()

    res.json({
        ok: true,
        msg: 'Usuario creado',
        usuario
    })
  }

  delete = async (req, res = response) => {
    const { id } = req.params;
  
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json(usuario);
  }
}


module.exports = {
  User: new User()
}