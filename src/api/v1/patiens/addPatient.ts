import { Request, Response } from 'express'


export const addOne = (req: Request, res: Response) => {
    const {firstName, lastName, birthdate, weight, height, identificationNumber, gender, diagnoseID} = req.body
    res.status(200).json({
        messages: [
            {
            message: "string",
            type: "SUCCESS"
            }
        ],
        patient: {
            id: 0
        }
    })
}