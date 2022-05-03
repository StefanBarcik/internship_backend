import { Router } from 'express'

import validationMiddleware from '../../../middlewares/validationMiddleware'
import * as GetPatients from './getPatients'
import * as GetPatientById from './getPatientById'
import * as AddPatient from './addPatient'
import * as UpdatePatient from './updatePatient'
import * as DeletePatient from  './deletePatient'
import * as GetPatientsBySubstanceAmount from './getPatientsBySubstanceAmount'
import {schemaAddPatient} from "./addPatient";
import {schemaDeletePatient} from "./deletePatient";
import {schemaUpdatePatient} from "./updatePatient";
import {schemaGetPatientId} from "./getPatientById";
import {schemaGetPatients} from "./getPatients";
import passport from "passport";
import authorizationMiddleware from "../../../middlewares/authorizationMiddleware";

const router = Router()

export default () => {
    router.get('/substanceAmount', GetPatientsBySubstanceAmount.getAllPatientsBySubstanceAmount)
    router.get('/', passport.authenticate('jwt-api'),
        validationMiddleware(schemaGetPatients),
        authorizationMiddleware(['ADMIN', 'SUPER_ADMIN']), GetPatients.getAll)
    //router.get('/:id', validationMiddleware(schemaGetPatientId), GetPatientById.getOne)
    router.get('/:id', passport.authenticate('jwt-api'),
        authorizationMiddleware(['USER','ADMIN', 'SUPER_ADMIN']),
        validationMiddleware(schemaGetPatientId), GetPatientById.getOne)
    router.post('/', passport.authenticate('jwt-api'),
        validationMiddleware(schemaAddPatient),
        authorizationMiddleware(['SUPER_ADMIN']), AddPatient.addOne)
    router.patch('/:id', passport.authenticate('jwt-api'),
        validationMiddleware(schemaUpdatePatient),
        authorizationMiddleware(['SUPER_ADMIN']), UpdatePatient.updateOne)
    router.delete('/:id', passport.authenticate('jwt-api'),
        validationMiddleware(schemaDeletePatient),
        authorizationMiddleware(['SUPER_ADMIN']), DeletePatient.delOne)


    return router
}
