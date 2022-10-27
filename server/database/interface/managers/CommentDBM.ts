import { Comment } from "../../../types";

export default interface CommentDBM {
    getCommentById(comments: string): Promise<Comment | null>;
    createComment(userId: string, refId: string, body: string): Promise<Comment | null>;
}