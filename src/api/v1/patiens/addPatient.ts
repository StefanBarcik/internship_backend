import { Request, Response } from 'express'
import Joi from "joi";
import {PatientModel} from "../../../db/models/patient";

export const schemaAddPatient = Joi.object({
    body: Joi.object({
        firstName: Joi.string().max(100).required(),
        lastName: Joi.string().max(100).required(),
        birthdate: Joi.string().required(),
        weight: Joi.number().min(1).max(200).required(),
        height: Joi.number().min(1).required(),
        identificationNumber: Joi.string().pattern(/^[a-zA-Z0-9]*$/).length(12).required(),
        gender : Joi.string().valid('MALE', 'FEMALE').required(),
        diagnoseID: Joi.number().min(1).required()
    }),
    query: Joi.object(),
    params: Joi.object()
});

export const addOne = async (req: Request, res: Response) => {
    const {body, query, params} = req
    const patient: PatientModel = await PatientModel.
    create({firstName: body.firstName ,
    lastName: body.lastName,
    birthdate: body.birthdate,
    weight: body.weight,
    height: body.height,
    identificationNumber: body.identificationNumber,
    gender: body.gender,
    diagnoseID: body.diagnoseID})
    res.status(200).json({
        message: 'Patient added',
        PatientID: patient.id
    })
}