import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"


export const handleInputError = (req: Request, res: Response, next:NextFunction) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        next() //? si error se encuentra vacio pasara a la siguiente función
    } else {
        res.status(400).json({error: error.array()})
    }
}