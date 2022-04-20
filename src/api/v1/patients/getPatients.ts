import { Request, Response } from 'express'
import Joi from "joi";
import {PatientModel} from "../../../db/models/patient";

export const schemaGetPatients = Joi.object({
    body: Joi.object(),
    query: Joi.object({
        gender : Joi.string().valid('MALE', 'FEMALE').optional(),
        order : Joi.string().optional(),
        limit : Joi.number().min(1).optional(),
        page : Joi.number().min(1).optional()
    }),
    params: Joi.object()
});

export const responseSchema = Joi.object({
    patients:Joi.array()
        .items(
            Joi.object({
                id: Joi.number().integer().min(1).required(),
                firstName: Joi.string().max(100).required(),
                lastName: Joi.string().max(100).required(),
                birthdate: Joi.string().required(),
                weight: Joi.number().min(1).max(200).required(),
                height: Joi.number().min(1).required(),
                identificationNumber: Joi.string().pattern(/^[a-zA-Z0-9]*$/).length(12).required(),
                gender : Joi.string().valid('MALE', 'FEMALE').required(),
                diagnoseID: Joi.number().min(1).required()
            }).required()
        ).required(),
})



export const getAll = async (req: Request, res: Response) => {
    const {gender, order, limit, page} = req.query
    const options = {
        where: {
            gender: {}
        },
        limit: Number()
    }
    if (gender !== undefined) {
        options.where.gender = gender
    }
    if (limit !== undefined) {
        options.limit = Number(limit)
    }
    const patients: PatientModel[] = await PatientModel.findAll() //{{where: {gender}, limit : Number(limit)}}

    res.status(200).json({
        patients
    })
}


