import { Request, Response } from 'express'


export const updateOne = (req: Request, res: Response) => {
    const {id} = req.params
    const {firstName, lastName, birthdate, weight, height, identificationNumber, gender, diagnoseID} = req.body

    res.status(200).json({
        messages: [
            {
                message: "string",
                type: "SUCCESS"
            }
        ]
    })
}