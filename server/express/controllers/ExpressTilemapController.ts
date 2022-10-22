import { Request, Response } from 'express';
import { db } from '../../database';

export default class TilemapController {

    public async getTilemapById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Getting tilemap by id!"});
    }

    public async getTilemapSocialStatsById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Getting tilemap social stats by id!"});
    }

    public async getTiemapPairs(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Getting tilemap pairs!"});
    }

    public async createTilemap(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Creating tilemap!"});
    }

    public async deleteTilemapById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Deleting tilemap by id!"});
    }

    public async updateTilemapById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Updating tilemap by id!"});
    }

    public async likeTilemapById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Liking a tilemap by id!"});
    }

    public async dislikeTilemapById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Dislke a tilemap by id!"});
    }

    public async commentTilemapById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Comment on tilemap by id!"});
    }

    public async viewTilemapById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Viewing a tilemap by id!"});
    }

}

