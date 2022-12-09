import { Request, Response } from "express";
import { is } from "typescript-is";
import { db } from "../../database";
import { Community, Contest, SortBy, Tileset, TilesetSocial } from "@types";

export default class TilesetController {
  public async getTilesetSocialsByName(req: Request, res: Response): Promise<Response> {
    if (!req || !res || !req.params) {
      return res.status(400).json({ message: 'Bad Request' })
    }
    if (!req.params.query) {
      return res.status(400).json({ message: 'Missing query' })
    }
    // if (!req.params.sort) {
    //   return res.status(400).json({ message: 'Missing sort' })
    // }
    // if (!req.params.tags) {
    //   return res.status(400).json({ message: 'Missing tags'})
    // }
    let query = {name: '', sort: '', tags: []}
    try {
      let query = JSON.parse(req.params.query)
    } catch (e) {
      return res.status(400).json({ message: "Invalid query"})
    }
    if (query.name == null) return res.status(400).json({ message: 'Query: Name is null or undefined!'})
    if (!query.sort) return res.status(400).json({ message: 'Query: Sort is missing!'})
    if (!query.tags) return res.status(400).json({ message: 'Query: Tags is missing!'})
    let tilesetSocials: TilesetSocial[] = await db.tilesetSocials.getTilesetSocialsByName(query.name, query.sort, query.tags)
    return res.status(200).json({ message: `Found ${tilesetSocials.length} tileset(s)`, tilesets: tilesetSocials })
  }
  public async getTilesetById(req: Request, res: Response): Promise<Response> {
    // Check to see if a request body was sent
    if (!req || !res || !req.params) {
      return res.status(400).json({ message: "Improperly formatted request" });
    }
    // Check to see if a tileset id was provided and if it was formatted as a string
    if (!req.params.id) {
      return res.status(400).json({ message: "No tilesetId provided" });
    }

    // Check tileset exists - if error 404
    let tileset = await db.tilesets.getTilesetById(req.params.id);
    if (tileset === null) {
      return res.status(404).json({ message: "Tileset with id not found" });
    }

    // Success - 200 - return the tileset
    return res
      .status(200)
      .json({ message: "Getting tileset!", tileset: tileset });
  }
  public async createTileset(req: Request, res: Response): Promise<Response> {
    // Check to see if a request body was sent
    if (!req || !res || !req.body) {
      return res.status(400).json({ message: "Improperly formatted request" });
    }
    // Check to see if a user id was provided and if it was formatted as a string
    if (!req.userId) {
      return res.status(400).json({ message: "No userId Provided" });
    }
    console.log(req.body);
    console.log(req.file);
    // Check to see if a tileset partial was provided and if it was formatted properly
    if (!req.body.tileset) {
      return res.status(400).json({ message: "No tileset data provided" });
    }

    // Convert the tileset attribute to valid JSON
    // try {
    //   req.body.tileset = JSON.parse(req.body.tileset);
    // } catch {
    //   return res
    //     .status(400)
    //     .json({ messagee: "Tileset field is not valid JSON" });
    // }

    // Check if the tileset has a name
    if (!req.body.tileset.name) {
      return res.status(400).json({ message: "Tileset must have a name" });
    }

    // Check if a user exists in the database
    let user = await db.users.getUserById(req.userId);
    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if a tileset exists in the database with the name
    let existingTileset = await db.tilesets.getTilesetByName(
      req.body.tileset.name
    );
    if (existingTileset !== null) {
      return res
        .status(400)
        .json({ message: "Tileset must have a unique name" });
    }

    console.log(`Image url: ${req.file?.filename}`);

    // Create the tileset
    let tileset = await db.tilesets.createTileset(req.userId, {
      ...req.body.tileset,
      image: req.file?.filename,
    });
    if (tileset === null) {
      return res
        .status(500)
        .json({ message: "Server Error. Error while creating tileset." });
    }

    // Update users tilesets
    user.tilesets.push(tileset.id);

    // Update the users tilesets
    let updatedUser = await db.users.updateUser(req.userId, {
      tilesets: user.tilesets,
    });
    if (updatedUser === null) {
      return res
        .status(500)
        .json({ message: "Server Error. Error while updating tilesets" });
    }

    // Success - 201 - return the tileset
    return res
      .status(201)
      .json({ message: "Creating tileset!", tileset: tileset });
  }
  public async deleteTilesetById(
    req: Request,
    res: Response
  ): Promise<Response> {
    // Check to see if a request body was sent
    if (!req || !res || !req.params) {
      return res.status(400).json({ message: "Improperly formatted request" });
    }
    // Check to see if a tileset id was provided and if it was formatted as a string
    if (!req.params.id) {
      return res.status(400).json({ message: "No tileset id provided" });
    }

    let tileset = await db.tilesets.getTilesetById(req.params.id)
    if (tileset === null) {
      return res
        .status(500)
        .json({ message: "Server error. Error deleting tileset" });
    }
    // Check if tileset is published
    if (tileset.isPublished) {
      return res.status(400).json({ message: `Tileset ${tileset.id} cannot be deleted because it is published!`})
    }

    // Delete the tileset from the database
    tileset = await db.tilesets.deleteTilesetById(req.params.id);
    if (tileset === null) {
      return res
        .status(500)
        .json({ message: "Server error. Error deleting tileset" });
    }

    // Delete tileset id from user's tilesets
    let user = await db.users.getUserById(tileset.owner)
    if (user) {
      let i = user.tilesets.indexOf(req.params.id)
      if (i !== -1) {
        user.tilesets.splice(i, 1)
        await db.users.updateUser(user.id, {tilesets: user.tilesets})
      }
    }

    // Success - 200 - return the deleted tileset
    return res
      .status(200)
      .json({ message: "Deleting a tileset!", tileset: tileset });
  }
  public async updateTilesetById(
    req: Request,
    res: Response
  ): Promise<Response> {
    // Check to see if a request body was sent
    if (!req || !res || !req.body || !req.params) {
      return res.status(400).json({ message: "Improperly formatted request" });
    }
    if (!req.params.id) {
      return res.status(400).json({ message: "No tileset id provided" });
    }
    // Check to see if a user id was provided and if it was formatted as a string
    if (!req.userId) {
      return res.status(400).json({ message: "No userId provided" });
    }
    // Check to see if a tileset partial was provided and if it was formatted properly
    if (!req.body.tileset) {
      console.log(req);
      return res.status(400).json({ message: "No tileset data provided" });
    }

    // Convert the tileset attribute to valid JSON
    try {
        req.body.tileset = JSON.parse(req.body.tileset);
    } catch {
        return res
            .status(400)
            .json({ messagee: "Tileset field is not valid JSON" });
    }

    let existingTileset = await db.tilesets.getTilesetById(req.params.id);
    // If tileset doesn't exist - error 404
    if (existingTileset === null) {
      return res
        .status(404)
        .json({ message: `No tileset with id ${req.params.id}` });
    }
    // If tileset has been published - error 400
    if (existingTileset.isPublished) {
      return res.status(400).json({
        message: "This tileset has been published and cannot be updated",
      });
    }

    // Update the tileset - if an error occurs - 500
    let updatedTileset = await db.tilesets.updateTilesetById(
      req.params.id,
      {...req.body.tileset, image: req.file?.filename}
    );
    if (updatedTileset === null) {
      return res
        .status(500)
        .json({ message: "Server Error. Error updating tileset" });
    }
    console.log(req.file?.filename);
    console.log(updatedTileset);
    return res
      .status(200)
      .json({ message: "Updating a tileset!", tileset: updatedTileset });
  }

