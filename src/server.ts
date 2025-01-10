import express from 'express'
import router from './router'
import db from './config/db'

const server = express()

async function connectDB () {
    try{
        await db.authenticate()
        db.sync()
        console.log('Conexion exitosa a la DB');
    }catch(error){
        console.log(error);
        console.log('Hubo un problema al conectarse a la DB');
    }
}

connectDB()

server.use('/api/products', router)

export default server