import {
  Tilemap,
  CollaboratorSettings,
  TilemapSocialStatistics,
  SocialStatisticsPermissions,
  Layer,
  Property,
} from "../../../types";
import TilemapSchema from "../../mongoose/schemas/tilemap";
import { TilemapDBM } from "../../interface";
import TilemapSchemaType from "../types/TileMapSchemaType";
import UserSchema from '../../mongoose/schemas/user'
import TilemapSocialStatisticsSchema from "../../mongoose/schemas/tileMapSocialStatistics";
import { EditMode, RenderOrder } from "../../../types/Tilemap";
import { AnyExpression } from "mongoose";

export default class MongooseTilemapDBM implements TilemapDBM {
  async getTilemapById(tilemapId: string): Promise<Tilemap | null> {
    await TilemapSchema.findById(
      tilemapId,
      function (err: any, tilemap: TilemapSchemaType) {
        if (err) return null;
        return {
          id: tilemap._id.toString(),
          backgroundColor: <Color>tilemap.backgroundColor,
          collaborators: tilemap.collaborators.map((x) => x.toString()),
          collaboratorNames: tilemap.collaboratorNames,
          collaboratorSettings: <CollaboratorSettings>(
            tilemap.collaboratorSettings
          ),
          collaboratorIndex: tilemap.collaboratorIndex,
          createDate: new Date(tilemap.createdAt),
          lastSaveDate: new Date(tilemap.updatedAt),
          image: tilemap.image,
          height: tilemap.height,
          width: tilemap.width,
          layers: <[Layer]>tilemap.layers,
          tileHeight: tilemap.tileHeight,
          tileWidth: tilemap.tileWidth,
          nextLayerId: tilemap.nextLayerId,
          nextObjectId: tilemap.nextObjectId,
          orientation: tilemap.orientation,
          name: tilemap.name,
          owner: tilemap.owner,
          properties: <[Property]>tilemap.properties,
          tilesets: tilemap.tilesets.map((x) => x.toString()),
          isPublished: tilemap.isPublished,
        };
      }
    );
    return null;
  }
  async getTilemapPartials(
    userId: string,
    search: string,
    sortBy: string
  ): Promise<[Partial<Tilemap>] | null> {
    throw new Error("Method not implemented.");
  }
  async createTilemap(tilemap: Partial<Tilemap>): Promise<Tilemap | null> {
    throw new Error("Method not implemented.");
  }
  async updateTilemapById(
    tilemapId: string,
    tilemap: Partial<Tilemap>
  ): Promise<Tilemap | null> {
    throw new Error("Method not implemented.");
  }
  async deleteTilemapById(tilemapId: string): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
  //   addLayer(tilemapId: string, layer: Partial<Layer>): Promise<[Layer] | null> {
  //     throw new Error("Method not implemented.");
  //   }
  //   updateLayer(
  //     tilemapId: string,
  //     layer: Partial<Layer>,
  //     index: number
  //   ): Promise<[Layer] | null> {
  //     throw new Error("Method not implemented.");
  //   }
  //   removeLayer(tilemapId: string, index: number): Promise<[Layer] | null> {
  //     throw new Error("Method not implemented.");
  //   }
  //   moveLayers(
  //     tilemapId: string,
  //     firstIndex: number,
  //     secondIndex: number
  //   ): Promise<[Layer] | null> {
  //     throw new Error("Method not implemented.");
  //   }
  //   addCollaborator(
  //     tilemapId: string,
  //     collaboratorId: string
  //   ): Promise<{
  //     collaboratorIds: [string];
  //     collaboratorNames: [string];
  //   } | null> {
  //     throw new Error("Method not implemented.");
  //   }
  //   removeCollaborator(
  //     tilemapId: string,
  //     collaboratorsId: string
  //   ): Promise<{
  //     collaboratorIds: [string];
  //     collaboratorNames: [string];
  //   } | null> {
  //     throw new Error("Method not implemented.");
  //   }
  //   updateCollaboratorSettings(
  //     tilemapId: string,
  //     collaboratorSettings: CollaboratorSettings
  //   ): Promise<CollaboratorSettings | null> {
  //     throw new Error("Method not implemented.");
  //   }
  //   updateCollaboratorIndex(
  //     tilemapId: string,
  //     collaboratorIndex: number
  //   ): Promise<number | null> {
  //     throw new Error("Method not implemented.");
  //   }
  //   addProperty(
  //     tilemapId: string,
  //     property: Property
  //   ): Promise<[Property] | null> {
  //     throw new Error("Method not implemented.");
  //   }
  //   removeProperty(tilemapId: string, index: number): Promise<[Property] | null> {
  //     throw new Error("Method not implemented.");
  //   }
  //   updateProperty(
  //     tilemapId: string,
  //     property: Property,
  //     index: number
  //   ): Promise<[Property] | null> {
  //     throw new Error("Method not implemented.");
  //   }
  //   addTileset(tilemapId: string, tilesetId: string): Promise<[string] | null> {
  //     throw new Error("Method not implemented.");
  //   }
  //   removeTileset(tilemapId: string, index: number): Promise<[string] | null> {
  //     throw new Error("Method not implemented.");
  //   }
  /**
   * @author Tuyen Vo
   */
  addTilemapComment(
    userId: string,
    socialId: string
  ): Promise<TilemapSocialStatistics | null> {
    throw new Error("Method not implemented.")
  }
  async toggleLike(
    userId: string,
    socialId: string
  ): Promise<TilemapSocialStatistics | null> {
    let user = await UserSchema.findById(userId)
    let social: any = await TilemapSocialStatisticsSchema.findById(socialId)
    if ((user !== null) && (social !== null)) {
      let id = user._id.toString()
      let likes = social.likes
      let dislikes = social.dislikes
      if (!dislikes.includes(id)) {
        if (likes.includes(id)) {
          let i = likes.indexOf(id, 0)
          likes.splice(i, 1)
        } else {
          likes.push(id)
        }
        await social.save()
        return {
          tileMap: social.tileMap,
          name: social.name,
          owner: social.owner,
          ownerName: social.ownerName,
          collaborators: social.collaborators,
          collaboratorNames: social.collaboratorNames,
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
  toggleDislike(
    userId: string,
    socialId: string
  ): Promise<TilemapSocialStatistics | null> {
    throw new Error("Method not implemented.");
  }
  addView(
    userId: string,
    socialId: string
  ): Promise<TilemapSocialStatistics | null> {
    throw new Error("Method not implemented.");
  }
  updateTilemapPermissions(
    socialId: string,
    permissions: SocialStatisticsPermissions
  ): Promise<TilemapSocialStatistics | null> {
    throw new Error("Method not implemented.");
  }
}
