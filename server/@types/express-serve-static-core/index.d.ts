/**
 * This is some typescript magic. I am overriding the express Request object type
 * and giving it the "userId" attribute. This lets us use our authentication system
 * to attach the users UserId onto a request.
 * @author Peter Walsh
 */

// @types/express-serve-static-core
declare namespace Express {
    interface Request {
        userId: string
    }
}
