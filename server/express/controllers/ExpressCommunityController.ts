import { Request, Response } from 'express';
import { db } from '../../database';
import { Community } from '@types';

export default class CommunityController {

    public async getCommunities(req: Request, res: Response): Promise<Response> {
        if (!req) {
            return res.status(400).json({ message: "Bad Request!"});
        }
        if (!req.query) {
            return res.status(400).json({ message: "Missing query options" });
        }

        let name = req.query.name ? req.query.name.toString() : "";
        let sort = req.query.sort ? req.query.sort.toString() : "none";
        let communities = await db.communities.getCommunities(name, sort);
        if (communities.length === 0) {
            return res.status(404).json({ message: `No communities found with name "${name}"`});
        }

        return res.status(200).json({message: "Got communities!", communities: communities});
    }

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

        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({ message: `User ${req.userId} not found`});
        }

        let existingCommunity = await db.communities.getCommunityByName(req.body.community.name);
        if (existingCommunity !== null) {
            return res.status(400).json({ message: `Community with name "${req.body.community.name}" already exists` });
        }
        let community = await db.communities.createCommunity({ owner: req.userId, ...req.body.community });
        if (community === null) {
            return res.status(500).json({ message: "Server Error. Failed to create community" });
        }

        user.joinedCommunities.push(community.id);
        community.members.push(user.id);

        let updatedUser = await db.users.updateUser(user.id, {joinedCommunities: user.joinedCommunities});
        if (updatedUser === null) {
            return res.status(500).json({ message: "Error updating users joined communities"});
        }
        let updatedCommunity = await db.communities.updateCommunity(community.id, {members: community.members});
        if (updatedCommunity === null) {
            return res.status(500).json({ message: "Error updating communities members"});
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

        // Get the owner of the community
        let user = await db.users.getUserById(deletedCommunity.owner)
        if (user === null) {
            return res.status(500).json({message: "Server Error. Failed to get owner of deleted community"})
        }
        let idx = user.joinedCommunities.indexOf(deletedCommunity.id)
        if (idx !== -1) {
            user.joinedCommunities.splice(idx, 1)
            let updatedUser = await db.users.updateUser(user.id, {joinedCommunities: user.joinedCommunities})
            if (updatedUser === null) {
                return res.status(500).json({message: `Error updating owner ${user.id} in deleted community`})
            }
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
                return res.status(500).json({message: `Error updating user ${user.id} in deleted community`});
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

    public async getCommunityNameById(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.params) {
            return res.status(400).json({ message: "Bad Request" })
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing community id"});
        }

        let community = await db.communities.getCommunityById(req.params.id)
        if (!community) return res.status(400).json({ message: `Community with id ${req.params.id} not found` })
        return res.status(200).json({ message: 'Found community', name: community.name })
    }

    public async kickMember(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.params) {
            return res.status(400).json({ message: "Bad Request" })
        }
        if (!req.params.commId) {
            return res.status(400).json({ message: "Missing community id"});
        }
        if (!req.params.userId) {
            return res.status(400).json({ message: "Missing user id to kick"});
        }
        if (!req.userId) {
            return res.status(400).json({ message: "Missing user id"});
        }

        /** Get the user we want to kick out of the community */
        let user = await db.users.getUserById(req.params.userId);
        if (user === null) {
            return res.status(404).json({message: `User with id ${req.params.userId} not found`});
        }
        let community = await db.communities.getCommunityById(req.params.commId);
        if (community === null) {
            return res.status(404).json({message: `Community with id ${req.params.commId} not found`});
        }
        if (community.owner !== req.userId) {
            return res.status(400).json({message: `User ${req.userId} is not the owner of community ${community.id}`})
        }

        let userIndex = community.members.indexOf(user.id);
        let commIndex = user.joinedCommunities.indexOf(community.id);
        if (userIndex !== -1) {
            community.members.splice(userIndex, 1);
        }
        if (commIndex !== -1) {
            user.joinedCommunities.splice(commIndex, 1);
        }

        let updatedUser = await db.users.updateUser(user.id, {joinedCommunities: user.joinedCommunities});
        if (updatedUser === null) {
            return res.status(500).json({message: `Error leaving community ${community.id} to user ${user.id}`});
        }
        let updatedCommunity = await db.communities.updateCommunity(community.id, {members: community.members});
        if (updatedCommunity === null) {
            return res.status(500).json({message: `Error kicking user ${user.id} to community ${community.id}`})
        }

        return res.status(200).json({ message: "User is kicked out of the community!", user: updatedUser, community: updatedCommunity});
    }
    public async banMember(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.params) {
            return res.status(400).json({ message: "Bad Request" })
        }
        if (!req.params.commId) {
            return res.status(400).json({ message: "Missing community id"});
        }
        if (!req.params.userId) {
            return res.status(400).json({ message: "Missing user id to ban"});
        }
        if (!req.userId) {
            return res.status(400).json({ message: "Missing user id"});
        }

        /** Get the user we want to ban of the community */
        let user = await db.users.getUserById(req.params.userId);
        if (user === null) {
            return res.status(404).json({message: `User with id ${req.params.userId} not found`});
        }
        let community = await db.communities.getCommunityById(req.params.commId);
        if (community === null) {
            return res.status(404).json({message: `Community with id ${req.params.commId} not found`});
        }
        if (community.owner !== req.userId) {
            return res.status(400).json({message: `User ${req.userId} is not the owner of community ${community.id}`})
        }

        let userIndex = community.members.indexOf(user.id);
        let commIndex = user.joinedCommunities.indexOf(community.id);
        if (userIndex !== -1) {
            community.members.splice(userIndex, 1);
            community.banned.push(user.id)
        }
        if (commIndex !== -1) {
            user.joinedCommunities.splice(commIndex, 1);
        }

        let updatedUser = await db.users.updateUser(user.id, {joinedCommunities: user.joinedCommunities});
        if (updatedUser === null) {
            return res.status(500).json({message: `Error leaving community ${community.id} to user ${user.id}`});
        }
        let updatedCommunity = await db.communities.updateCommunity(community.id, {members: community.members, banned: community.banned});
        if (updatedCommunity === null) {
            return res.status(500).json({message: `Error baning user ${user.id} to community ${community.id}`})
        }

        return res.status(200).json({ message: "User is banned from the community!", user: updatedUser, community: updatedCommunity});
    }

    public async getPopularTop10(req: Request, res: Response): Promise<Response> {
        if (!req || !res) {
            return res.status(400).json({ message: "Bad Request" })
        }
        let comms = await db.communities.getPopularTop10()
        return res.status(200).json({communities: comms})
    }
}