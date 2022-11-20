import mongoose from 'mongoose';

type ObjectId = mongoose.Types.ObjectId;

/**
 * @author Peter Walsh
 */
export default interface CommentSchemaType {
    timestamp: {}
    author: ObjectId,
    username: string,
    body: string,
    referenceId: ObjectId,
}