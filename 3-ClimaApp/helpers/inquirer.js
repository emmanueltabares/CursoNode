require('colors');
const inquirer = require('inquirer');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: '1.'.green + ' Buscar ciudad'
            },
            {
                value: 2,
                name: '2.'.green + ' Historial'
            },
            {
                value: 0,
                name: '0.'.green + ' Salir'
            }
        ]
    }
]

const inquirerMenu = async () => {
    
    console.clear();
    console.log('======================'.green);
    console.log(' Seleccione un opción'.green);
    console.log('======================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas)   
    return opcion; 
}

const pausa = async () => {

    const pause = [
        {
            type: 'input',
            name: 'pause',
            message: `Presione ${'ENTER'.green} para continuar`,
        }
    ]

    await inquirer.prompt(pause);
}

const leerInput = async ( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if(this.value === 0) {
                    return 'Por favor ingrese un valor';
                } return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(question)
    return desc;
}

const listadoTareasBorrar = async (tareas = []) => {

    const choices = tareas.map((t, idx) => {

        const id = `${idx + 1 }.`.green

        return {
            value: t.id,
            name: `${id} ${t.desc}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async (tareas = []) => {

    const choices = tareas.map((t, idx) => {

        const id = `${idx + 1 }.`.green

        return {
            value: t.id,
            name: `${id} ${t.desc}`,
            checked: ( t.completadoEn ) ? true : false
        }
    })

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}