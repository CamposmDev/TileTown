import { ObjectId } from "mongoose";

/**
 * @author Peter Walsh
 */
export default interface TilemapSocialSchemaType {
    tileMap: ObjectId,
    name: string,
    owner: ObjectId,
    ownerName: string,
    collaborators: ObjectId[],
    collaboratorNames: string[],
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