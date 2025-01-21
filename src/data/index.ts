import { exit } from 'node:process'
import db from '../config/db'

const clearDB = async () => {
    try {
        await db.sync({ force: true })
        console.log('Registros de la DB borrados satisfactoriamente');
        exit()
    } catch (error) {
        console.log('Error al intentar eliminar registros en la DB');
        exit(1)
    }
}
if(process.argv[2] === '--clear'){
    clearDB()
}