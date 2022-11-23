import Response from "../Response";
import { Comment } from "@types";

export default interface CommentTilesetRes extends Response {
    comment?: Comment
}