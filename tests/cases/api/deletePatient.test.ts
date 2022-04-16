import supertest from 'supertest'
import { expect } from 'chai'
import app from '../../../src/app'

const url = '/api/v1/patients'

describe(`[DEL] ${url + '/' + ':id'}`, () => {

    it('Response should not find patientID', async () => {
        const response = await supertest(app)
            .del(url+ '/' + 10000)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(404)
        expect(response.type).to.eq('application/json')
    })

})