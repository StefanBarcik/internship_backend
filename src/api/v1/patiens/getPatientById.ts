import {Request, Response} from "express";
import Joi from "joi";
import {PatientModel} from "../../../db/models/patient";

export const schemaGetPatientId = Joi.object({
    body: Joi.object(),
    query: Joi.object(),
    params: Joi.object({
        id: Joi.number().min(1).required()
    })
});

export const getOne = async (req: Request, res: Response) => {
    const {params, body, query} = req

    const patient: PatientModel = await PatientModel.findOne({where: {id: req.params.id}})
    res.status(200).json({
        patient
    })
}