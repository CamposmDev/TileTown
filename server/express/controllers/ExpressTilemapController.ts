import { Request, Response } from "express";
import { db } from "../../database";
import { SortBy, Tilemap } from "../../types";
import { is } from "typescript-is";
const isTilemap = (
  response: string | Partial<Tilemap>
): response is Tilemap => {
  return (response as Tilemap).id !== undefined;
};

export default class TilemapController {
  public async getTilemapById(req: Request, res: Response): Promise<Response> {
    //check to see if a request body was sent
    if (!req || !req.params || !req.params.id) {
      return res.status(400).json({ message: "Bad request" });
    }

    const tilemapId: string = req.params.id;

    // //check to see if a tilemap id was provided and if it was formatted as a string
    // if (!tilemapId || !is<string>(tilemapId)) {
    //   return res.status(400).json({
    //     errorMessage: "No tilemapId provided",
    //   });
    // }

    const response: Tilemap | string = await db.tilemaps.getTilemapById(
      tilemapId
    );

    //check for error messages
    if (!isTilemap(response)) {
      return res.status(400).json({
        errorMessage: response,
      });
    }

    // //make sure response is at in the format of a tilemap partial
    // if (!response || !is<Partial<Tilemap>>(response)) {
    //   return res.status(400).json({
    //     errorMessage: "unable to get tilemap",
    //   });
    // }

    return res
      .status(200)
      .json({ message: "Getting tilemap!", response: response });
  }

  public async getTilemapSocialStatsById(
    req: Request,
    res: Response
  ): Promise<void> {
    res.status(200).json({ message: "Getting tilemap social stats by id!" });
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
    if (!sortBy || !is<SortBy>(SortBy)) {
      return res.status(400).json({
        errorMessage: "No sortBy string provided",
      });
    }

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
    if (!req.body) {
      return res.status(400).json({
        errorMessage: "Improperly formatted request",
      });
    }

    const userId: string = req.userId;

    //check to see if a user id was provided and if it was formatted as a string
    if (!userId) {
      return res.status(400).json({
        errorMessage: "No userId Provided",
      });
    }

    const tilemap: Partial<Tilemap> = req.body.tilemap;

    //check to see if a tilemap partial was provided and if it was formatted properly
    if (!tilemap) {
      return res.status(400).json({
        errorMessage: "No tilemap data provided",
      });
    }

    const response = await db.tilemaps.createTilemap(userId, tilemap);

    //check for error messages
    if (!isTilemap(response)) {
      return res.status(400).json({
        errorMessage: response,
      });
    }

    // //make sure response is at in the format of a tilemap partial
    // if (!response || !is<Partial<Tilemap>>(response)) {

    // }

    return res
      .status(201)
      .json({ message: "Creating tilemap!", response: response });
  }

  public async deleteTilemapById(
    req: Request,
    res: Response
  ): Promise<Response> {
    //check to see if a request body was sent
    if (!req.body) {
      return res.status(400).json({
        errorMessage: "Improperly formatted request",
      });
    }

    const tilemapId: string = req.body.tilemapId;

    //check to see if a tilemap id was provided and if it was formatted as a string
    if (!tilemapId || !is<string>(tilemapId)) {
      return res.status(400).json({
        errorMessage: "No tilemap id provided",
      });
    }

    const response: Partial<Tilemap> | string =
      await db.tilemaps.deleteTilemapById(tilemapId);

    //check for error messages
    if (is<string>(response)) {
      return res.status(400).json({
        errorMessage: response,
      });
    }

    //make sure response is at in the format of a tilemap partial
    if (!response || !is<Partial<Tilemap>>(response)) {
      return res.status(400).json({
        errorMessage: "unable to delete tilemap",
      });
    }

    return res
      .status(201)
      .json({ message: "Deleting tilemap!", response: response });
  }

  public async updateTilemapById(
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

    const tilemap: Partial<Tilemap> = req.body.userId;

    //check to see if a tilemap partial was provided and if it was formatted properly
    if (!tilemap || !is<Partial<Tilemap>>(tilemap)) {
      return res.status(400).json({
        errorMessage: "no tilemap data provided",
      });
    }

    const response: Partial<Tilemap> | string =
      await db.tilemaps.updateTilemapById(userId, tilemap);

    //check for error messages
    if (is<string>(response)) {
      return res.status(400).json({
        errorMessage: response,
      });
    }

    //make sure response is at in the format of a tilemap partial
    if (!response || !is<Partial<Tilemap>>(response)) {
      return res.status(400).json({
        errorMessage: "unable to update new tilemap",
      });
    }

    return res
      .status(201)
      .json({ message: "updating tilemap!", response: response });
  }

  public async likeTilemapById(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: "Liking a tilemap by id!" });
  }

  public async dislikeTilemapById(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: "Dislike a tilemap by id!" });
  }

  public async commentTilemapById(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: "Comment on tilemap by id!" });
  }

  public async viewTilemapById(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: "Viewing a tilemap by id!" });
  }
}
