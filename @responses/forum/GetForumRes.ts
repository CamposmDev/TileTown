import { ForumPost } from "@types";
import Response from "@responses/Response";

export default interface GetForumRes extends Response {
    forumPost?: ForumPost;
}