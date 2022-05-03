import express, { Request } from 'express'
import passport from 'passport'
import {Strategy as JwtStrategy} from 'passport-jwt'
import {ExtractJwt, VerifiedCallback} from 'passport-jwt'

import v1 from './api/v1'
import sequelize from "./db";

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

passport.use('jwt-api', new JwtStrategy({
    audience: 'jwt-api',
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), ExtractJwt.fromUrlQueryParameter('token')]),
    passReqToCallback: true,
    secretOrKey: process.env.JWT_SECRET
}, (req: Request, payload: { userID: number, patientID: number, aud: string }, done: VerifiedCallback)=>{
    console.log(payload)
    let user
    if(payload.userID===1) {
        user={
            id: payload.userID,
            patientID: payload.patientID,
            role: 'USER'
        }
    } else if(payload.userID===2) {
        user={
            id: payload.userID,
            role: 'ADMIN'
        }
    } else if(payload.userID===3) {
        user={
            id: payload.userID,
            role: 'SUPER_ADMIN'
        }
    } else {
        throw new Error('Unauthorized').message
    }
    done(null, user)
}))

passport.serializeUser((user, done)=>done(null,user))
passport.deserializeUser((user, done)=>done(null,user))

// Initialize passport
app.use(passport.initialize())

// Register router
app.use('/api/v1', v1())

sequelize.sync()

export default app
