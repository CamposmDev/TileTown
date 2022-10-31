import mongoose from 'mongoose';

type ObjectId = mongoose.Types.ObjectId;

export default interface ForumSchemaType {
    author: ObjectId;
    title: string;
    body: string;
    tags: string[];
    likes: ObjectId[];
    dislikes: ObjectId[];
    comments: ObjectId[];
    views: number;
    isPublished: boolean;
}