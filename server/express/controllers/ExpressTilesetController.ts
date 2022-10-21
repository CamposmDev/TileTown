import { Request, Response } from 'express';
import { db } from '../../database';

export default class TilesetController {

    public async getTilesetById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Getting a tileset by id!"});
    }

    public async getTilesetPairs(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Getting tileset pairs"});
    }

    public async getTilesetSocialStats(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Getting social stats for a tileset by id!"});
    }
    
    public async createTileset(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Creating a tileset!"});
    }

    public async deleteTilesetById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Deleting a tileset by id!"});
    }

    public async updateTilesetById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Updating a tileset by id!"});
    }

    public async likeTilesetById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Liking a tileset by id!"});
    }

    public async dislikeTilesetById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Dislike a tileset by id!"});
    }

    public async commentTilesetById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Creating a comment on a tileset by id!"})
    }

    public async viewTilesetById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Viewing a tileset by id!"});
    }

}