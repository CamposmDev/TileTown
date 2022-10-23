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
        if (!req || !req.body) {
            res.status(400).json({message: 'Bad Request'})
            return
        }

        console.log(req.body)
        let forumPost: ForumPost | null = await db.forums.createForumPost({
            author: req.body.author,
            title: req.body.title,
            body: req.body.body,
            tags: req.body.tags,
            isPublished: req.body.isPublished
        })
        
        if (forumPost === null) {
            res.status(400).json({message: 'Bad Request'})
            return
        }
        res.status(200).json({forumPost: forumPost})
        return
    }

    public async updateForumPostById(req: Request, res: Response): Promise<void> {
        if (!req || !req.params.id || !req.body) {
            res.status(400).json({message: "Bad Request"});
            return;
        }

        if (!req.body.userId || !req.body.title || !req.body.tags || !req.body.body || !req.body.isPublished) {
            res.status(400).json({message: "Bad Request"});
            return;
        }

        let id = req.params.id
        let payload: Partial<ForumPost> = {
            author: req.body.author,
            title: req.body.title,
            body: req.body.body,
            tags: req.body.tags,
            isPublished: req.body.isPublished
        }

        let forumPost = db.forums.updateForumPost(id, payload)

        if (forumPost === null) {
            res.status(400).json({message: "Bad Request"});
            return;
        }

        res.status(201).json({message: "Success!"});
        return;
    }

    public async likeForumPostById(req: Request, res: Response): Promise<void> {
        if (!req || !req.body) {
            res.status(400).json({message: 'Bad Request'})
            return
        }

        console.log(req.body)
        let forumPost = await db.forums.toggleLike(req.body.userId, req.body.forumPostId)
        
        if (forumPost === null) {
            res.status(400).json({message: 'Bad Request'})
            return
        }
        res.status(200).json({forumPost: forumPost})
    }

    public async dislikeForumPostById(req: Request, res: Response): Promise<void> {
        if (!req || !req.body) {
            res.status(400).json({message: 'Bad Request'})
            return
        }

        console.log(req.body)
        let forumPost = await db.forums.toggleDislike(req.body.userId, req.body.forumPostId)

        if (forumPost === null) {
            res.status(400).json({message: 'Bad Request'})
            return
        }
        res.status(200).json({forumPost: forumPost})
    }

    public async commentForumPostById(req: Request, res: Response): Promise<void> {
        if (!req || !req.params.id || !req.body) {
            res.status(400).json({message: 'Bad Request'})
        }
        let id = req.params.id
        let forumPost: any = await db.forums.getForumPost(id)
        if (forumPost === null) {
            res.status(400).json({message: 'Bad Request'})
            return
        }
        let comment = await db.forums.commentForumPostById(id, {
            author: req.body.author,
            body: req.body.body,
            referenceId: forumPost.id
        })
        if (comment === null) {
            res.status(400).json({message: 'Bad Request'})
            return
        }
        res.status(200).json({comment: comment})
    }
}