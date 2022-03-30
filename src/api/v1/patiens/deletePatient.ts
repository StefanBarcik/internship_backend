import { Request, Response } from 'express'


export const delOne = (req: Request, res: Response) => {
    const {id} = req.params
    res.status(200).json({
        messages: [
            {
                message: "string",
                type: "SUCCESS"
            }
        ]
    })
}