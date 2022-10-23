import { ObjectId } from 'mongoose';

/**
 * @author Peter Walsh
 */
export default interface CommentSchemaType {
    author: ObjectId,
    body: string,
    referenceId: ObjectId,
}