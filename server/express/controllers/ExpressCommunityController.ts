import { Request, Response } from 'express';
import { db } from '../../database';

export default class CommunityController {

    public async getCommunityById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Getting a community by id!"});
    } 

    public async createCommunity(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Creating a community!"});
    }

    public async updateCommunityById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Updating a community by id!"});
    }

    public async deleteCommunityById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Deleting a community by id!"});
    }

} 
