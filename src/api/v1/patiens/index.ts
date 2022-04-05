import { Router } from 'express'

import validationMiddleware from '../../../middlewares/validationMiddleware'
import * as GetPatients from './getPatients'
import * as GetPatientById from './getPatientById'
import * as AddPatient from './addPatient'
import * as UpdatePatient from './updatePatient'
import * as DeletePatient from  './deletePatient'
import {schemaAddPatient} from "./addPatient";
import {schemaDeletePatient} from "./deletePatient";
import {schemaUpdatePatient} from "./updatePatient";
import {schemaGetPatientId} from "./getPatientById";
import {schemaGetPatients} from "./getPatients";

const router = Router()

export default () => {
    router.get('/', validationMiddleware(schemaGetPatients), GetPatients.getAll)
    router.get('/:id', validationMiddleware(schemaGetPatientId), GetPatientById.getOne)
    router.post('/', validationMiddleware(schemaAddPatient), AddPatient.addOne)
    router.patch('/:id', validationMiddleware(schemaUpdatePatient), UpdatePatient.updateOne)
    router.delete('/:id', validationMiddleware(schemaDeletePatient), DeletePatient.delOne)

    return router
}
