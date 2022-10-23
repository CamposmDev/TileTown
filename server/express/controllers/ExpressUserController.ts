import { Request, Response } from 'express';
import { log } from 'npmlog';

import { User } from '../../types';
import { db } from '../../database';
import { Auth } from '../middleware';

export default class UserController {

    /**
     * 
     * @param req an express request object
     * @param res an express response object
     * @returns 
     */
    public async getUserById(req: Request, res: Response): Promise<void> {

        /** If there isn't an id in the url params return 400 - Bad Request */
        if (!req || !req.params || !req.params.id) {
            res.status(400).json({message: "Bad request"}); 
            return;
        }

        /** If there isn't a user in the database with the id return 404 - Not Found */
        let id: string = req.params.id;
        let user: User | null = await db.users.getUserById(id);
        if (user === null) {
            res.status(404).json({message: "User does not exist"});
            return;
        }

        /** Otherwise return all the data about the user back to the client */
        res.status(200).json({user: user});
        return;
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        if (!req || !req.body) {
            res.status(400).json({message: "Bad Request"});
            return;
        }

        let user: User | null = await db.users.createUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });

        if (user === null) {
            res.status(400).json({message: "Bad Request"});
            return;
        }

        res.status(201).json({user: user});
        return;
    }

    public async loginUser(req: Request, res: Response): Promise<void> {
        if (!req || !req.body || !req.body.email || !req.body.password) {
            res.status(400).json({message: "Bad request!"});
            return;
        }

        let user: User | null;
        user = await db.users.loginUser(req.body.email, req.body.password);
        if (user === null || user === undefined) {
            res.status(400).json({message: "Invalid username or password!"});
            return;
        }

        // Give the user a signed token 
        let token: string = Auth.signJWT<string>(user.id);

        res.status(200).
            cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 900000)}).
            json({message: "User successfully logged in!", user: user});
        return;
    }

    public async logoutUser(req: Request, res: Response): Promise<void> {
        res.status(200).clearCookie("token").json({message: "User successfully logged out!"});
    }

    /**
     * Updates a TileTown user by id.
     * @param req 
     * @param res 
     * @returns 
     */
    public async updateUserById(req: Request, res: Response): Promise<void> {
        // If any data is missing - Bad request
        if (!req || !req.body || !req.body.user || !req.params || !req.params.id) {
            res.status(400).json({message: "Bad Request"});
            return;
        }

        let user: User | null;

        // The user exists
        user = await db.users.getUserById(req.params.id);
        if (user === null) {
            res.status(404).json({message: "Not found"});
            return;
        }

        // Users id if the the user exists
        let id: string = req.params.id;

        // Update the users email
        let email: string | null | undefined = req.body.user.email;
        if (email !== undefined && email !== null) {
            email = await db.users.updateEmail(id, email);
            if (email === null) {
                res.status(500).json({message: "Bad Request"}); 
                return;
            }
            user.email = email;
        }

        // Update the users username
        let username: string | null | undefined = req.body.user.username;
        if (username !== undefined && username !== null) {
            username = await db.users.updateUsername(id, username);
            if (username === null) {
                res.status(500).json({message: "Server Error"}); 
                return;
            }
            user.username = username;
        }

        // Update the users password
        let oldpass: string | null | undefined = req.body.user.oldPassword;
        let newpass: string | null | undefined = req.body.user.newPassword;
        if (oldpass !== undefined && oldpass !== null && newpass !== undefined && newpass !== null) {
            newpass = await db.users.updatePassword(id, oldpass, newpass);
            if (newpass === null || newpass == undefined) { 
                res.status(500).json({message: "Server Error"});
                return;
            }
            user.password = newpass;
        }

        // Return the updated user
        res.status(200).json({user: user});
        return;
    }

    public async updateUserPassword(req: Request, res: Response): Promise<void> {
        if (!req || !req.body || !req.body.oldPassword || !req.body.newPassword) {
            res.status(400).json({message: "Bad Request"});
            return;
        }
        
    }

    public async verifyUser(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Verifying a user!"});
    }

    public async deleteUserById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Deleting a user!"})
    }

}