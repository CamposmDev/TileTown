import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default class ExpressJWTAuth {

    protected secret: string;

    constructor() { this.secret = "secret"; }

    public async verifyJWT(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let token = req.cookies.token;
            if (token === null || token === undefined) {
                res.status(401).json({message: "Unauthorized"});
                return;
            }

            const verified = jwt.verify(token, this.secret);
            next();

        } catch (err) {
            res.status(401).json({message: "Unauthorized"});
            return;
        }
    }

    public signJWT<T extends Object | string | Buffer>(data: T) { 
        return jwt.sign(data, this.secret); 
    }

}