const argv = require('yargs')
                .option('b', {
                    alias: 'base',
                    type: 'number',
                    demandOption: true,
                    describe: 'Es la base de la tabla de multiplicar'
                })
                .option('l', {
                    alias: 'listar',
                    type: 'boolean',
                    demandOption: true,
                    default: false,
                    describe: 'Muestra la tabla en consola'
                })
                .option('h', {
                    alias: 'hasta',
                    type: 'numbre',
                    demandOption: true,
                    default: 5,
                    describe: 'Límite de multiplicación para realizar'
                })
                .check((argv, op) => {
                    if(isNaN(argv.b)) {
                        throw 'La base tiene que ser un número'
                    }

                    return true;
                })
                .argv;

module.exports = argv;
