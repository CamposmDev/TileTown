import { Comment } from "@types";

export default interface CommentDBM {
    getCommentById(comments: string): Promise<Comment | null>;
    createComment(userId: string, uname: string, refId: string, body: string): Promise<Comment | null>;
    deleteUserComments(userId: string): Promise<Boolean>
}