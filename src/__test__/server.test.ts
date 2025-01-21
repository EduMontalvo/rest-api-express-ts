import request from 'supertest'
import server, { connectDB } from '../server'
import db from '../config/db'

describe('GET /api', () => {
    test('should send back a json response', async () => {
        const response = await request(server).get('/api')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.msg).toBe('Desde API') //? body es para evaluar el contenido,es decir el json de la consulta al endpoint

        expect(response.status).not.toBe(400)
        expect(response.body.msg).not.toBe('desde api')
    })
})

describe('connect DB', () => {
    jest.mock('../config/db')
    test('should error when connect DB',  async() => {
        jest.spyOn(db,'authenticate').mockRejectedValueOnce(new Error('Forzando el valor para probar el catch'))
        const consoleSpy = jest.spyOn(console,'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('HUBO UN PROBLEMA AL CONECTARSE A LA DB'))
    })
})