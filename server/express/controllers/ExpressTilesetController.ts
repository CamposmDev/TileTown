import { Request, Response } from "express";
import { is } from "typescript-is";
import { db } from "../../database";
import { SortBy, Tileset } from "../../types";

export default class TilesetController {
  public async getTilesetById(req: Request, res: Response): Promise<Response> {
    //check to see if a request body was sent
    if (!req.body) {
      return res.status(400).json({
        errorMessage: "Improperly formatted request",
      });
    }

    const tilesetId: string = req.body.tilesetId;

    //check to see if a tileset id was provided and if it was formatted as a string
    if (!tilesetId || !is<string>(tilesetId)) {
      return res.status(400).json({
        errorMessage: "No tilesetId provided",
      });
    }

    const response: Partial<Tileset> | string =
      await db.tilesets.getTilesetById(tilesetId);

    //check for error messages
    if (is<string>(response)) {
      return res.status(400).json({
        errorMessage: response,
      });
    }

    //make sure response is at in the format of a tileset partial
    if (!response || !is<Partial<Tileset>>(response)) {
      return res.status(400).json({
        errorMessage: "unable to get tileset",
      });
    }

    return res
      .status(200)
      .json({ message: "Getting tileset!", response: response });
  }

  public async getTilesetSocialStatsById(
    req: Request,
    res: Response
  ): Promise<void> {
    res.status(200).json({ message: "Getting tileset social stats by id!" });
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
    if (!sortBy || !is<SortBy>(SortBy)) {
      return res.status(400).json({
        errorMessage: "No sortBy string provided",
      });
    }

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

  public async createTileset(req: Request, res: Response): Promise<Response> {
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
        errorMessage: "No userId Provided",
      });
    }

    const tileset: Partial<Tileset> = req.body.userId;

    //check to see if a tileset partial was provided and if it was formatted properly
    if (!tileset || !is<Partial<Tileset>>(tileset)) {
      return res.status(400).json({
        errorMessage: "No tileset data provided",
      });
    }

    const response: Partial<Tileset> | string = await db.tilesets.createTileset(
      userId,
      tileset
    );

    //check for error messages
    if (is<string>(response)) {
      return res.status(400).json({
        errorMessage: response,
      });
    }

    //make sure response is at in the format of a tileset partial
    if (!response || !is<Partial<Tileset>>(response)) {
      return res.status(400).json({
        errorMessage: "unable to create new tileset",
      });
    }

    return res
      .status(201)
      .json({ message: "Creating tileset!", response: response });
  }

  public async deleteTilesetById(
    req: Request,
    res: Response
  ): Promise<Response> {
    //check to see if a request body was sent
    if (!req.body) {
      return res.status(400).json({
        errorMessage: "Improperly formatted request",
      });
    }

    const tilesetId: string = req.body.tilesetId;

    //check to see if a tileset id was provided and if it was formatted as a string
    if (!tilesetId || !is<string>(tilesetId)) {
      return res.status(400).json({
        errorMessage: "No tileset id provided",
      });
    }

    const response: Partial<Tileset> | string =
      await db.tilesets.deleteTilesetById(tilesetId);

    //check for error messages
    if (is<string>(response)) {
      return res.status(400).json({
        errorMessage: response,
      });
    }

    //make sure response is at in the format of a tileset partial
    if (!response || !is<Partial<Tileset>>(response)) {
      return res.status(400).json({
        errorMessage: "unable to delete tileset",
      });
    }

    return res
      .status(201)
      .json({ message: "Deleting tileset!", response: response });
  }

  public async updateTilesetById(
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
        errorMessage: "no userId provided",
      });
    }

    const tileset: Partial<Tileset> = req.body.userId;

    //check to see if a tileset partial was provided and if it was formatted properly
    if (!tileset || !is<Partial<Tileset>>(tileset)) {
      return res.status(400).json({
        errorMessage: "no tileset data provided",
      });
    }

    const response: Partial<Tileset> | string =
      await db.tilesets.updateTilesetById(userId, tileset);

    //check for error messages
    if (is<string>(response)) {
      return res.status(400).json({
        errorMessage: response,
      });
    }

    //make sure response is at in the format of a tileset partial
    if (!response || !is<Partial<Tileset>>(response)) {
      return res.status(400).json({
        errorMessage: "unable to update new tileset",
      });
    }

    return res
      .status(201)
      .json({ message: "updating tileset!", response: response });
  }

  public async likeTilesetById(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: "Liking a tileset by id!" });
  }

  public async dislikeTilesetById(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: "Dislike a tileset by id!" });
  }

  public async commentTilesetById(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: "Comment on tileset by id!" });
  }

  public async viewTilesetById(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: "Viewing a tileset by id!" });
  }
}
