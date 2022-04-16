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
    const {body, params} = req
    const patient: PatientModel = await PatientModel.findOne({where: {id: params.id}})
    if (patient) {
        patient.update({firstName: body.firstName ,
            lastName: body.lastName,
            birthdate: body.birthdate,
            weight: body.weight,
            height: body.height,
            identificationNumber: body.identificationNumber,
            gender: body.gender,
            diagnoseID: body.diagnoseID})
        res.status(200).json({
            message: 'Patient updated',
            patient
        })
    } else {
        res.status(404).json({
            message: 'Patient with id ' + params.id + ' not found',
        })
    }
}