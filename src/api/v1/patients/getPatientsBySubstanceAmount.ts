import { Request, Response } from 'express'
import {PatientModel} from "../../../db/models/patient";
import {DiagnoseModel} from "../../../db/models/diagnose";
import {SubstanceModel} from "../../../db/models/substance";
import {Op, Sequelize} from "sequelize";


export const getAllPatientsBySubstanceAmount = async (req: Request, res: Response) => {
    const age = new Date(Date.now() - 568080000000).toLocaleDateString("en-CA"); // get date yyyy-mm-dd for patient to be 18 y.r
    const adults: PatientModel[] = await PatientModel.findAll({
            include: [{
                model: DiagnoseModel,
                required: true,
                attributes: [

                ],
                include: [{
                    model: SubstanceModel,
                    required: true,
                }]
            }],
            attributes: [
                'weight',
                [Sequelize.literal('((2*weight)+30)'), 'amount'],
                [Sequelize.literal(`'adult'`), 'patientType']
            ],
            where: {
                weight: {
                    [Op.between]: [1,200]
                },
                birthdate: {
                    [Op.lte]: new Date(age)
                }
            },
            order: [['weight','DESC']]
        })

    const children: PatientModel[] = await PatientModel.findAll({
        include: [{
            model: DiagnoseModel,
            required: true,
            attributes: [
            ],
            include: [{
                model: SubstanceModel,
                required: true,
            }]
        }],
        attributes: [
            'weight',
            [Sequelize.literal('((1.6*weight)+20)'), 'amount'],
            [Sequelize.literal(`'child'`), 'patientType']
        ],
        where: {
            weight: {
                [Op.between]: [1,200]
            },
            birthdate: {
                [Op.gt]: new Date(age)
            }
        },
        order: [['weight','DESC']]
    })

    const patients = adults.concat(children);
    res.status(200).json({
        patients
    })
}