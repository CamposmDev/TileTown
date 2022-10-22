import { ObjectId } from 'mongoose';

export default interface ContestSchemaType {
    owner: ObjectId,
    name: string,
    description: string,
    particpates: ObjectId[],
    startDate: Date,
    endDate: Date,
    winner: ObjectId,
    isPublished: boolean
}