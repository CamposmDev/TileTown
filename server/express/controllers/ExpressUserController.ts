import { Request, Response } from 'express';

import { User } from '../../types';
import { db } from '../../database';

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

        console.log(req.body.firstName);

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

        res.status(200).json({user: user});
        return;
    }

    public async loginUser(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Logging in a user!"});
    }

    public async logoutUser(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Logging out a user!"});
    }

    public async updateUserById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Updating a user!"});
    }

    public async verifyUser(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Verifying a user!"});
    }

    public async deleteUserById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Deleting a user!"})
    }

}