import mongoose from "mongoose";

type ObjectId = mongoose.Types.ObjectId;
/**
 * @author Peter Walsh
 */
export default interface TilesetSocialSchemaType {
    tileSet: ObjectId,
    name: string,
    owner: ObjectId,
    tags: string[],
    description: string,
    community: ObjectId,
    likes: ObjectId[],
    dislikes: ObjectId[],
    views: number,
    permissions: { type: string, setting: string }[],
    comments: ObjectId[],
    publishDate: Date,
    imageURL: string
}