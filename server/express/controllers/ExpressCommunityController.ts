import { Request, Response } from 'express';
import { db } from '../../database';
import { Community } from '../../types';

export default class CommunityController {
    /**
     * 
     * @param req an express request object
     * @param res an express response object
     * @returns 
     */

    public async getCommunityById(req: Request, res: Response): Promise<void> {
        /** If there isn't an id in the url params return 400 - Bad Request */
        if (!req || !req.params || !req.params.id) {
            res.status(400).json({message: "Bad Request!"});
            return;
        }
        /** If there isn't a community in the database with the id return 404 - Not Found */
        let id: string = req.params.id;
        let community: Community | null = await db.communities.getCommunityById(id);
        if (community === null) {
            res.status(404).json({message: "Community does not exist"});
            return;
        }

        /** Otherwise return all the data about the community back to the client */
        res.status(200).json({community: community});
        return;
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
