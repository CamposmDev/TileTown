import { ForumPost } from "@types";
import Response from "@responses/Response";

export default interface CreateForumRes extends Response {
    forumPost?: ForumPost
}