import mongoose from 'mongoose';

type ObjectId = mongoose.Types.ObjectId;
/**
 * CommunitySchemaType for the CommunitySchema
 * @author Peter Walsh
 */
export default interface CommunitySchemaType {
    owner: ObjectId,
    name: string,
    description: string,
    members: ObjectId[],
    visibility: string
    banned: ObjectId[]
}