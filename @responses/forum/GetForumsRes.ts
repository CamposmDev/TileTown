import { ForumPost } from "@types";

export default interface GetForumsRes {
    forumPosts?: ForumPost[]
    message: string
}