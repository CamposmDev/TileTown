import { ObjectId } from 'mongoose';

/**
 * CommunitySchemaType for the CommunitySchema
 * @author Peter Walsh
 */
export default interface CommunitySchemaType {
    owner: ObjectId,
    name: String,
    description: String,
    memberCounter: number,
    visibility: String
}