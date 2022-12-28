const fs = require('fs');

const crearArchivo = async (base = 5, listar = false, hasta = 5) => {

    try {
        
        let salida = '';
    
        for(let i = 0; i <= hasta; i++) {
            salida += `${base} x ${i} = ${base * i}\n`;
        }
        
        fs.writeFileSync(`./salida/tabla-${base}.txt`, salida) ;
        
        if(listar) console.log(salida)
    
        return `tabla-${base}.txt`;
    } catch (error) {
        throw error;   
    }
}

module.exports = {
    crearArchivo,
}