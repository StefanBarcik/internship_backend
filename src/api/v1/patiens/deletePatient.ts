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
    const {body, query, params} = req
    await PatientModel.destroy({where: {id: params.id}});
    res.status(200).json({
        message: 'Patient deleted',
        PatientID: params.id
    })
}