  public async getPublishedTilesetsByName(req: Request, res: Response): Promise<Response> {
    if (!req || !res || !req.params) {
        return res.status(400).json({ message: 'Bad Request' })
    }

    if (!req.params.query || !req.params.sort) {
      return res.status(400).json({ message: 'Bad Request' })
    }

    let tilesets: Tileset[] = await db.tilesets.getPublishedTilesetsByName(req.params.query, req.params.sort)
    return res.status(200).json({ message: `Found ${tilesets.length} tileset(s)`, tilesets: tilesets })
  }

  public async getTilesetPartials(
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

    const response: [Partial<Tileset>] | string =
      await db.tilesets.getTilesetPartials(userId, search, sortBy);

    //check for error messages
    if (is<string>(response)) {
      return res.status(400).json({
        errorMessage: response,
      });
    }

    //make sure response is at in the format of a tileset partial
    if (!response || !is<[Partial<Tileset>]>(response)) {
      return res.status(400).json({
        errorMessage: "unable to get tileset partials",
      });
    }

    return res
      .status(200)
      .json({ message: "Returning Tileset Partials!", response: response });
  }

  public async getTilesetSocialById(
    req: Request,
    res: Response
  ): Promise<Response> {
    // Check for bad request and missing parameters
    if (!req || !res || !req.params) {
      return res.status(400).json({ message: `Bad Request` });
    }
    if (!req.params.id) {
      return res
        .status(400)
        .json({ messagee: `Missing tileset social data id` });
    }

    // Check social data exists in the database
    let social = await db.tilesetSocials.getTilesetSocialById(req.params.id);
    if (social === null) {
      return res.status(404).json({
        message: `Tileset social data with id ${req.params.id} not found`,
      });
    }

    // Return the social data
    return res
      .status(200)
      .json({ message: "Got tileset social data!", social: social });
  }

