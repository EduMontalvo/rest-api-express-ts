import { Request, Response } from 'express'
import Product from '../models/Products.model'
export const createProduct = async (req: Request, res: Response) => {
    try {
        const products = await Product.create(req.body)
        res.json({ data: products })
    } catch (error) {
        console.log(error)
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll()
        res.json({ data: products })
    } catch (error) {
        console.log(error);
    }
}
export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const products = await Product.findByPk(id)
        res.json({ data: products })
    } catch (error) {
        console.log(error);
    }
}
export const updateProducts = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (product) {
        await product.update(req.body)
        await product.save()
    } else {
        res.status(400).json({ error: 'Producto no encontrado' })
    }
    res.json({ data: product })
}
export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (product) {
        product.availability = !product.dataValues.availability
        await product.save()
    } else {
        res.status(400).json({ error: 'Producto no encontrado' })
    }
    res.json({ data: product })
}

export const deleteProduct = async (req:Request, res:Response) => {
    const {id} = req.params
    const product = await Product.findByPk(id)
    if(product){
        await product.destroy()
    }else{
        res.status(400).json({error:'Producto no encontrado'})
    }
    res.json({data : 'Producto eliminado'})
}