const { response, request } = require('express')
const Usuario = require('../models/user')
const bcrypt = require('bcryptjs')

class User {

  get = (req = request, res = response) => {

    const query = req.query;

    res.status(400).json({
        ok: true,
        msg: 'Usuarios Get'
    })
  }

  put = (req, res = response) => {

    const id = req.params.id;

    res.status(400).json({
        ok: true,
        msg: 'Usuarios Put',
        id
    })
  }

  post = async (req, res = response) => {

    const { nombre, email, password, rol } = req.body;
    const usuario = new Usuario({ nombre, email, password, rol });

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save()

    res.json({
        ok: true,
        msg: 'Usuario creado',
        usuario
    })
  }

  delete = (req, res = response) => {
    res.status(400).json({
        ok: true,
        msg: 'Usuarios Delete'
    })
  }
}


module.exports = {
  User: new User()
}