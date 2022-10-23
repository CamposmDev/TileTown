import { Request, Response } from 'express';
import { db } from '../../database';
import { ForumPost } from '../../types';

export default class ForumController {

    public async getForumPostById(req: Request, res: Response): Promise<void> {
        /** If there ins't an id in the url params return 400 */
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