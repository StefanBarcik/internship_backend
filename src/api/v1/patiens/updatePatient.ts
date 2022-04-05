import { Request, Response } from 'express'
import Joi from "joi";
import {PatientModel} from "../../../db/models/patient";

export const schemaUpdatePatient = Joi.object({
    body: Joi.object({
        firstName: Joi.string().max(100).optional(),
        lastName: Joi.string().max(100).optional(),
        birthdate: Joi.string().optional(),
        weight: Joi.number().min(1).max(200).optional(),
        height: Joi.number().min(1).optional(),
        identificationNumber: Joi.string().pattern(/^[a-zA-Z0-9]*$/).length(12).optional(),
        gender : Joi.string().valid('MALE', 'FEMALE').optional(),
        diagnoseID: Joi.number().min(1).optional()
    }),
    query: Joi.object(),
    params: Joi.object({
        id: Joi.number().min(1).required()
    })
});


export const updateOne = async (req: Request, res: Response) => {
    const {body, query, params} = req
    const patient: PatientModel = await PatientModel.findOne({where: {id: params.id}})
    patient.update({firstName: body.firstName, lastName: body.lastName})
    res.status(200).json({
        message: 'Patient updated',
        patient
    })
}