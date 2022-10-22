import { ForumPost } from "../../../types";
import ForumDBM from "../../interface/managers/ForumDBM";
import ForumPostSchema from '../../mongoose/schemas/forumPost'

export default class MongooseForumDBM implements ForumDBM {

    async getForumPost(forumPostId: string): Promise<ForumPost | null> {
        let forumPost: any = await ForumPostSchema.findById(forumPostId)
        if (forumPost !== null) {
            return {
                id: forumPost._id.toString(),
                author: forumPost.author,
                title: forumPost.title,
                body: forumPost.body,
                tags: forumPost.tags,
                likes: forumPost.likes,
                dislikes: forumPost.dislikes,
                isPublished: forumPost.isPublished
            }
        }
        return null
    }

    async createForumPost(payload: Partial<ForumPost>): Promise<ForumPost | null> {
        const forumPost: any = new ForumPostSchema({
            author: payload.author,
            title: payload.title,
            body: payload.body,
            tags: payload.tags,
            likes: payload.likes,
            dislikes: payload.dislikes,
            isPublished: payload.isPublished
        })
        let res = await forumPost.save()
        return res !== null ? {
            id: forumPost._id.toString(),
            author: forumPost.author,
            title: forumPost.title,
            body: forumPost.body,
            tags: forumPost.tags,
            likes: forumPost.likes,
            dislikes: forumPost.dislikes,
            isPublished: forumPost.isPublished
        } : null
    }

    async updateForumPost(forumPostId: string, payload: Partial<ForumPost>): Promise<ForumPost | null> {
        let forumPost: any = await ForumPostSchema.findById(forumPostId)
        if (forumPost !== null) {
            if (payload.title) forumPost.title = payload.title
            if (payload.body) forumPost.body = payload.body
            if (payload.tags) forumPost.tags = payload.tags
            if (payload.likes) forumPost.likes= payload.likes
            if (payload.dislikes) forumPost.dislikes = payload.dislikes
            if (payload.isPublished) forumPost.isPublished = payload.isPublished
            await forumPost.save()
            return {
                id: forumPost._id.toString(),
                author: forumPost.author,
                title: forumPost.title,
                body: forumPost.body,
                tags: forumPost.tags,
                likes: forumPost.likes,
                dislikes: forumPost.dislikes,
                isPublished: forumPost.isPublished
            }
        }
        return null
    }
    async deleteForumPost(forumPostId: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    async toggleLike(userId: string, forumPostId: string): Promise<ForumPost | null> {
        throw new Error("Method not implemented.");
    }
    async toggleDislike(userId: string, forumPostId: string): Promise<ForumPost | null> {
        throw new Error("Method not implemented.");
    }
    async addView(userId: string, forumPostId: string): Promise<ForumPost | null> {
        throw new Error("Method not implemented.");
    }

}