  public async getTilesetSocialByTilesetId(req: Request, res: Response): Promise<Response> {
    if (!req || !res || !req.params) {
      return res.status(400).json({ message: 'Bad Request' })
    }
    if (!req.params.id) {
      return res.status(400).json({ message: 'Missing tileset id' })
    }
    let social = await db.tilesetSocials.getTilesetSocialByTilesetId(req.params.id)
    if (social === null) {
      return res.status(404).json({ message: `Tileset social data with tileset id ${req.params.id} not found`});
    }
    return res.status(200).json({ message: 'Got tileset social data!', social: social })
  }

  public async publishTileset(req: Request, res: Response): Promise<Response> {
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
    if (!req.body) {
      return res.status(400).json({ message: "Missing body" });
    }


    try {
        req.body.description = JSON.parse(req.body.description);
        req.body.permissions = JSON.parse(req.body.permissions);
        req.body.tags = JSON.parse(req.body.tags);
    } catch (e) {
        return res.status(500).json({ message: "Error parsing JSON..."});
    }

    // Check tileset exists
    let tileset = await db.tilesets.getTilesetById(req.params.id);
    if (tileset === null) {
      return res
        .status(404)
        .json({ message: `Tileset with id ${req.params.id} not found` });
    }

    let updated = await db.tilesets.updateTilesetById(tileset.id, {image: req.file?.filename});
    if (updated === null) {
        return res.status(500).json({ message: "Error updating tileset image"});
    }

    // Check if social data already exists for this tileset
    let existingSocial = await db.tilesetSocials.getTilesetSocialByTilesetId(
      tileset.id
    );
    if (existingSocial !== null) {
      return res.status(400).json({
        message: `Social data already exists for tileset with id ${tileset.id}`,
      });
    }

    let community: Community | null = null
    try {
        req.body.communityName = JSON.parse(req.body.communityName);
    } catch (e) {
        req.body.communityName = null
    }
    if (req.body.communityName) {
      community = await db.communities.getCommunityByName(req.body.communityName);
    }

    let contest: Contest | null = null
    try {
        req.body.contestName = JSON.parse(req.body.contestName);
    } catch (e) {
        req.body.contestName = null;
    }
    if (req.body.contestName) {
      contest = await db.contests.getContestByName(req.body.contestName);
    }

    // Create the social data
    let social = await db.tilesetSocials.createTilesetSocial(
      tileset.id,
      {
        name: tileset.name,
        owner: tileset.owner,
        description: req.body.description,
        community: community?.id,
        contest: contest?.id,
        permissions: req.body.permissions,
        tags: req.body.tags,
        imageURL: updated.image
      }
    );
    if (social === null) {
      return res.status(500).json({
        message: `Server Error. Error creating social data for tileset with id ${tileset.id}`,
      });
    }

    let updatedTileset = await db.tilesets.updateTilesetById(tileset.id, {isPublished: true});
    if (updatedTileset === null) {
        return res.status(500).json({ message: "Error updating tileset"});
    }

    return res.status(200).json({
      message: "Tileset published! Social data created!",
      social: social,
    });
  }
  public async likeTilesetById(req: Request, res: Response): Promise<Response> {
    /** Check for bad requests and missing data */
    if (!req || !res || !req.params) {
      return res.status(400).json({ message: "Bad Request" });
    }
    if (!req.params.id) {
      return res.status(400).json({ message: "Missing tileset id" });
    }
    if (!req.userId) {
      console.log(req.userId);
      return res.status(400).json({ message: "Missing user id" });
    }

    /** Check both the user and social statistics exists */
    let user = await db.users.getUserById(req.userId);
    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }
    let social = await db.tilesetSocials.getTilesetSocialById(req.params.id);
    if (social === null) {
      return res.status(404).json({ message: "Tileset not found" });
    }

