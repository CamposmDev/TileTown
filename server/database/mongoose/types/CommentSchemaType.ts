import mongoose from 'mongoose';

type ObjectId = mongoose.Types.ObjectId;

/**
 * @author Peter Walsh
 */
export default interface CommentSchemaType {
    author: ObjectId,
    username: string,
    body: string,
    referenceId: ObjectId,
}