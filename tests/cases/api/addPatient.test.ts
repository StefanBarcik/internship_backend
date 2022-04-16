import supertest from 'supertest'
import { expect } from 'chai'
import app from '../../../src/app'

const url = '/api/v1/patients'

describe(`[POST] ${url}`, () => {
    it('Response should add patient', async () => {
        const patientData = { firstName : "abcd",
            lastName: "efgh",
            birthdate: "2022-03-25T11:28:35.964Z",
            weight: 120,
            height: 50,
            identificationNumber: "aaaaaaaaaaab",
            gender: "MALE",
            diagnoseID: 57972}
        const response = await supertest(app)
            .post(url)
            .send(patientData)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')
    })

    it('Response should not add patient because of existing identification number', async () => {
        const patientData = { firstName : "abcd",
            lastName: "efgh",
            birthdate: "2022-03-25T11:28:35.964Z",
            weight: 120,
            height: 50,
            identificationNumber: "800718axlk5g",
            gender: "MALE",
            diagnoseID: 57972}
        const response = await supertest(app)
            .post(url)
            .send(patientData)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(409 )
        expect(response.type).to.eq('application/json')
    })

})