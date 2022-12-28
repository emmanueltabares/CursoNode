const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer.js');
const Busquedas = require('./models/busquedas.js');

const main = async () => {
    
    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu()

        switch( opt ) {
            case 1:

            const lugar = await leerInput('Ciudad: ');
            await busquedas.ciudad(lugar);

            console.log()
            console.log('Informacion de la ciudad'.green)
            console.log('Ciudad: ', )
            console.log('Lat: ', )
            console.log('Lng: ', )
            console.log('Temperatura: ', )
            console.log('Mínima: ', )
            console.log('Máxima: ', )

            break;
            case 2:
                break;
        }

        await pausa();

    } while(opt !== 0)
}

main();