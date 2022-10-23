import {
  Tilemap,
  CollaboratorSettings,
  TilemapSocialStatistics,
  SocialStatisticsPermissions,
  Layer,
  Property,
  SortBy,
  Color
} from "../../../types";
import TilemapSchema from "../../mongoose/schemas/tilemap";
import { TilemapDBM } from "../../interface";
import TilemapSchemaType from "../types/TilemapSchemaType";
import UserSchema from '../../mongoose/schemas/user'
import TilemapSocialStatisticsSchema from "../../mongoose/schemas/tileMapSocialStatistics";
import CommentSchema from '../../mongoose/schemas/comment'
import { EditMode, RenderOrder } from "../../../types/Tilemap";
import { AnyExpression } from "mongoose";
import Comment from "../../../types/Comment";

export default class MongooseTilemapDBM implements TilemapDBM {
  async getTilemapById(tilemapId: string): Promise<Tilemap | null> {
    await TilemapSchema.findById(
      tilemapId,
      function (err: any, tilemap: TilemapSchemaType) {
        if (err) {
          console.log(err.message);
          return null;
        }
        return {
          id: tilemap._id.toString(),
          backgroundColor: <Color>tilemap.backgroundColor,
          collaborators: tilemap.collaborators.map((x) => x.toString()),
          collaboratorNames: tilemap.collaboratorNames,
          collaboratorSettings: <CollaboratorSettings>(
            tilemap.collaboratorSettings
          ),
          collaboratorIndex: tilemap.collaboratorIndex,
          createDate: new Date(tilemap.createdAt.toString()),
          lastSaveDate: new Date(tilemap.updatedAt.toString()),
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
  //TODO Move sortBy to regex so it's done on database
  async getTilemapPartials(
    userId: string,
    search: string,
    sortBy: SortBy
  ): Promise<[Partial<Tilemap>] | null> {
    await TilemapSchema.find(
      {
        collaboratorSettings: [userId],
        name: new RegExp(search, "i"),
        isPublish: { $ne: true },
      },
      function (err: any, tilemapPartials: [Partial<TilemapSchemaType>]) {
        if (err) {
          console.log(err.message);
          return null;
        }
        let partials: Partial<Tilemap>[] = new Array();
        for (let partial of tilemapPartials) {
          let newPartial: Partial<Tilemap> = {
            id: partial._id?.toString(),
            image: partial.image,
            name: partial.name,
            owner: partial.owner,
            collaboratorNames: partial.collaboratorNames,
            lastSaveDate: partial.updatedAt,
          };
          partials.push(newPartial);
        }
        //TODO Figure out a better workaround this type checking
        switch (sortBy) {
          case SortBy.Newest: {
            partials.sort(function (a, b) {
              if (a.lastSaveDate === null && b.lastSaveDate !== null) return -1;
              if (b.lastSaveDate === null && a.lastSaveDate !== null) return 1;
              if (a.lastSaveDate === null && b.lastSaveDate === null) return 0;
              let aDate: any = new Date(<string>a.lastSaveDate?.toString());
              let bDate: any = new Date(<string>b.lastSaveDate?.toString());
              return <any>bDate - <any>aDate;
            });
            break;
          }
          case SortBy.Oldest: {
            partials.sort(function (a, b) {
              if (a.lastSaveDate === null && b.lastSaveDate !== null) return 1;
              if (b.lastSaveDate === null && a.lastSaveDate !== null) return -1;
              if (a.lastSaveDate === null && b.lastSaveDate === null) return 0;
              let aDate: any = new Date(<string>a.lastSaveDate?.toString());
              let bDate: any = new Date(<string>b.lastSaveDate?.toString());
              return <any>aDate - <any>bDate;
            });
            break;
          }
          default:
            break;
        }
        return partials;
      }
    );
    return null;
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
  // }
  
  
  /**
   * @author Tuyen Vo
   */
  async addTilemapComment( payload: Comment): Promise<TilemapSocialStatistics | null> {
    if (payload !== null) {
      let refId = payload.referenceId
      let social: any = await TilemapSocialStatisticsSchema.findById(refId)
      if (social !== null) {
        let comment = await CommentSchema.create(payload)
        await comment.save()
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

  async toggleLike( userId: string, socialId: string): Promise<TilemapSocialStatistics | null> {
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

  async toggleDislike( userId: string, socialId: string): Promise<TilemapSocialStatistics | null> {
    let user = await UserSchema.findById(userId)
    let social: any = await TilemapSocialStatisticsSchema.findById(socialId)
    if ((user !== null) && social !== null) {
      let id = user._id.toString()
      let likes = social.likes
      let dislikes = social.dislikes
      if (!likes.includes(id)) {
        if (dislikes.includes(id)) {
          let i = dislikes.indexOf(id, 0)
          dislikes.splice(i, 1)
        } else {
          dislikes.push(id)
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

  async addView( userId: string, socialId: string): Promise<TilemapSocialStatistics | null> {
    let user = await UserSchema.findById(userId)
    let social: any = await TilemapSocialStatisticsSchema.findById(socialId)
    if ((user !== null) && (social !== null)) {
      social.views++
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
    return null
  }
   updateTilemapPermissions( socialId: string, permissions: SocialStatisticsPermissions): Promise<TilemapSocialStatistics | null> {
    throw new Error("Method not implemented.");
  }
}
