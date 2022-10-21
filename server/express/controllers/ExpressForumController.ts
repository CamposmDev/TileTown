import { Request, Response } from 'express';
import { db } from '../../database';

export default class ForumController {

    public async getForumPostById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Getting a forum post by id!"});
    }

    public async createForumPost(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Creating a forum post!"});
    }

    public async updateForumPostById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Updating a forum post by id!"});
    }

    public async likeForumPostById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Likeing a forum post by id!"});
    }

    public async dislikeForumPostById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Dislikeing a forum post by id!"});
    }

    public async commentForumPostById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Comment on forum post by id!"});
    }
}