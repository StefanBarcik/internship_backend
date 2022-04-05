import { Request, Response } from 'express'
import Joi from "joi";
import {PatientModel} from "../../../db/models/patient";

export const schemaGetPatients = Joi.object({
    body: Joi.object({
        gender : Joi.string().valid('MALE', 'FEMALE').optional(),
        order : Joi.string().optional(),
        limit : Joi.number().min(1).optional(),
        page : Joi.number().min(1).optional()
    }),
    query: Joi.object(),
    params: Joi.object()
});

export const getAll = async (req: Request, res: Response) => {
    const {gender, order, limit, page} = req.body
    const patients: PatientModel[] = await PatientModel.findAll() //{where: {gender},limit}

    res.status(200).json({
        patients
    })
}


