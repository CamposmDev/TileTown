import { ObjectId } from "mongoose";
import { PropertySchemaType } from ".";

/**
 * @author Peter Walsh
 */
export default interface TilesetSocialSchemaType {
    tileSet: ObjectId,
    name: string,
    // I think there should be an owner field
    // owner: ObjectId
    ownerName: ObjectId,  // I think string...
    tags: string[],
    description: string,
    communities: ObjectId[],
    likes: ObjectId[],
    dislikes: ObjectId[],
    views: number,
    permissions: { type: string, setting: string }[],
    comments: ObjectId[],
    publishDate: Date,
    imageURL: string
}