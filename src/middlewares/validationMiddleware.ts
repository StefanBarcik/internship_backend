import { Request, Response, NextFunction} from 'express'
import {Schema} from "joi";

export default function validationMiddleware(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const {params, body, query} = req
        const validation = schema.validate({params, body, query});
        if (validation.error) {
            return res.status(400).json({
                message: 'validation error',
                error: validation.error.message
            });
        }

        return next()
    }
}

