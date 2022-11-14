import { ForumPost } from "@types";

export default interface CreateForumReq {
    forumPost: Partial<ForumPost> & { title: string, body: string }
}