import { Request, Response } from 'express'
import Product from '../models/Products.model'
export const createProduct = async (req: Request, res: Response) => {
    const products = await Product.create(req.body)
    res.status(201).json({ data: products })
}

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll()
    res.json({ data: products })
}
export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params
    const products = await Product.findByPk(id)
    if (products) {
        res.json({ data: products })
    } else {
        res.status(404).json({ error: 'Producto no encontrado' })
    }
}
export const updateProducts = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (product) {
        await product.update(req.body)
        await product.save()
        res.json({ data: product })
    } else {
        res.status(404).json({ error: 'Producto no encontrado' })
    }
}
export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if (product) {
        product.availability = !product.dataValues.availability
        await product.save()
        res.json({ data: product })
    } else {
        res.status(400).json({ error: 'Producto no encontrado' })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if (product) {
        await product.destroy()
        res.json({ data: 'Producto eliminado' })
    } else {
        res.status(400).json({ error: 'Producto no encontrado' })
    }
}