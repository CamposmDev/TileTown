import { ForumPost } from "@types";
import Response from "@responses/Response";

export default interface UpdateForumReq {
    forumPost: {
        body: string
    }
}