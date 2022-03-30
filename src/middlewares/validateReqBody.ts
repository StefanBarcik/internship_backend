import { Request, Response, NextFunction} from 'express'
import {isNaN, isString} from "lodash";
export default function validateReqBody() {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.body) {
            if (!isString(req.body.firstName) && req.body.firstName) {
                return res.status(400).send("firstName must be a String");
            }
            if (!isString(req.body.lastName) && req.body.lastName) {
                return res.status(400).send("lastName must be a String");
            }
            if (!isString(req.body.birthdate) && req.body.birthdate) {
                return res.status(400).send("birthdate must be a String");
            }
            if (isNaN(Number(req.body.weight)) && req.body.weight) {
                return res.status(400).send("weight must be a number");
            }
            if (isNaN(Number(req.body.height)) && req.body.height) {
                return res.status(400).send("height must be a number");
            }
            if (!isString(req.body.identificationNumber) && req.body.identificationNumber) {
                return res.status(400).send("identificationNumber must be a String");
            }
            if (!isString(req.body.gender) && req.body.gender) {
                return res.status(400).send("gender must be a String");
            }
            if (!isString(req.body.order) && req.body.order) {
                return res.status(400).send("order must be a String");
            }
            if (isNaN(Number(req.body.limit)) && req.body.limit) {
                return res.status(400).send("limit must be a number");
            } else {
                if (Number(req.body.limit) < 1) {
                    return res.status(400).send("limit must be > 0");
                }
            }
            if (isNaN(Number(req.body.page)) && req.body.page) {
                return res.status(400).send("page must be a number");
            } else {
                if (Number(req.body.page) < 1) {
                    return res.status(400).send("page must be > 0");
                }
            }
        }

        return next()
    }
}

