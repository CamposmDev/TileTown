import { Request, Response } from 'express';
import { db } from '../../database';
import { ForumPost } from '@types';

export default class ForumController {

    public async getForumPostById(req: Request, res: Response): Promise<Response> {
        if (!req || !req.params || !req.params.id) {
            return res.status(400).json({message: "Bad Request!"});
        }

        let id: string = req.params.id;
        let forumPost: ForumPost | null = await db.forums.getForumPost(id);

        if (forumPost === null) {
            return res.status(404).json({message: `Forum post with id ${req.params.id} not found`});
        }

        return res.status(200).json({message: "Success!", forumPost: forumPost});
    }
    public async createForumPost(req: Request, res: Response): Promise<Response> {
        if (!req || !req.body) {
            return res.status(400).json({message: 'Bad Request'});
        }
        if (!req.body.forumPost) {
            return res.status(400).json({message: 'Missing body field forumPost'});
        }
        if (!req.userId) {
            return res.status(400).json({message: 'Forum post must have an author'});
        }
        if (!req.body.forumPost.title) {
            return res.status(400).json({message: 'Forum post must have a title'})
        }
        if (!req.body.forumPost.body) {
            return res.status(400).json({message: 'Forum post must have a body'})
        }

        let forumPost: ForumPost | null = await db.forums.createForumPost({author: req.userId, ...req.body.forumPost});
        if (forumPost === null) {
            return res.status(500).json({message: 'Server Error. Error creating forum post.'})
        }
        return res.status(201).json({message: "Successfully created a forum post", forumPost: forumPost});
    }
    public async updateForumPostById(req: Request, res: Response): Promise<Response> {
        // Check for a bad request and missing data
        if (!req || !res || !req.params || !req.body) {
            return res.status(400).json({message: "Bad Request"});
        }
        if (!req.params.id) {
            return res.status(400).json({message: "Missing forum post id"});
        }
        if (!req.body.forumPost) {
            return res.status(400).json({message: "Missing forum post data"});
        }

        // Update the forum post
        let forumPost = await db.forums.updateForumPost(req.params.id, req.body.forumPost);
        if (forumPost === null) {
            return res.status(500).json({message: "Error occured while updating forum post"});
        }

        // Return the result
        return res.status(200).json({message: "Forum post updated successfully.", forumPost: forumPost});
    }
    public async deleteForumPostById(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.params) {
            return res.status(400).json({message: "Bad Request"});
        }
        if (!req.params.id) {
            return res.status(400).json({message: "Missing forum id"});
        }

        let forum = await db.forums.getForumPost(req.params.id);
        if (forum === null) { 
            return res.status(404).json({message: `Forum post with id ${req.params.id} not found`});
        }

        let deletedForum = await db.forums.deleteForumPost(req.params.id);
        if (deletedForum === null) {
            return res.status(500).json({message: `Error deleting forum post with id ${req.params.id}`});
        }

