const Tarea = require('./tarea')
require('colors')
/* 
* _listado:
*   {   'uuid-78754-4834938472: { id: 2, desc: asd, completadoEn:5345443}},
*   {   'uuid-78754-4834938472: { id: 2, desc: asd, completadoEn:5345443}},
*/
class Tareas {

    _listado = {}; 

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        })

        return listado;
    }
 
    constructor() {
        this._listado = {};
    } 

    borrarTarea ( id = '' ){

        if (this._listado[id]){
            delete this._listado[id];
        }
    }
    
    cargarTareasFromArray ( tareas = [] ){

        tareas.forEach( (tarea) => {
        this._listado[tarea.id] = tarea;
        })
    }

    crearTarea( desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        console.log()
        this.listadoArr.forEach( ({desc, completadoEn}, index) => {
            
            const i = `${index + 1}`.green;
            const estado = completadoEn 
                        ? completadoEn.green
                        : 'Pendiente'.red
            console.log(`${i}. ${desc} :: ${estado}`);

        });
    }

    listarPendientesCompletadas ( completadas = true ) {

        console.log()
        this.listadoArr.forEach( ({desc, completadoEn}, index) => {
            
            const i = `${index + 1}`.green;
            let contador = 0;
            const estado = completadoEn 
                        ? 'Completado'.green
                        : 'Pendiente'.red
            if (completadas) {
                // mostrar completadas
                if (completadoEn){
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
                } 
            }
            else 
            {
                //mostrar pendientes
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
               
                }
            }
        
        });
    }

    toggleCompletadas( ids = [ ] ) {

        ids.forEach ( id => {
            
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if ( !ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;