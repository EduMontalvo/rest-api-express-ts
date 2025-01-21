import request from "supertest";
import server from "../../server";

describe('POST /api/products', () => {

    test('should display validate errors', async () => {
        const response = await request(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    test('should validate that the price is greater than 0 ', async () => {
        const response = await request(server).post('/api/products').send({
            name: "monitor Test",
            price: 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(401)
        expect(response.body.errors).not.toHaveLength(3)
    })


    test('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Product 1 - Test',
            price: 200
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')
        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(200)
    })
})
describe('GET /api/products', () => {
    test('should check if api/products url exists', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })
    test('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.body).not.toHaveProperty('errors')
    })
})
describe('GET /api/products/:id', () => {
    test('should return a 404 response for non-existent product', async () => {
        const productID = 4000
        const response = await request(server).get(`/api/products/${productID}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })
    test('should check a valid ID in the url', async () => {
        const response = await request(server).get('/api/products/non-valid-url')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no valido')
    })
    test('get a JSON response for a single product', async () => {
        const response = await request(server).get('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
    })
})
describe('PUT /api/products/:id', () => {
    test('should check a valid ID in the URL', async () => {
        const response = await request(server).put('/api/products/no-valid-url').send({
            name: "Smartwatch Haylou",
            price: 200,
            availability: true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no valido')
    })

    test('should display validation error messages when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('should validate that the price is greater than 0 ', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: "Audifonos Monster Airmars XK101",
            price: 0,
            availability: true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('El campo price no puede ser negativo')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('should return a 404 response for a non-existent product ', async () => {
        const productID = 4000
        const response = await request(server).put(`/api/products/${productID}`).send({
            name: "Audifonos Monster Airmars XK101",
            price: 20,
            availability: true
        })
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('should update an existing product with valid data ', async () => {
        const response = await request(server).put(`/api/products/1`).send({
            name: "Audifonos Monster Airmars XK101",
            price: 20,
            availability: true
        })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })
})
describe('PATCH /api/products', () => {
    test('should return a 404 ', async () => {
        const productID = 4000
        const response = await request(server).patch(`/api/products/${productID}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('successful patch product', async () => { 
        const response = await request(server).patch('/api/products/1')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(false)

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })

})
describe('DELETE /api/products/:id', () => {

    test('should check a valid id ', async () => {
        const response = await request(server).delete('/api/products/not-valid')

        expect(response.status).toBe(400)
        expect(response.body.errors[0].msg).toBe('ID no valido')
        expect(response.body).toHaveProperty('errors')


    })
    test('should return a 404 response for a non-existent product', async () => {
        const productID = 4000
        const response = await request(server).delete(`/api/products/${productID}`)

        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.body).toHaveProperty('error')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    test('should delete a product', async () => {
        const response = await request(server).delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('Producto eliminado')

        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
    })
})
