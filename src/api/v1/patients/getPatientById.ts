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
    const {params} = req
    const user = req.user as any
    const patient: PatientModel = await PatientModel.findOne({where: {id: params.id}})
    if (patient) {
        if(Number(params.id) !== user.patientID && user.role === 'USER') {
            res.status(403).json({
                'message' : 'This user do not have permission to read this patient data'
            })
        } else {
            res.status(200).json({
                patient
            })
        }
    } else {
        res.status(404).json({
            'message' : 'Patient not found'
        })
    }

}