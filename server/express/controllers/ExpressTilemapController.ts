import { Request, Response } from "express";
import { db } from "../../database";
import { SortBy, Tilemap } from "@types";
import { is } from "typescript-is";

export default class TilemapController {

    public async getTilemapById(req: Request, res: Response): Promise<Response> {
        //check to see if a request body was sent
        if (!req || !req.params) {
            return res.status(400).json({ errorMessage: "Improperly formatted request"});
        }
        //check to see if a tilemap id was provided and if it was formatted as a string
        if (!req.params.id) {
            return res.status(400).json({ errorMessage: "No tilemap id provided"});
        }

        let tilemap = await db.tilemaps.getTilemapById(req.params.id);

        // check for error messages
        if (tilemap === null) {
            return res.status(404).json({message: "Tilemap with id doesn't exist"});
        }

        return res.status(200).json({ message: "Getting tilemap!", tilemap: tilemap });
    }

    public async getTilemapPartials(
        req: Request,
        res: Response
    ): Promise<Response> {
        //check to see if a request body was sent
        if (!req.body) {
            return res.status(400).json({
                errorMessage: "Improperly formatted request",
            });
        }

        const userId: string = req.userId;

        //check to see if a user id was provided and if it was formatted as a string
        if (!userId || !is<string>(userId)) {
            return res.status(400).json({
                errorMessage: "No userId provided",
            });
        }

        const search: string = req.body.search;

        //check to see if body has a search string and if it was formatted as a string
        if (!search || !is<string>(search)) {
            return res.status(400).json({
                errorMessage: "No search string provided",
            });
        }

        const sortBy: SortBy = req.body.sortBy;

        //check to see if body has a sort by string and if it was formatted as a SortBy
        // if (!sortBy || !is<SortBy>(SortBy)) {
        //     return res.status(400).json({
        //         errorMessage: "No sortBy string provided",
        //     });
        // }

        const response: Partial<Tilemap>[] | string =
            await db.tilemaps.getTilemapPartials(userId, search, sortBy);

        //check for error messages
        if (is<string>(response)) {
            return res.status(400).json({
                errorMessage: response,
            });
        }

        //make sure response is at in the format of a tilemap partial
        if (!response || !is<[Partial<Tilemap>]>(response)) {
            return res.status(400).json({
                errorMessage: "unable to get tilemap partials",
            });
        }

        return res
            .status(200)
            .json({ message: "Returning Tilemap Partials!", response: response });
    }

    public async createTilemap(req: Request, res: Response): Promise<Response> {
        //check to see if a request body was sent
        if (!req || !req.body) {
            return res.status(400).json({
                errorMessage: "Improperly formatted request",
            });
        }
        //check to see if a user id was provided and if it was formatted as a string
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // check to see if a tilemap partial was provided and if it was formatted properly
        if (!req.body.tilemap) {
            return res.status(400).json({ message: "No tilemap data provided" });
        }



        if (!req.body.tilemap.name) {
            return res.status(400).json({message: "All new tilemaps must have a unique 'name' field"});
        }

        // Check if the user exists in the database - if not return error
        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({message: "User not found"});
        }

        // Check a tilemap in the DBMS doesn't have the name of this tilemap - if so return error
        let existingTilemap = await db.tilemaps.getTilemapByName(req.body.tilemap.name);
        if (existingTilemap !== null) {
            return res.status(400).json({message: `Tilemap with name '${req.body.tilemap.name}' already exists`});
        }

        // Try to create the new tilemap in the DBMS
        let tilemap = await db.tilemaps.createTilemap({owner: user.id, ...req.body.tilemap});
        if (tilemap === null) {
            return res.status(500).json({message: "Error creating a tilemap"});
        }

        // Add the tilemaps id to the users tilemaps
        user.tilemaps.push(tilemap.id);

        // Update the user
        let updatedUser = await db.users.updateUser(req.userId, {tilemaps: user.tilemaps});
        if (updatedUser === null) {
            return res.status(500).json({messsage: "Error adding tilemap to users tilemaps"});
        }

