import { Express } from "express-serve-static-core";

/**
 * This is some typescript magic. I am overriding the express Request object type
 * and giving it the "userId" attribute. This lets us use our authentication system
 * to attach the users UserId onto a request.
 * @author Peter Walsh
 */
declare module "express-serve-static-core" {
    interface Request {
        userId: string
    }
}