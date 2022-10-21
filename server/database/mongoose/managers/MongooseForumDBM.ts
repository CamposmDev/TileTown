import { ForumPost } from "../../../types";
import ForumDBM from "../../interface/managers/ForumDBM";

export default class MongooseForumDBM implements ForumDBM {

    async getForumPost(forumPostId: string): Promise<ForumPost | null> {
        throw new Error("Method not implemented.");
    }
    async createForumPost(forumPost: Partial<ForumPost>): Promise<ForumPost | null> {
        throw new Error("Method not implemented.");
    }
    async updateForumPost(forumPostId: string, forumPost: Partial<ForumPost>): Promise<ForumPost | null> {
        throw new Error("Method not implemented.");
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