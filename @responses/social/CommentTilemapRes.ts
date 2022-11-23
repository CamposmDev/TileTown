import Response from "../Response";
import { Comment } from "@types";

export default interface CommentTilemapRes extends Response {
    comment?: Comment
}