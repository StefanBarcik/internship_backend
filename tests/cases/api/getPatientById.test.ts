import supertest from 'supertest'
import { expect } from 'chai'
import app from '../../../src/app'
import { responseSchema } from '../../../src/api/v1/patients/getPatients'

const url = '/api/v1/patients'

describe(`[GET] ${url + '/' + ':id'}`, () => {
    it('Response should return one patient', async () => {
        const response = await supertest(app)
            .get(url + '/' + 8)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')

        const validationResult = responseSchema.validate(response.body.patients)
        //console.log(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

    it('Response should not find patientID', async () => {
        const response = await supertest(app)
            .get(url+ '/' + 10000)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(404)
        expect(response.type).to.eq('application/json')
    })

})