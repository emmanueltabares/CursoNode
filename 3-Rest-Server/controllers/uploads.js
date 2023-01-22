const { response, request } = require("express");
const { subirArchivo } = require('../helpers')
const { Usuario, Producto } = require('../models')

const cargarArchivo = async (req, res = response) => {

  try {
    const nombre = await subirArchivo(req.files, undefined, 'imgs')
    
    res.json({
      ok: true,
      nombre
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err
    })    
  }
}

const actualizarImagen = async (req = request, res = response) => {
  
  const { id, coleccion } = req.params

  let modelo;

  switch(coleccion) {
    case 'usuarios':

    modelo = await Usuario.findById(id)
    if(!modelo) {
      return res.status(400).json({
        ok: false,
        msg: `No existe un usuario con id ${ id} `
      })
    }

      break;

    case 'productos':

    modelo = await Producto.findById(id)
    if(!producto) {
      return res.status(400).json({
        ok: false,
        msg: `No existe un usuario con id ${ id} `
      })
    }

     break;
    
     default:
     return res.status(500).json({ ok: false, msg: 'Colección no validada' })
  }

  if ( modelo.img ) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
    if ( fs.existsSync( pathImagen ) ) {
        fs.unlinkSync( pathImagen );
    }
}

  const nombre = await subirArchivo( req.files, undefined, coleccion)
  modelo.img = nombre;

  await modelo.save()

  res.json( modelo )
}

const mostrarImagen = async(req, res = response ) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch ( coleccion ) {
      case 'usuarios':
          modelo = await Usuario.findById(id);
          if ( !modelo ) {
              return res.status(400).json({
                  msg: `No existe un usuario con el id ${ id }`
              });
          }
      
      break;

      case 'productos':
          modelo = await Producto.findById(id);
          if ( !modelo ) {
              return res.status(400).json({
                  msg: `No existe un producto con el id ${ id }`
              });
          }
      
      break;
  
      default:
          return res.status(500).json({ msg: 'Se me olvidó validar esto'});
  }

  if ( modelo.img ) {
      // Hay que borrar la imagen del servidor
      const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
      if ( fs.existsSync( pathImagen ) ) {
          return res.sendFile( pathImagen )
      }
  }

  const pathImagen = path.join( __dirname, '../assets/no-image.jpg');
  res.sendFile( pathImagen );
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}