import { Request, Response } from 'express';
import { db } from '../../database';
import { ForumPost } from '../../types';

export default class ForumController {

    public async getForumPostById(req: Request, res: Response): Promise<void> {
        /** If there isn't an id in the url params return 400 */
        if (!req || !req.params || !req.params.id) {
            res.status(400).json({message: 'Bad Request'})
            return
        }

        /** If there isn't a forum post in the database with the id return 404 */
        let id = req.params.id
        let forumPost: ForumPost | null = await db.forums.getForumPost(id)
        if (forumPost === null) {
            res.status(404).json({message: 'Forum post does not exist'})
            return
        }

        /** Otherwise return all the data about the forum post to the client */
        res.status(200).json({forumPost: forumPost});
        return
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
        if (!req || !req.params || !req.params.id || !req.body) {
            res.status(400).json({message: 'Bad Request'})
            return
        }

        console.log(req.params.id)
        /** If there isn't a forum post in the database with the id return 404 */
        let id = req.params.id
        let forumPost: ForumPost | null = await db.forums.getForumPost(id)
        if (forumPost === null) {
            res.status(404).json({message: 'Forum post does not exist'})
            return
        }

        forumPost = await db.forums.updateForumPost(id, {
            author: req.body.author,
            title: req.body.title,
            body: req.body.body,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
            tags: req.body.tags,
            views: req.body.views,
            isPublished: req.body.isPublished
        })

        res.status(200).json({forumPost: forumPost})
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
            title: req.body.title,
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