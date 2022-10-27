import { ForumPost, Comment } from "../../../types";
import { ForumDBM } from "../../interface";
import { CommentModel, ForumPostModel, UserModel } from "../schemas";

export default class MongooseForumDBM implements ForumDBM {

    async getForumPost(forumPostId: string): Promise<ForumPost | null> {
        let forumPost: any = await ForumPostModel.findById(forumPostId)
        if (forumPost !== null) {
            return {
                id: forumPost._id.toString(),
                author: forumPost.author,
                title: forumPost.title,
                body: forumPost.body,
                tags: forumPost.tags,
                likes: forumPost.likes,
                dislikes: forumPost.dislikes,
                views: forumPost.views,
                isPublished: forumPost.isPublished
            }
        }
        return null
    }

    async createForumPost(payload: Partial<ForumPost>): Promise<ForumPost | null> {
        const forumPost: any = new ForumPostModel({
            author: payload.author,
            title: payload.title,
            body: payload.body,
            tags: payload.tags,
            likes: [],
            dislikes: [],
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
            views: forumPost.views,
            isPublished: forumPost.isPublished
        } : null
    }

    async updateForumPost(forumPostId: string, payload: Partial<ForumPost>): Promise<ForumPost | null> {
        let forumPost: any = await ForumPostModel.findById(forumPostId)
        if (forumPost !== null) {
            if (payload.author) forumPost.author = payload.author
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
                views: forumPost.views,
                isPublished: forumPost.isPublished
            }
        }
        return null
    }

    async deleteForumPost(forumPostId: string): Promise<string | null> {
        let forumPost = await ForumPostModel.findById(forumPostId)
        if (forumPost !== null) {
            await forumPost.delete()
            return forumPostId
        }
        return null
    }

    async toggleLike(userId: string, forumPostId: string): Promise<ForumPost | null> {
        let user = await UserModel.findById(userId)
        let forumPost: any = await ForumPostModel.findById(forumPostId)
        if ((user !== null) && (forumPost !== null)) {
            let id = user._id.toString()
            let likesArr = forumPost.likes
            let dislikesArr = forumPost.dislikes
            if (!dislikesArr.includes(id)) {
                if (likesArr.includes(id)) {
                    let i = likesArr.indexOf(id)
                    likesArr.splice(i, 1)
                } else {
                    likesArr.push(id)
                }
                await forumPost.save()
                return {
                    id: forumPost._id.toString(),
                    author: forumPost.author,
                    title: forumPost.title,
                    body: forumPost.body,
                    tags: forumPost.tags,
                    likes: forumPost.likes,
                    dislikes: forumPost.dislikes,
                    views: forumPost.views,
                    isPublished: forumPost.isPublished
                }
            }
        }
        return null
    }

    async toggleDislike(userId: string, forumPostId: string): Promise<ForumPost | null> {
        let user = await UserModel.findById(userId)
        let forumPost: any = await ForumPostModel.findById(forumPostId)
        if ((user !== null) && (forumPost !== null)) {
            let id = user._id.toString()
            let likesArr = forumPost.likes
            let dislikesArr = forumPost.dislikes
            if (!likesArr.includes(id)) {
                if (dislikesArr.includes(id)) {
                    let i = dislikesArr.indexOf(id)
                    dislikesArr.splice(i, 1)
                } else {
                    dislikesArr.push(id)
                }
                await forumPost.save()
                return {
                    id: forumPost._id.toString(),
                    author: forumPost.author,
                    title: forumPost.title,
                    body: forumPost.body,
                    tags: forumPost.tags,
                    likes: forumPost.likes,
                    dislikes: forumPost.dislikes,
                    views: forumPost.views,
                    isPublished: forumPost.isPublished
                }
            }
        }
        return null
    }

    async addView(userId: string, forumPostId: string): Promise<ForumPost | null> {
        let user = await UserModel.findById(userId)
        let forumPost: any = await ForumPostModel.findById(forumPostId)
        if ((user !== null) && (forumPost !== null)) {
            let views = forumPost.views
            if (typeof views === 'number') {
                views++
                forumPost.views = views
                await forumPost.save()
                return {
                    id: forumPost._id.toString(),
                    author: forumPost.author,
                    title: forumPost.title,
                    body: forumPost.body,
                    tags: forumPost.tags,
                    likes: forumPost.likes,
                    dislikes: forumPost.dislikes,
                    views: forumPost.views,
                    isPublished: forumPost.isPublished
                }
            }
        }
        return null
    }

    async commentForumPostById(forumPostId: string, payload: Comment): Promise<Comment | null> {
        let forumPost = await ForumPostModel.findById(forumPostId)
        if (forumPost !== null) {
            let comment: any = await CommentModel.create({
                author: payload.author,
                body: payload.body,
                referenceId: payload.referenceId
            })
            await comment.save()
            return {
                author: comment.author,
                body: comment.body,
                referenceId: comment.referenceId
            }
        }
        return null
    }
}