const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('./config/yargs');

console.clear();

const base = argv.base;
const listar = argv.listar;
const hasta = argv.hasta;

crearArchivo(base, listar, hasta)
    .then(nombreArchivo => console.log(nombreArchivo, 'creado'))
    .catch(err => console.log(err))
