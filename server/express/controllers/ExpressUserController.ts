import { Request, Response } from 'express';
import { db } from '../../database';

export default class UserController {

    public async getUserById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Getting user by id!"});
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Creating a new user!"});
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