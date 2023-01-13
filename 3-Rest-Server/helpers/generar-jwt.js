const { jwt } = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise((res, rej) => {
        
        const payload = { uid };

        jwt.sing(payload, process.env.SECRETKEY, {
            expiresIn: '4h'
        }, (err, token) => {

            if(err) {
                console.log(err)
                rej('No se pudo generar el token')
            } else {
                res(token)
            }
        })
    })
}

module.exports = { 
    generarJWT
}