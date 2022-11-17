import { ForumPost } from "@types";

export default interface GetForumsRes {
    forumPost?: ForumPost[]
    message: string
}