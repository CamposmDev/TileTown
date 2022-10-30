import mongoose from 'mongoose';
import { ForumPost } from "../../../types";
import { ForumDBM } from "../../interface";
import { ForumPostModel } from "../schemas";
import { ForumSchemaType } from "../types";

/**
 * @author Michael Campos, Peter Walsh
 */
export default class MongooseForumDBM implements ForumDBM {

    async getForumPost(forumPostId: string): Promise<ForumPost | null> {
        if (!mongoose.Types.ObjectId.isValid(forumPostId)) { return null; }

        let forumPost = await ForumPostModel.findById(forumPostId)
        if (forumPost === null) { return null; }

        return this.parseForumPost(forumPost);
    }
    async createForumPost(payload: Partial<ForumPost> & {author: string, title: string, body: string}): Promise<ForumPost | null> {
        let forumPost = new ForumPostModel({
            author: payload.author,
            title: payload.title,
            body: payload.body,
            tags: payload.tags ? payload.tags : [],
            likes: payload.likes ? payload.likes : [],
            dislikes: payload.dislikes ? payload.dislikes : [],
            isPublished: payload.isPublished ? payload.isPublished : false,
            comments: payload.comments ? payload.comments : []
        });
        let res = await forumPost.save()
        return this.parseForumPost(res);
    }
    async updateForumPost(forumId: string, payload: Partial<ForumPost>): Promise<ForumPost | null> {
        if (!mongoose.Types.ObjectId.isValid(forumId)) { return null; }

        let forum = await ForumPostModel.findById(forumId);
        if (forum === null) { return null; }

        this.fillForumPost(forum, payload);
        let savedForum = await forum.save();

        return this.parseForumPost(savedForum);
    }
    async deleteForumPost(forumPostId: string): Promise<ForumPost | null> {
        if (!mongoose.Types.ObjectId.isValid(forumPostId)) { return null; }
        let forumPost = await ForumPostModel.findByIdAndDelete(forumPostId)
        if (forumPost === null) { return null; }
        return this.parseForumPost(forumPost);
    }


    protected parseForumPost(forum: ForumSchemaType & { _id: mongoose.Types.ObjectId}): ForumPost {
        return {
            id: forum._id.toString(),
            author: forum.author.toString(),
            title: forum.title,
            body: forum.body,
            tags: forum.tags,
            likes: forum.likes.map(id => id.toString()),
            dislikes: forum.dislikes.map(id => id.toString()),
            views: forum.views,
            isPublished: forum.isPublished,
            comments: forum.comments.map(id => id.toString())
        }
    }
    protected fillForumPost(forum: ForumSchemaType & { _id: mongoose.Types.ObjectId}, partial: Partial<ForumPost>): void {
        forum.author = partial.author ? new mongoose.Types.ObjectId(partial.author) : forum.author;
        forum.title = partial.title ? partial.title : forum.title;
        forum.body = partial.body ? partial.body : forum.body;
        forum.tags = partial.tags ? partial.tags : forum.tags;
        forum.likes = partial.likes ? partial.likes.map(id => new mongoose.Types.ObjectId(id)) : forum.likes;
        forum.dislikes = partial.dislikes ? partial.dislikes.map(id => new mongoose.Types.ObjectId(id)) : forum.dislikes;
        forum.isPublished = partial.isPublished ? partial.isPublished : forum.isPublished;
        forum.comments = partial.comments ? partial.comments.map(id => new mongoose.Types.ObjectId(id)) : forum.comments;
    }
}