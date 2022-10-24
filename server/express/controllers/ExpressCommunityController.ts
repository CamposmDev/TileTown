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
            res.status(400).json({message: "Bad Request!"})
            return
        }
        /** If there isn't a community in the database with the id return 404 - Not Found */
        let id: string = req.params.id
        let community: Community | null = await db.communities.getCommunityById(id)
        if (community === null) {
            res.status(404).json({message: "Community does not exist"})
            return
        }

        /** Otherwise return all the data about the community back to the client */
        res.status(200).json({community: community})
        return
    }

    public async createCommunity(req: Request, res: Response): Promise<void> {
        if (!req || !req.body) {
            res.status(400).json({message: "Bad Request"})
            return
        }
        console.log(req.body)
        let community: Community | null = await db.communities.createCommunity({
            owner: req.body.owner,
            name: req.body.name,
            description: req.body.description,
            visibility: req.body.visibility
        });

        if (community === null) {
            res.status(400).json({message: "Failed to create community"})
            return
        }
        res.status(201).json({community: community})
        return
    }

    public async updateCommunityById(req: Request, res: Response): Promise<void> {
        // If any data is missing - Bad request
        if (!req || !req.body || !req.params || !req.params.id) {
            res.status(400).json({message: "Bad Request"})
            return
        }
        // Update the community 
        let id = req.params.id
        let payload: Partial<Community> = {
            owner: req.body.owner,
            name: req.body.name,
            description: req.body.description,
            visibility: req.body.visibility
        }

        console.log(id)
        console.log(payload)
  
        let community = await db.communities.updateCommunity(id, payload)
        if (community === null) {
            res.status(400).json({message: "Failed to update community"});
            return;
        }
        
        res.status(200).json({community: community});
      }

    public async deleteCommunityById(req: Request, res: Response): Promise<void> {
        // If any data is missing - Bad request
        if (!req || !req.params || !req.params.id || !req.body) {
            res.status(400).json({message: "Bad Request"})
            return
        }    
        const communityId: string = req.params.id
        
        let isDeleted: boolean = await db.communities.deleteCommunity(communityId) 
        if (isDeleted) {
            res.status(200).json({message: 'Deleted community id' + communityId})
            return
        }
        res.status(404).json({message: 'Community does not exist'})
    }


}