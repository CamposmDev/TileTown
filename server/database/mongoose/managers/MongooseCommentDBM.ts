import mongoose from 'mongoose';
import CommentDBM from "../../interface/managers/CommentDBM";
import { Comment } from "../../../types";
import { CommentModel } from '../schemas';
import { CommentSchemaType } from '../types/index';

export default class MongooseCommentDBM implements CommentDBM {

    async getCommentById(commentId: string): Promise<Comment | null> {
        throw new Error("Method not implemented.");
    }

    async createComment(userId: string, refId: string, body: string): Promise<Comment | null> {
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(refId)) {
            return null;
        }

        let comment = await CommentModel.create({
            author: userId,
            body: body,
            referenceId: refId
        });
        let savedComment = await comment.save();

        return this.parseComment(savedComment);
    }

    protected parseComment(comment: CommentSchemaType & { _id: mongoose.Types.ObjectId}): Comment {
        return {
            id: comment._id.toString(),
            author: comment._id.toString(),
            referenceId: comment.referenceId.toString(),
            body: comment.body
        }
    }
    
}