    let likeIndex = social.likes.indexOf(user.id);
    let dislikeIndex = social.dislikes.indexOf(user.id);

    // Like the tileset
    if (likeIndex === -1) {
      social.likes.push(user.id);
    }
    // Undislike the tileset
    if (dislikeIndex > -1) {
      social.dislikes.splice(dislikeIndex, 1);
    }

    /** Update the social statistics for the tileset */
    let updatedSocial = await db.tilesetSocials.updateTilesetSocial(social.id, {
      likes: social.likes,
      dislikes: social.dislikes,
    });
    if (updatedSocial === null) {
      return res.status(500);
    }

    return res.status(200).json({ message: `Tileset liked!`, social: updatedSocial });
  }
  public async dislikeTilesetById(
    req: Request,
    res: Response
  ): Promise<Response> {
    // Check for bad request and missing parameters
    if (!req || !res || !req.params) {
      return res.status(400).json({ message: `Bad request` });
    }
    if (!req.userId) {
      return res.status(400).json({ message: `Missing user id` });
    }
    if (!req.params.id) {
      return res
        .status(400)
        .json({ messagee: `Missing tileset id from params` });
    }

    // Check user exists
    let user = await db.users.getUserById(req.userId);
    if (user === null) {
      return res
        .status(404)
        .json({ message: `User with id ${req.userId} not found` });
    }

    // Check social data exists
    let social = await db.tilesetSocials.getTilesetSocialById(req.params.id);
    if (social === null) {
      return res.status(404).json({
        message: `Tileset social data with id ${req.params.id} not found`,
      });
    }

    // Dislike the tileset - unlike the tileset if need be
    let likeIndex = social.likes.indexOf(user.id);
    let dislikeIndex = social.dislikes.indexOf(user.id);

    // Dislike the tileset
    if (dislikeIndex === -1) {
      social.dislikes.push(user.id);
    }
    // Unlike the tileset
    if (likeIndex > -1) {
      social.likes.splice(likeIndex, 1);
    }

    // Update the social statistics
    let updatedSocial = await db.tilesetSocials.updateTilesetSocial(
      req.params.id,
      {
        likes: social.likes,
        dislikes: social.dislikes,
      }
    );
    if (updatedSocial === null) {
      return res.status(500).json({
        message: `Server Error. Error updating tileset social data with id ${req.params.id}`,
      });
    }

    // Return updated social statistics
    return res
      .status(200)
      .json({ message: "Tileset disliked!", social: updatedSocial });
  }
  public async commentTilesetById(
    req: Request,
    res: Response
  ): Promise<Response> {
    // Check for bad request and missing parameters
    if (!req || !res || !req.body || !req.params) {
      return res.status(400).json({ message: "Bad Request" });
    }
    if (!req.userId) {
      return res.status(400).json({ message: "Missing user id" });
    }
    if (!req.params.id) {
      return res.status(400).json({ message: "Missing tileset id" });
    }
    if (!req.body.comment) {
      return res.status(400).json({ message: "Missing comment from body" });
    }
    if (!req.body.comment.body) {
      return res
        .status(400)
        .json({ message: "Missing text body from comment" });
    }

    // Check the user exists
    let user = await db.users.getUserById(req.userId);
    if (user === null) {
      return res
        .status(404)
        .json({ message: `User with id ${req.userId} not found` });
    }
    // Check the social data exists
    let social = await db.tilesetSocials.getTilesetSocialById(req.params.id);
    if (social === null) {
      return res.status(404).json({
        message: `Tileset social data with id ${req.params.id} not found`,
      });
    }

    // Create the comment
    let comment = await db.comments.createComment(
      user.id,
      user.username,
      social.id,
      req.body.comment.body
    );
    if (comment === null) {
      return res.status(500).json({ message: "Server Error" });
    }

    // Add the comment to the tilesets social data
    social.comments.push(comment.id);

    // Update the tilesets social data
    let updatedSocial = await db.tilesetSocials.updateTilesetSocial(
      req.params.id,
      social
    );
    if (updatedSocial === null) {
      return res
        .status(500)
        .json({ message: "Server Error. Error updating tileset social data" });
    }

    // Return the successfully created comment
    return res
      .status(201)
      .json({ message: "Comment created!", tilesetSocial: updatedSocial });
  }
  public async viewTilesetById(req: Request, res: Response): Promise<Response> {
    // Check for bad request and missing parameters
    if (!req || !res || !req.params) {
      return res.status(400).json({ message: "Bad Request" });
    }
    if (!req.params.id) {
      return res.status(400).json({ message: "Missing tileset social id" });
    }

    // Check social data exists
    let social = await db.tilesetSocials.getTilesetSocialById(req.params.id);
    if (social === null) {
      return res
        .status(404)
        .json({ message: `Tileset with id ${req.params.id} not found` });
    }

    // Increment the views
    social.views += 1;

    // Update the social data
    let updatedSocial = await db.tilesetSocials.updateTilesetSocial(
      social.id,
      social
    );
    if (updatedSocial === null) {
      return res.status(500).json({
        message: `Server Error. Error updating server with id ${req.params.id}`,
      });
    }

    // Return the updated social data
    return res
      .status(200)
      .json({ message: "Tileset social updated!", social: updatedSocial });
  }

  public async favoriteTilesetById(req: Request, res: Response): Promise<Response> {
    if (!req || !res || !req.params) {
        return res.status(400).json({ message: "Bad Request" });
    }
    if (!req.params.id) {
        return res.status(400).json({ message: "Missing tileset id" });
    }
    if (!req.userId) {
        return res.status(400).json({ message: "Missing user id"});
    }

    let user = await db.users.getUserById(req.userId);
    if (user === null) {
        return res.status(404).json({ message: `User ${req.userId} not found`});
    }
    let social = await db.tilesetSocials.getTilesetSocialById(req.params.id);
    if (social === null) {
        return res.status(404).json({ message: `Tileset ${req.params.id} not found`});
    }

    let tilesetIndex = user.favoriteTileSets.indexOf(social.id);
    if (tilesetIndex > -1) {
        return res.status(400).json({ message: `User ${user.id} has already favorited tileset ${social.id}`});
    }

    user.favoriteTileSets.push(social.id);

    let updatedUser = await db.users.updateUser(user.id, {favoriteTileSets: user.favoriteTileSets});
    if (updatedUser === null) {
        return res.status(500).json({ message: "Failed to add tileset to users favorited tilesets"});
    }

    return res.status(200).json({ message: "Favorited a tileset!", user: updatedUser });
}

