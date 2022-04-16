import { Request, Response } from 'express'
import Joi from "joi";
import {PatientModel} from "../../../db/models/patient";

export const schemaDeletePatient = Joi.object({
    body: Joi.object(),
    query: Joi.object(),
    params: Joi.object({
        id: Joi.number().min(1).required()
    })
});

export const delOne = async (req: Request, res: Response) => {
    const {params} = req
    const patient: PatientModel = await PatientModel.findOne({where: {id: params.id}})
    if (patient) {
        patient.destroy();
        res.status(200).json({
            message: 'Patient deleted',
            PatientID: params.id
        })
    } else {
        res.status(404).json({
            message: 'Patient with id ' + params.id + ' not found',
        })
    }
}