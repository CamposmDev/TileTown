import { Request, Response } from "express";
import { db } from "../../database";
import { Tilemap } from "../../types";
import { is } from "typescript-is";

export default class TilemapController {
  public async getTilemapById(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: "Getting tilemap by id!" });
  }

  public async getTilemapSocialStatsById(
    req: Request,
    res: Response
  ): Promise<void> {
    res.status(200).json({ message: "Getting tilemap social stats by id!" });
  }

  public async getTilemapPartials(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: "Getting tilemap pairs!" });
  }

  public async createTilemap(req: Request, res: Response): Promise<Response> {
    //check to see if a request body was sent
    if (!req.body) {
      return res.status(400).json({
        errorMessage: "Improperly formatted request",
      });
    }

    let userId: string = req.userId;

    //check to see if a user id was provided and if it was formatted as a string
    if (!userId || !is<string>(userId)) {
      return res.status(400).json({
        errorMessage: "Improperly formatted request",
      });
    }

    let tilemap: Partial<Tilemap> = req.body.userId;

    //check to see if a tilemap partial was provided and if it was formatted properly
    if (!tilemap || !is<Partial<Tilemap>>(tilemap)) {
      return res.status(400).json({
        errorMessage: "Improperly formatted request",
      });
    }

    const response: Partial<Tilemap> | string = await db.tilemaps.createTilemap(
      userId,
      tilemap
    );

    //check for error messages
    if (is<string>(response)) {
      return res.status(400).json({
        errorMessage: response,
      });
    }

    //make sure response is at in the format of a tilemap partial
    if (!is<Partial<Tilemap>>(response)) {
      return res.status(400).json({
        errorMessage: "unable to create new tilemap",
      });
    }

    return res
      .status(201)
      .json({ message: "Creating tilemap!", response: response });
  }

  public async deleteTilemapById(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: "Deleting tilemap by id!" });
  }

  public async updateTilemapById(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: "Updating tilemap by id!" });
  }

  public async likeTilemapById(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: "Liking a tilemap by id!" });
  }

  public async dislikeTilemapById(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: "Dislke a tilemap by id!" });
  }

  public async commentTilemapById(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: "Comment on tilemap by id!" });
  }

  public async viewTilemapById(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: "Viewing a tilemap by id!" });
  }
}
