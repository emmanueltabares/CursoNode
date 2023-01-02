const { response, request } = require('express')

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

  post = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        ok: true,
        msg: 'Usuarios Post',
        nombre,
        edad
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