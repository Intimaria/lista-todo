require('colors')
const { guardarDB, leerDB } = require('./helpers/guardarArchivo.js');
const { 
    inquireMenu, 
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
    } = require('./helpers/inquirer.js')
const Tareas = require('./models/tareas');



const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) { // Cargar las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }


    do {
     
        // mostrar menu 
        opt = await inquireMenu();

        switch (opt) {
            case '1': // crear opcion 
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea( desc );
            break;

            case'2': // mostrar tareas
                tareas.listadoCompleto();
                console.log();
            break;

            case'3': // listar completadas
                tareas.listarPendientesCompletadas(true);
                console.log();
            break;

            case'4': // listas pendientes
                tareas.listarPendientesCompletadas(false);
                console.log();      
            break;

            case'5': // completado || pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr)
                tareas.toggleCompletadas( ids );
            break;

            case'6': // borrar opcion
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0'){
                    const ok = await confirmar('¿Esta seguro?'); 
                    if (ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada')
                    }
                }               
                break;
        }

        guardarDB( tareas.listadoArr );

        await pausa();

    } while (opt !== '0')

}
main()