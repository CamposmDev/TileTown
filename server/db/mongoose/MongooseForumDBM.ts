import { ForumPost } from "../../types";
import ForumDBM from "../interface/ForumDBM";

export default class MongooseForumDBM implements ForumDBM {
    getForumPost(forumPostId: string): ForumPost | null {
        throw new Error("Method not implemented.");
    }
    createForumPost(forumPost: Partial<ForumPost>): ForumPost | null {
        throw new Error("Method not implemented.");
    }
    updateForumPost(forumPostId: string, forumPost: Partial<ForumPost>): ForumPost | null {
        throw new Error("Method not implemented.");
    }
    deleteForumPost(forumPostId: string): string | null {
        throw new Error("Method not implemented.");
    }
    toggleLike(userId: string, forumPostId: string): ForumPost | null {
        throw new Error("Method not implemented.");
    }
    toggleDislike(userId: string, forumPostId: string): ForumPost | null {
        throw new Error("Method not implemented.");
    }
    addView(userId: string, forumPostId: string): ForumPost | null {
        throw new Error("Method not implemented.");
    }
    
}