const axios = require('axios');

class Busquedas {

    historial = [];

    constructor(){}

    async ciudad(lugar = '') {

        try {
            const resp = await axios.get('https://reqres.in/api/users?page=2')
            console.log(resp.data)

            return [];
            
        } catch (error) { console.error(error) }

        return [];
    }
}

module.exports = Busquedas;