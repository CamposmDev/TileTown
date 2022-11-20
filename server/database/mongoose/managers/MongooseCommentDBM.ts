import mongoose, { mongo } from 'mongoose';
import CommentDBM from "../../interface/managers/CommentDBM";
import { Comment } from "@types";
import { CommentModel } from '../schemas';
import { CommentSchemaType } from '../types/index';

export default class MongooseCommentDBM implements CommentDBM {

    async getCommentById(commentId: string): Promise<Comment | null> {
        if (!mongoose.Types.ObjectId.isValid(commentId)) { return null; }
        let comment = await CommentModel.findById(commentId);
        if (comment === null) { return null; }
        return this.parseComment(comment);
    }

    async createComment(userId: string, uname: string, refId: string, body: string): Promise<Comment | null> {
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(refId)) {
            return null;
        }

        let comment = await CommentModel.create({
            author: userId,
            username: uname,
            body: body,
            referenceId: refId,
            createdAt: new Date()
        });
        let savedComment = await comment.save();

        return this.parseComment(savedComment);
    }

    async deleteUserComments(userId: string): Promise<Boolean> {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return false
        }
        let result = await CommentModel.deleteMany({author: userId})
        console.log(`Deleted ${result.deletedCount} comments`)
        return Boolean(result)
    }

    protected parseComment(comment: CommentSchemaType & { _id: mongoose.Types.ObjectId}): Comment {
        return {
            id: comment._id.toString(),
            author: comment.author.toString(),
            referenceId: comment.referenceId.toString(),
            body: comment.body,
            createdAt: comment.createdAt
        }
    }
    
}