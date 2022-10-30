import { Request, Response } from 'express';
import { db } from '../../database';
import { Community } from '../../types';

export default class CommunityController {


    public async getCommunityById(req: Request, res: Response): Promise<Response> {
        /** If there isn't an id in the url params return 400 - Bad Request */
        if (!req || !res || !req.params) {
            return res.status(400).json({ message: "Bad Request!" })
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing community id" });
        }

        let community: Community | null = await db.communities.getCommunityById(req.params.id)
        if (community === null) {
            return res.status(404).json({ message: `Community with id ${req.params.id} does not exist` });
        }

        /** Otherwise return all the data about the community back to the client */
        return res.status(200).json({ message: "Got a community!", community: community });
    }
    public async createCommunity(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.body) {
            return res.status(400).json({ message: "Bad Request" })
        }
        if (!req.userId) {
            return res.status(400).json({ messagee: "Missing owner id" });
        }
        if (!req.body.community) {
            return res.status(400).json({ message: "Missing community data" });
        }
        if (!req.body.community.name) {
            return res.status(400).json({ message: "Missing community name" });
        }

        let existingCommunity = await db.communities.getCommunityByName(req.body.community.name);
        if (existingCommunity !== null) {
            return res.status(400).json({ message: `Community with name "${req.body.community.name}" already exists` });
        }
        let community = await db.communities.createCommunity({ owner: req.userId, ...req.body.community });
        if (community === null) {
            return res.status(500).json({ message: "Server Error. Failed to create community" });
        }

        return res.status(201).json({ message: "Community created!", community: community })
    }
    public async updateCommunityById(req: Request, res: Response): Promise<Response> {
        // Check for bad request and missing data
        if (!req || !req.body || !req.params) {
            return res.status(400).json({ message: "Bad Request" })
        }
        if (!req.params.id) {
            return res.send(400).json({ message: "Missing community id"});
        }
        if (!req.body.community) {
            return res.send(400).json({message: "Missing community in body"});
        }
        if (!req.userId) {
            return res.send(400).json({message: "Missing user id"});
        }

        // Check community exists
        let community = await db.communities.getCommunityById(req.params.id);
        if (community === null) {
            return res.status(404).json({message: `Community with id ${req.params.id} not found`});
        }
        // Check the user is the community owner
        if (community.owner !== req.userId) {
            return res.status(400).json({message: "Only the community owner can update the community"});
        }

        // Update the community
        let updatedCommunity = await db.communities.updateCommunity(req.params.id, req.body.community);
        if (updatedCommunity === null) {
            return res.status(400).json({ message: "Failed to update community" });
        }

        // Return the updated community
        return res.status(200).json({ message: "Community Updated", community: updatedCommunity });
    }
    public async deleteCommunityById(req: Request, res: Response): Promise<Response> {
        // Check for missing data and bad requests
        if (!req || !res || !req.params) {
            return res.status(400).json({ message: "Bad Request" });
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing community id"});
        }

        // Check community exists
        let community = await db.communities.getCommunityById(req.params.id);
        if (community === null) {
            return res.status(404).json({ message: `Community with id ${req.params.id} does not exist`});
        }
        // Delete the community
        let deletedCommunity = await db.communities.deleteCommunityById(req.params.id);
        if (deletedCommunity === null) {
            return res.status(500).json({message: `Server Error. Failed to delete community with id ${req.params.id}`})
        }

        // Get all the users in the community
        let users = await db.users.getUsersById(deletedCommunity.members);
        if (users === null) {
            return res.status(500).json({message: `Server Error. Failed to delete commuity`})
        }

        // Remove all users from their joined communities - this could be a bit slow...
        for (let user of users) {
            let idx = user.joinedCommunities.indexOf(deletedCommunity.id);
            if (idx === -1) continue;
            
            user.joinedCommunities.splice(idx, 1);
            let updatedUser = await db.users.updateUser(user.id, {joinedCommunities: user.joinedCommunities});

            if (updatedUser === null) {
                return res.status(500).json({message: `Error updating user ${user.id} in delete community`});
            }
        }

        // Return the deleted community
        return res.status(200).json({ message: 'Community Deleted!', communnity: deletedCommunity });
    }


    public async joinCommunityById(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.params) {
            return res.status(400).json({ message: "Bad Request" })
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing community id"});
        }
        if (!req.userId) {
            return res.status(400).json({ message: "Missing user id"});
        }

        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({message: `User with id ${req.userId} not found`});
        }
        let community = await db.communities.getCommunityById(req.params.id);
        if (community === null) {
            return res.status(404).json({message: `Community with id ${req.params.id} not found`});
        }

        if (community.members.indexOf(user.id) > -1 || user.joinedCommunities.indexOf(community.id) > -1) {
            return res.status(400).json({message: `User ${user.id} already joined community ${community.id}`});
        }
        user.joinedCommunities.push(community.id);
        community.members.push(user.id);

        let updatedUser = await db.users.updateUser(req.userId, {joinedCommunities: user.joinedCommunities});
        if (updatedUser === null) {
            return res.status(500);
        }
        let updatedCommunity = await db.communities.updateCommunity(req.params.id, {members: community.members});
        if (updatedCommunity === null) {
            return res.status(500);
        }

        return res.status(200).json({ message: "User joined community!", user: updatedUser, community: updatedCommunity});
    }
    public async leaveCommunityById(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.params) {
            return res.status(400).json({ message: "Bad Request" })
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing community id"});
        }
        if (!req.userId) {
            return res.status(400).json({ message: "Missing user id"});
        }

        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({message: `User with id ${req.userId} not found`});
        }
        let community = await db.communities.getCommunityById(req.params.id);
        if (community === null) {
            return res.status(404).json({message: `Community with id ${req.params.id} not found`});
        }

        let userIndex = community.members.indexOf(user.id);
        let commIndex = user.joinedCommunities.indexOf(community.id);
        if (userIndex > -1) {
            community.members.splice(userIndex, 1);
        }
        if (commIndex > -1) {
            user.joinedCommunities.splice(commIndex, 1);
        }

        let updatedUser = await db.users.updateUser(req.userId, {joinedCommunities: user.joinedCommunities});
        if (updatedUser === null) {
            return res.status(500).json({message: `Error adding community ${community.id} to user ${user.id}`});
        }
        let updatedCommunity = await db.communities.updateCommunity(req.params.id, {members: community.members});
        if (updatedCommunity === null) {
            return res.status(500).json({message: `Error adding user ${user.id} to community ${community.id}`})
        }

        return res.status(200).json({ message: "User left the community!", user: updatedUser, community: updatedCommunity});
    }

}