public async unfavoriteTilesetById(req: Request, res: Response): Promise<Response> {
    if (!req || !res || !req.params) {
        return res.status(400).json({ message: "Bad Request" });
    }
    if (!req.params.id) {
        return res.status(400).json({ message: "Missing tileset id" });
    }
    if (!req.userId) {
        return res.status(400).json({ message: "Missing user id"});
    }

    let user = await db.users.getUserById(req.userId);
    if (user === null) {
        return res.status(404).json({ message: `User ${req.userId} not found`});
    }
    let social = await db.tilesetSocials.getTilesetSocialById(req.params.id);
    if (social === null) {
        return res.status(404).json({ message: `Tileset ${req.params.id} not found`});
    }

    let tilesetIndex = user.favoriteTileSets.indexOf(social.id);
    if (tilesetIndex === -1) {
        return res.status(400).json({ message: `User ${user.id} has already unfavorited tileset ${social.id}`});
    }

    user.favoriteTileSets.splice(tilesetIndex, 1);

    let updatedUser = await db.users.updateUser(user.id, {favoriteTileSets: user.favoriteTileSets});
    if (updatedUser === null) {
        return res.status(500).json({ message: "Failed to remove tileset from user's favorited tilesets"});
    }
    return res.status(200).json({ message: "Unfavorited a tileset!", user: updatedUser });
  }

  public async getPopularTop10(req: Request, res: Response): Promise<Response> {
    if (!req || !res) return res.status(400).json({ message: "Bad Request" })
    let tilesets = await db.tilesetSocials.getPopularTop10()
    return res.status(200).json({message: `Found ${tilesets.length} tilesets`, tilesets: tilesets})
  }

  public async getPopularCommunityTilesets(req: Request, res: Response): Promise<Response> {
    if (!req || !res) return res.status(400).json({ message: "Bad Request" })
    if (!req.params || !req.params.id) return res.status(400).json({message: "Missing community id"})
    let tilesets = await db.tilesetSocials.getPopularCommunityTilesets(req.params.id)
    return res.status(200).json({tilesets: tilesets})
  }
}
