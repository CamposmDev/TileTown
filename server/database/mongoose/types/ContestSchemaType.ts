import { ObjectId } from 'mongoose';

/**
 * @author Peter Walsh
 */
export default interface ContestSchemaType {
    owner: ObjectId,
    name: string,
    description: string,
    participates: ObjectId[],
    startDate: Date,
    endDate: Date,
    winner: ObjectId,
    isPublished: boolean
}