        return res.status(201).json({ message: "Creating tilemap!", tilemap: tilemap });
    }
    public async deleteTilemapById(req: Request, res: Response): Promise<Response> {
        //check to see if a request body was sent
        if (!req || !res || !req.params) {
            return res.status(400).json({message: "Improperly formatted request"});
        }
        // If the user id isn't attached - error 401
        if (!req.userId) {
            return res.status(401).json({message: "Unauthorized"});
        }
        // If the tilemap id isn't attached - also error
        if (!req.params.id) {
            return res.status(400).json({message: "No tilemap id provided"});
        }

        // Check if the tilemap exists - if not error not found
        let tilemap = await db.tilemaps.getTilemapById(req.params.id);
        if (tilemap === null) {
            return res.status(404).json({message: "Tilemap not found"});
        }

        // Delete the tilemap - if something goes wrong - error
        let deletedTilemap = await db.tilemaps.deleteTilemapById(req.params.id);
        if (deletedTilemap === null) {
            return res.status(500).json({message: "Server Error. Something went wrong while deleting a tilemap"});
        }

        // Return the tilemap that was deleted
        return res.status(200).json({ message: "Deleting tilemap!", tilemap: deletedTilemap});
    }
    public async updateTilemapById(req: Request, res: Response): Promise<Response> {
        //check to see if a request body was sent
        if (!req || !res || !req.body || !req.params) {
            return res.status(400).json({message: "Improperly formatted request"});
        }
        //check to see if a user id was provided and if it was formatted as a string
        if (!req.userId) {
            return res.status(401).json({message: "Unauthorized"});
        }
        // Check the id of the tilemap was provided
        if (!req.params.id) {
            return res.status(400).json({message: "No tilemap id provided"});
        }
        // Check the body of the tilemap was provided
        if (!req.body.tilemap) {
            return res.status(400).json({message: "Missing tilemap data in body"});
        }

        // Convert the tilemap attribute to valid JSON
        try {
            req.body.tilemap = JSON.parse(req.body.tilemap);
        } catch {
            return res.status(400).json({ messagee: "Tilemap field is not valid JSON" });
        }

        // Verify the user exists in the database
        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({message: "User not found"});
        }
        // Verify the tilemap exists in the database
        let tilemap = await db.tilemaps.getTilemapById(req.params.id);
        if (tilemap === null) {
            return res.status(404).json({message: "Tilemap not found"});
        }

        // If collaborators are specificed - verify they all exist in the database
        if (tilemap.collaborators) {
            for (let colab of tilemap.collaborators) {
                let user = await db.users.getUserById(colab);
                if (user === null) {
                    return res.status(404).json({message: "One of the collaborators does not exist"});
                }
            }
        }

        // If tilemaps are specificed - verify they all exist in the database
        if (tilemap.tilesets) {
            for (let tileset of tilemap.tilesets) {
                let user = await db.tilesets.getTilesetById(tileset);
                if (user === null) {
                    return res.status(404).json({message: "One of the tilesets does not exist"});
                }
            }
        }

        // Try updating the tilemap
        let updatedTilemap = await db.tilemaps.updateTilemapById(req.params.id, {...tilemap, lastSaveDate: new Date(Date.now())});
        if (updatedTilemap === null) {
            return res.status(500).json({message: "Server Error. Failed to update tilemap."});
        }

        return res.status(200).json({ message: "Updating a tilemap!", tilemap: tilemap});
    }

    public async publishTilemap(req: Request, res: Response): Promise<Response> {
        // Check for bad request and missing parameters 
        if (!req || !res || !req.params || !req.body) {
            return res.status(400).json({ message: "Bad Request" });
        }
        if (!req.userId) {
            return res.status(400).json({ message: "Missing user id" });
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing tileset id" });
        }
        if (!req.body.social) {
            return res.status(400).json({ message: "Missing social in body" });
        }

        // Check tilemap exists
        let tilemap = await db.tilemaps.getTilemapById(req.params.id);
        if (tilemap === null) {
            return res.status(404).json({ message: `Tilemap with id ${req.params.id} not found` });
        }

        // Check the user/owner exists
        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(400).json({ message: `User does not exist`});
        }

        // Check if user owns the tilemap
        if (tilemap.owner !== user.id) {
            return res.status(400).json({ message: `User does not own this tilemap` });
        }

        // Check if tilemap has already been published 
        if (tilemap.isPublished) {
            return res.status(400).json({ message: `Tilemap with id ${tilemap.id} has already been published!` });
        }

        // Check if social data already exists for this tilemap
        let existingSocial = await db.tilemapSocials.getTilemapSocialByTilemapId(tilemap.id);
        if (existingSocial !== null) {
            return res.status(400).json({ message: `Tilemap with id ${tilemap.id} has already been published!` });
        }

        // Create the social data
        let social = await db.tilemapSocials.createTilemapSocial(tilemap.id, {...req.body.social, name: tilemap.name, owner: user.id, ownerName: user.username});
        if (social === null) {
            return res.status(500).json({ message: `Server Error. Error publishing tilemap with id ${tilemap.id}` });
        }

        // Update the actual tilemap
        let updatedTilemap = await db.tilemaps.updateTilemapById(req.params.id, {isPublished: true});
        if (updatedTilemap === null) {
            return res.status(500).json({ message: `Server Error. Error while trying to update tilemap`});
        }

        return res.status(200).json({ message: "Tilemap published!", social: social });

    }

    public async favoriteTilemapById(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.params) {
            return res.status(400).json({ message: "Bad Request" });
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing tilemap id" });
        }
        if (!req.userId) {
            return res.status(400).json({ message: "Missing user id"});
        }

        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({ message: `User ${req.userId} not found`});
        }
        let social = await db.tilemapSocials.getTilemapSocialById(req.params.id);
        if (social === null) {
            return res.status(404).json({ message: `Tilemap ${req.params.id} not found`});
        }

        let tilemapIndex = user.favoriteTileMaps.indexOf(social.id);
        if (tilemapIndex > -1) {
            return res.status(400).json({ message: `User ${user.id} has already favorited tilemap ${social.id}`});
        }

        user.favoriteTileMaps.push(social.id);

        let updatedUser = await db.users.updateUser(user.id, {favoriteTileMaps: user.favoriteTileMaps});
        if (updatedUser === null) {
            return res.status(500).json({ message: "Failed to add tilemap to users favorited tilemaps"});
        }

        return res.status(200).json({ message: "Favorited a tilemap!", user: updatedUser });
    }
    public async unfavoriteTilemapById(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.params) {
            return res.status(400).json({ message: "Bad Request" });
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing tilemap id" });
        }
        if (!req.userId) {
            return res.status(400).json({ message: "Missing user id"});
        }

        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({ message: `User ${req.userId} not found`});
        }
        let social = await db.tilemapSocials.getTilemapSocialById(req.params.id);
        if (social === null) {
            return res.status(404).json({ message: `Tilemap ${req.params.id} not found`});
        }

        let tilemapIndex = user.favoriteTileMaps.indexOf(social.id);
        if (tilemapIndex === -1) {
            return res.status(400).json({ message: `User ${user.id} has already unfavorited tilemap ${social.id}`});
        }

        user.favoriteTileMaps.splice(tilemapIndex, 1);

        let updatedUser = await db.users.updateUser(user.id, {favoriteTileMaps: user.favoriteTileMaps});
        if (updatedUser === null) {
            return res.status(500).json({ message: "Failed to remove tilemap from user's favorited tilemaps"});
        }
        return res.status(200).json({ message: "Unfavorited a tilemap!", user: updatedUser });
    }

    public async getTilemapSocialById(req: Request, res: Response): Promise<Response> {
        // Check for bad request
        if (!req || !res || !req.params) {
            return res.status(400).json({message: "Bad Request"});
        }
        if (!req.params.id) {
            return res.status(400).json({message: "Missing tilemap social id"});
        }

        let social = await db.tilemapSocials.getTilemapSocialById(req.params.id);
        if (social === null) { 
            return res.status(404).json({message: `Tilemap socials for tilemap social with id ${req.params.id} not found`}); 
        }

        return res.status(200).json({messsage: "Got social data for a tilemap!", social: social});
    }
    public async likeTilemapSocialById(req: Request, res: Response): Promise<Response> {
        // Check bad request
        if (!req || !res || !req.params) {
            return res.status(400).json({message: "Bad Request"});
        }
        // Check we got the users id
        if (!req.userId) {
            return res.status(401).json({message: "Unauthorized"});
        }
        // Check we got the tilemap id
        if (!req.params.id) {
            return res.status(400).json({message: "No tilemap provided"});
        }

        // Check the user exists
        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({message: "User not found"});
        }
        // Check the social data exists
        let social = await db.tilemapSocials.getTilemapSocialById(req.params.id);
        if (social === null) {
            return res.status(404).json({message: "Tilemap not found"});
        }

        // Update the likes and dislikes
        let likeIndex = social.likes.indexOf(user.id);
        let dislikeIndex = social.dislikes.indexOf(user.id);
        if (likeIndex === -1) {
            social.likes.push(user.id);
            if (dislikeIndex > -1) {
                social.dislikes.splice(dislikeIndex, 1);
            }
        }

        // Update the social statistics
        let updatedSocial = await db.tilemapSocials.updateTilemapSocial(social.id, {
            likes: social.likes,
            dislikes: social.dislikes
        });
        if (updatedSocial === null) {
            return res.status(500).json({message: "Server Error. Error while updating tilemap social data"});
        }

        // Return the updated tilemap social date
        return res.status(200).json({ message: "Liking a tilemap", social: social});
    }
    public async dislikeTilemapById(req: Request, res: Response): Promise<Response> {
        // Check for bad request and missing parameters
        if (!req || !res || !req.params) {
            return res.status(400).json({message: `Bad request`});
        }
        if (!req.userId) {
            return res.status(400).json({message: `Missing user id`});
        }
        if (!req.params.id) {
            return res.status(400).json({messagee: `Missing tileset id from params`});
        }

        // Check user exists
        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({message: `User with id ${req.userId} not found`});
        }

        // Check social data exists
        let social = await db.tilemapSocials.getTilemapSocialById(req.params.id);
        if (social === null) {
            return res.status(404).json({message: `Tileset social data with id ${req.params.id} not found`});
        }

        // Dislike the tilemap - unlike the tileset if need be
        let likeIndex = social.likes.indexOf(user.id);
        let dislikeIndex = social.dislikes.indexOf(user.id);

        // Dislike the tilemap
        if (dislikeIndex === -1) {
            social.dislikes.push(user.id);
            // Unlike the tilemap
            if (likeIndex > -1) {
                social.likes.splice(likeIndex, 1);
            }
        }  

        // Update the social statistics
        let updatedSocial = await db.tilemapSocials.updateTilemapSocial(req.params.id, {
            likes: social.likes, 
            dislikes: social.dislikes
        });
        if (updatedSocial === null) {
            return res.status(500).json({message: `Server Error. Error updating tileset social data with id ${req.params.id}`});
        }

        // Return updated social statistics
        return res.status(200).json({message: "Tileset disliked!", social: updatedSocial});
    }
    public async commentTilemapById(req: Request, res: Response): Promise<Response> {
        // Check for bad request and missing parameters
        if (!req || !res || !req.body || !req.params) {
            return res.status(400).json({message: "Bad Request"});
        }
        if (!req.userId) {
            return res.status(400).json({message: "Missing user id"});
        }
        if (!req.params.id) {
            return res.status(400).json({message: "Missing tilemap id"});
        }
        if (!req.body.comment) {
            return res.status(400).json({message: "Missing comment from body"})
        }
        if (!req.body.comment.body) {
            return res.status(400).json({message: "Missing text body from comment"});
        }

        // Check the user exists
        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({message: `User with id ${req.userId} not found`})
        }
        // Check the social data exists 
        let social = await db.tilemapSocials.getTilemapSocialById(req.params.id);
        if (social === null) {
            return res.status(404).json({message: `Tileset social data with id ${req.params.id} not found`});
        }

        // Create the comment
        let comment = await db.comments.createComment(user.id, user.username, social.id, req.body.comment.body);
        if (comment === null) {
            return res.status(500).json({message: "Server Error"});
        }

        // Add the comment to the tilesets social data
        social.comments.push(comment.id);

        // Update the tilesets social data
        let updatedSocial = await db.tilemapSocials.updateTilemapSocial(req.params.id, social)
        if (updatedSocial === null) {
            return res.status(500).json({message: "Server Error. Error updating tileset social data"});
        }

        // Return the successfully created comment
        return res.status(201).json({message: "Comment created!", tilemapSocial: updatedSocial});
    }
    public async viewTilemapById(req: Request, res: Response): Promise<Response> {
        // Check for bad request and missing parameters
        if (!req || !res || !req.params) {
            return res.status(400).json({ message: "Bad Request"});
        }
        if (!req.params.id) {
            return res.status(400).json({message: "Missing tileset social id"});
        }

        // Check social data exists 
        let social = await db.tilemapSocials.getTilemapSocialById(req.params.id);
        if (social === null) { 
            return res.status(404).json({message: `Tileset with id ${req.params.id} not found`});
        }

        // Increment the views
        social.views += 1;

        // Update the social data
        let updatedSocial = await db.tilemapSocials.updateTilemapSocial(social.id, social);
        if (updatedSocial === null) {
            return res.status(500).json({message: `Server Error. Error updating server with id ${req.params.id}`});
        }

        // Return the updated social data
        return res.status(200).json({message: "Tileset social updated!", social: updatedSocial});
    }
}
