import { Request, Response } from 'express';
import { db } from '../../database';
import { ForumPost } from "../../types";

export default class ForumController {

    public async getForumPostById(req: Request, res: Response): Promise<void> {
        if (!req || !req.params || !req.params.id) {
            res.status(400).json({message: "Bad Request!"});
            return;
        }

        let id: string = req.params.id;
        let forumPost: ForumPost | null = await db.forums.getForumPost(id);

        if (forumPost === null) {
            res.status(404).json({message: "Not found!"});
            return;
        }

        res.status(200).json({message: "Success!", forumPost: forumPost});
    }

    public async createForumPost(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Creating a forum post!"});
    }

    public async updateForumPostById(req: Request, res: Response): Promise<void> {
        if (!req || !req.body) {
            res.status(400).json({message: "Bad Request"});
            return;
        }

        if (!req.body.userId || !req.body.title || !req.body.tags || !req.body.body || !req.body.isPublished) {
            res.status(400).json({message: "Bad Request"});
            return;
        }

        let forumPost: ForumPost | null = await db.forums.createForumPost({
            author: req.body.userId,
            title: req.body.title,
            body: req.body.body,
            tags: req.body.tags,
            isPublished: req.body.isPublished
        });

        if (forumPost === null) {
            res.status(400).json({message: "Bad Request"});
            return;
        }

        res.status(201).json({message: "Success!"});
        return;
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