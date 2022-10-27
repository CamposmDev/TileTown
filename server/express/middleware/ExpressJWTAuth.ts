import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

/** The JWT secret key */
export const JWT_SECRET: string = "SECRET" || process.env.JWT_SECRET;

/**
 * The auth system from CSE-316 (more or less)
 * @author Peter Walsh
 */
export default class ExpressJWTAuth {
    public async verifyJWT(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let token: string | null | undefined = req.cookies.token;
            if (token === null || token === undefined) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            let verified = jwt.verify(token, JWT_SECRET);
            req.userId = typeof verified === "string" ? verified : "";
            next();
        } catch (err) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
    }

    public signJWT<T extends Object | string | Buffer>(data: T) {
        return jwt.sign(data, JWT_SECRET);
    }
}
