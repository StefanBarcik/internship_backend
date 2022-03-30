import { Request, Response } from 'express'

export const getAll = (req: Request, res: Response) => {
    const {gender, order, limit, page} = req.body
    res.status(200).json({
        patients: [
            {
                id: 0,
                firstName: "string",
                lastName: "string",
                birthdate: "2022-03-25T11:28:35.964Z",
                weight: 0,
                height: 0,
                identificationNumber: "string",
                gender: "MALE",
                age: 0,
                personType: "ADULT",
                substanceAmount: 0,
                diagnose: {
                    id: 0,
                    name: "string",
                    description: "string",
                    substance: {
                        id: 0,
                        name: "string",
                        timeUnit: "SECOND",
                        halfLife: 0
                    }
                }
            }
        ],
        pagination: {
            limit: req.body.limit,
            page: req.body.page,
            totalPages: 0,
            totalCount: 0
        }
    })
}

export const getOne = (req: Request, res: Response) => {
    const {id} = req.params
    res.status(200).json({
        patients: [
            {
                id: id,
                firstName: "string",
                lastName: "string",
                birthdate: "2022-03-25T11:28:35.964Z",
                weight: 0,
                height: 0,
                identificationNumber: "string",
                gender: "MALE",
                age: 0,
                personType: "ADULT",
                substanceAmount: 0,
                diagnose: {
                    id: 0,
                    name: "string",
                    description: "string",
                    substance: {
                        id: 0,
                        name: "string",
                        timeUnit: "SECOND",
                        halfLife: 0
                    }
                }
            }
        ],
        pagination: {
            limit: 0,
            page: 0,
            totalPages: 0,
            totalCount: 0
        }
    })
}
