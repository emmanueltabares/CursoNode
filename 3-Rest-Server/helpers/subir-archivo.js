const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((res, rej) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1]
    
        if(!extensionesValidas.includes(extension)) {
            return rej(`La extensión ${extension} no es permitida - ${extensionesValidas}`)
        }
    
        const nombreTemp = uuidv4() + '.' + extension;
    
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp)
    
        archivo.mv(uploadPath, function(err) {
            if (err) {
            return rej(err);
            }
    
            res(nombreTemp);
        });
    })
}

module.exports = { 
    subirArchivo
}