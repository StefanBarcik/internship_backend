import { Router } from 'express'

import validateReqBody from '../../../middlewares/validateReqBody'
import validateReqParams from "../../../middlewares/validateReqParams";
import * as GetPatients from './getPatients'
import * as AddPatient from './addPatient'
import * as UpdatePatient from './updatePatient'
import * as DeletePatient from  './deletePatient'

const router = Router()

export default () => {
    router.get('/', validateReqParams(), validateReqBody(), GetPatients.getAll)
    router.get('/:id', validateReqParams(), GetPatients.getOne)
    router.post('/', validateReqParams(), validateReqBody(), AddPatient.addOne)
    router.patch('/:id', validateReqParams(), validateReqBody(), UpdatePatient.updateOne)
    router.delete('/:id', validateReqParams(), DeletePatient.delOne)

    return router
}