        return res.status(200).json({message: "Forum post deleted!", forumPost: deletedForum});
    }


    public async likeForumPostById(req: Request, res: Response): Promise<Response> {
        if (!req || !req.params || !req.body) {
            return res.status(400).json({message: 'Bad Request'})
        }
        if (!req.userId) {
            return res.status(400).json({message: 'Missing user id'});
        }
        if (!req.params.id) {
            return res.status(400).json({message: 'Missing forum post id'});
        }


        /** Check both the user and forum post exists */
        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({message: "User not found"});
        }
        let forum = await db.forums.getForumPost(req.params.id);
        if (forum === null) {
            return res.status(404).json({message: "Tileset not found"});
        }

        let likeIndex = forum.likes.indexOf(user.id);
        let dislikeIndex = forum.dislikes.indexOf(user.id);
        // Like the forum post
        if (likeIndex === -1) {
            forum.likes.push(user.id);
            // Undislike the forum post if need be
            if (dislikeIndex > -1) {
                forum.dislikes.splice(dislikeIndex, 1);
            }
        }

        // Update the forum post
        let updatedForumPost = await db.forums.updateForumPost(req.params.id, {likes: forum.likes, dislikes: forum.dislikes});
        if (updatedForumPost === null) {
            return res.status(400).json({message: 'Bad Request'})
        }

        // Return the updated forum post
        return res.status(200).json({message: "Successfully created a forum post", forumPost: updatedForumPost})
    }
    public async dislikeForumPostById(req: Request, res: Response): Promise<Response> {
        // Check for bad request and missing parameters
        if (!req || !req.params || !req.body) {
            return res.status(400).json({message: 'Bad Request'});
        }
        if (!req.userId) {
            return res.status(400).json({messagee: "Missing user id"});
        }
        if (!req.params.id) {
            return res.status(400).json({message: "Missing forum post id"});
        }

        // Check user exists
        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({message: `User with id ${req.userId} not found`});
        }

        // Check forum data exists
        let forum = await db.forums.getForumPost(req.params.id);
        if (forum === null) {
            return res.status(404).json({message: `Forum data with id ${req.params.id} not found`});
        }

        // Dislike the forum - unlike the forum if need be
        let likeIndex = forum.likes.indexOf(user.id);
        let dislikeIndex = forum.dislikes.indexOf(user.id);

        // Dislike the tileset
        if (dislikeIndex === -1) {
            forum.dislikes.push(user.id);
        }  
        // Unlike the tileset
        if (likeIndex > -1) {
            forum.likes.splice(likeIndex, 1);
        }

        // Update the forum post
        let updatedForum = await db.forums.updateForumPost(req.params.id, {likes: forum.likes, dislikes: forum.dislikes});
        if (updatedForum === null) {
            return res.status(500).json({message: 'Error updating forum post'});
        }
        // Return the updated forum post
        return res.status(200).json({message: 'Disliked a forum post', forumPost: updatedForum});
    }
    public async commentForumPostById(req: Request, res: Response): Promise<Response> {
        // Check for bad request and missing parameters
        if (!req || !res || !req.body || !req.params) {
            return res.status(400).json({message: "Bad Request"});
        }
        if (!req.userId) {
            return res.status(400).json({message: "Missing user id"});
        }
        if (!req.params.id) {
            return res.status(400).json({message: "Missing forum post id"});
        }
        if (!req.body.comment) {
            return res.status(400).json({message: "Missing comment from body"})
        }
        if (!req.body.comment.body) {
            return res.status(400).json({message: "Missing text body from comment"});
        }

        // Check the user exists
        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({message: `User with id ${req.userId} not found`})
        }
        // Check the forum data exists 
        let forum = await db.forums.getForumPost(req.params.id);
        if (forum === null) {
            return res.status(404).json({message: `Tileset social data with id ${req.params.id} not found`});
        }

        // Create the comment
        let comment = await db.comments.createComment(user.id, forum.id, req.body.comment.body);
        if (comment === null) {
            return res.status(500).json({message: "Server Error. Error occured while creating forum post comment"});
        }

        // Add the comment to the tilesets social data
        forum.comments.push(comment.id);

        // Update the tilesets social data
        let updatedForum = await db.forums.updateForumPost(req.params.id, {comments: forum.comments});
        if (updatedForum === null) {
            return res.status(500).json({message: "Server Error. Error updating tileset social data"});
        }

        return res.status(201).json({message: "Successfully created a comment on a forum post", forum: updatedForum});
    }
    public async viewForumPost(req: Request, res: Response): Promise<Response> {
        // Check for bad request and missing parameters
        if (!req || !res || !req.params) {
            return res.status(400).json({ message: "Bad Request"});
        }
        if (!req.params.id) {
            return res.status(400).json({message: "Missing forum id"});
        }

        // Check social data exists 
        let forum = await db.forums.getForumPost(req.params.id);
        if (forum === null) { 
            return res.status(404).json({message: `Forum with id ${req.params.id} not found`});
        }

        // Increment the views
        forum.views += 1;

        // Update the social data
        let updatedForum = await db.forums.updateForumPost(forum.id, {views: forum.views});
        if (updatedForum === null) {
            return res.status(500).json({message: `Server Error. Error updating forum with id ${req.params.id}`});
        }

        // Return the updated social data
        return res.status(200).json({message: "Forum updated!", social: updatedForum});
    }
}