import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'

const server = express()

export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.green.bold(('CONEXION EXITOSA A LA DB')))
    } catch (error) {
        console.log(colors.red.bold('HUBO UN PROBLEMA AL CONECTARSE A LA DB'))
    }
}

connectDB()

server.use(express.json())
server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({ msg: 'Desde API' })
})


export default server