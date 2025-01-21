import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProducts } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputError } from "./middleware";

const router = Router()

    router.get('/', getProducts),
    router.get('/:id',
        param('id').isNumeric().withMessage('ID no valido'),
        handleInputError,
        getProductById
    ),
    router.post('/',
        body('name')
            .notEmpty().withMessage('El campo name no puede ir vacio'),
        body('price')
            .isNumeric().withMessage('El campo price tienen que ser un numero entero')
            .notEmpty().withMessage('El campo price  no puede estar vacio')
            .custom(value => value > 0).withMessage('El campo price no puede ser negativo'),
        handleInputError,
        createProduct
    ),
    router.put('/:id',
        param('id').isInt().withMessage('ID no valido'),
        body('name')
            .notEmpty().withMessage('El campo name no puede ir vacio'),
        body('price')
            .isNumeric().withMessage('El campo price tienen que ser un numero entero')
            .notEmpty().withMessage('El campo price  no puede estar vacio')
            .custom(value => value > 0).withMessage('El campo price no puede ser negativo'),
        body('availability').isBoolean().withMessage('Valor para disponibilidad no valido'),
        handleInputError,
        updateProducts
    ),
    router.patch('/:id',
        param('id').isNumeric().withMessage('ID no valido'),
        handleInputError,
        updateAvailability
    ),
    router.delete('/:id', 
        param('id').isInt().withMessage('ID no valido'),
        handleInputError,
        deleteProduct
    )

export default router