import {NextFunction, Request, Response} from "express"

export default (permissions: string[]) => (req: Request,res: Response, next: NextFunction) => {
    const user = req.user as any
    if(!permissions.includes(user.role)){
        return next(new Error('Forbidden').message)
    }
    console.log(req.user)
    return next()
}