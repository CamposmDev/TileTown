import { Tileset, TilesetSocialStatistics, SocialStatisticsPermissions } from "../../../types";
import Comment from "../../../types/Comment";
import { TilesetDBM } from "../../interface";
import TilesetSchema from "../../mongoose/schemas/tilemap";
import UserSchema from '../../mongoose/schemas/user'
import TilesetSocialStatisticsSchema from "../../mongoose/schemas/tileMapSocialStatistics";
import CommentSchema from '../../mongoose/schemas/comment'


export default class MongooseTilesetDBM implements TilesetDBM {
    async getTilesetById(tilesetId: string): Promise<Tileset | null> {
        throw new Error("Method not implemented.");
    }
    async createTileset(tileset: Partial<Tileset>): Promise<Tileset | null> {
        throw new Error("Method not implemented.");
    }
    async updateTilesetById(tilesetId: string, tileset: Partial<Tileset>): Promise<Tileset | null> {
        throw new Error("Method not implemented.");
    }
    async deleteTilesetById(tilesetId: string): Promise<Tileset | null> {
        throw new Error("Method not implemented.");
    }
    
    /**
     * 
     * @auhtor Tuyen Vo
     */

    async addTilesetComment(payload: Comment): Promise<TilesetSocialStatistics | null> {
        if( payload !== null) {
            let refId = payload.referenceId
            let social: any = await TilesetSocialStatisticsSchema.findById(refId)
            if (social !== null) {
              let comment = await CommentSchema.create(payload)
              await comment.save()
              return {
                tileset: social.tileset,
                name: social.name,
                owner: social.owner,
                ownerName: social.ownerName,
                tags: social.tags,
                description: social.description,
                communities: social.communities,
                likes: social.likes,
                dislikes: social.dislikes,
                views: social.views,
                permissions: social.permissions,
                comments: social.comments,
                publishDate: social.publishDate,
                imageURL: social.imageURL
              }
            }
          }
        return null
    }
    async toggleLike(userId: string, socialId: string): Promise<TilesetSocialStatistics | null> {
        throw new Error("Method not implemented.");
    }
    async toggleDislike(userId: string, socialId: string): Promise<TilesetSocialStatistics | null> {
        throw new Error("Method not implemented.");
    }
    async addView(userId: string, socialId: string): Promise<TilesetSocialStatistics | null> {
        throw new Error("Method not implemented.");
    }

    updateTilesetPermissions(socialId: string, permissions: SocialStatisticsPermissions): Promise<TilesetSocialStatistics | null> {
        throw new Error("Method not implemented.");
    }
}