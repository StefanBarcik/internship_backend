import {Request, Response, NextFunction} from "express";

export default function validateReqParams() {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.params.id) {
            if(Number(req.params.id) < 1) {
                return res.status(400).send("Invalid ID, must be > 0");
            }
            if (isNaN(Number(req.params.id))) {
                return res.status(400).send("ID must be a number");
            }
        }
        return next();
    }
}