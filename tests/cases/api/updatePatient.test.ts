import supertest from 'supertest'
import { expect } from 'chai'
import app from '../../../src/app'
import {responseSchema} from "../../../src/api/v1/patients/getPatients";

const url = '/api/v1/patients'

describe(`[PATCH] ${url + '/' + ':id'}`, () => {

    it('Response should update patient', async () => {
        const patientData = { firstName : "Joana",
            lastName: "Borer",
            birthdate: "1986-06-03",
            weight: 120,
            height: 50,
            identificationNumber: "888855554444",
            gender: "FEMALE",
            diagnoseID: 53301}

        const response = await supertest(app)
            .patch(url+ '/' + 50)
            .send(patientData)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')

        const validationResult = responseSchema.validate(response.body.patients)
        expect(validationResult.error).to.eq(undefined)
    })

    it('Response should not find patientID', async () => {
        const response = await supertest(app)
            .patch(url+ '/' + 10000)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(404)
        expect(response.type).to.eq('application/json')
    })

    it('Response should not update patient because of random parameter', async () => {
        const patientData = { firstName : "Joana",
            lastName: "Borer",
            birthdate: "1986-06-03",
            weight: 120,
            height: 50,
            identificationNumber: "888855554444",
            gender: "FEMALE",
            diagnoseID: 53301,
            random: 5014}

        const response = await supertest(app)
            .patch(url+ '/' + 50)
            .send(patientData)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(400)
        expect(response.type).to.eq('application/json')
    })
})