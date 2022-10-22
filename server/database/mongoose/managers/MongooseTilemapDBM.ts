import {
  Tilemap,
  CollaboratorSettings,
  TilemapSocialStatistics,
  SocialStatisticsPermissions,
  Layer,
  Property,
  SortBy,
} from "../../../types";
import TilemapSchema from "../../mongoose/schemas/tilemap";
import UserSchema from "../../mongoose/schemas/user";
import { TilemapDBM } from "../../interface";
import TilemapSchemaType from "../types/TileMapSchemaType";
import { EditMode, RenderOrder } from "../../../types/Tilemap";
import UserSchemaType from "../types/UserSchemaType";

export default class MongooseTilemapDBM implements TilemapDBM {
  async getTilemapById(tilemapId: string): Promise<Tilemap | string> {
    await TilemapSchema.findById(
      tilemapId,
      function (err: Error, tilemap: TilemapSchemaType) {
        if (err) {
          console.log(err.message);
          return err.message;
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
    return "unable to get tilemap";
  }
  //TODO Move sortBy to regex so it's done on database
  async getTilemapPartials(
    userId: string,
    search: string,
    sortBy: SortBy
  ): Promise<[Partial<Tilemap>] | string> {
    await TilemapSchema.find(
      {
        collaboratorSettings: [userId],
        name: new RegExp(search, "i"),
        isPublish: { $ne: true },
      },
      function (err: any, tilemapPartials: [Partial<TilemapSchemaType>]) {
        if (err) {
          console.log(err.message);
          return err.message;
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
        //Possibly move to controller or database query
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
    return "Unable to get Tilemaps";
  }
  async createTilemap(
    userId: string,
    tilemap: Partial<Tilemap>
  ): Promise<Tilemap | string> {
    TilemapSchema.findOne(
      { name: tilemap.name },
      function (err: Error, tilemap: TilemapSchemaType) {
        if (tilemap)
          return `tilemap with the name ${tilemap.name} already exists`;
      }
    );

    let user = new UserSchema();
    UserSchema.findOne({ _id: userId }, (err: Error, user: UserSchemaType) => {
      if (err) return err.message;
      user = user;
    });

    const newTilemap = new TilemapSchema({
      backgroundColor: "#FFFFFF",
      collaborators: [],
      collaboratorNames: [],
      collaboratorSettings: { editMode: "free", timeLimit: 0, tileLimit: 0 },
      collaboratorIndex: -1,
      image: "",
      height: tilemap.height === null ? 12 : tilemap.height,
      width: tilemap.width === null ? 12 : tilemap.width,
      layers: [],
      tileHeight: tilemap.tileHeight === null ? -1 : tilemap.tileHeight,
      tileWidth: tilemap.tileWidth === null ? -1 : tilemap.tileWidth,
      nextLayerId: 0,
      nextObjectId: 0,
      orientation: "orthogonal",
      name: tilemap.name,
      owner: user._id,
      tilesets: [],
      properties: [],
      renderOrder: "right-down",
      isPublished: false,
    });

    newTilemap.save().catch((err: Error) => {
      return err.message;
    });

    return {
      id: newTilemap._id.toString(),
      createDate: new Date(newTilemap.createdAt),
      lastSaveDate: new Date(newTilemap.updatedAt),
      backgroundColor: "#FFFFFF",
      collaborators: [],
      collaboratorNames: [],
      collaboratorSettings: { editMode: "free", timeLimit: 0, tileLimit: 0 },
      collaboratorIndex: -1,
      image: "",
      height: newTilemap.height,
      width: newTilemap.width,
      layers: [],
      tileHeight: newTilemap.tileHeight,
      tileWidth: newTilemap.tileWidth,
      nextLayerId: 0,
      nextObjectId: 0,
      orientation: "orthogonal",
      name: newTilemap.name,
      owner: user._id,
      tilesets: [],
      properties: [],
      renderOrder: "right-down",
      isPublished: false,
    };
  }
  async updateTilemapById(
    tilemapId: string,
    tilemap: Partial<Tilemap>
  ): Promise<Tilemap | string> {
    throw new Error("Method not implemented.");
  }
  async deleteTilemapById(tilemapId: string): Promise<string | string> {
    throw new Error("Method not implemented.");
  }
  //   addLayer(tilemapId: string, layer: Partial<Layer>): Promise<[Layer] | string> {
  //     throw new Error("Method not implemented.");
  //   }
  //   updateLayer(
  //     tilemapId: string,
  //     layer: Partial<Layer>,
  //     index: number
  //   ): Promise<[Layer] | string> {
  //     throw new Error("Method not implemented.");
  //   }
  //   removeLayer(tilemapId: string, index: number): Promise<[Layer] | string> {
  //     throw new Error("Method not implemented.");
  //   }
  //   moveLayers(
  //     tilemapId: string,
  //     firstIndex: number,
  //     secondIndex: number
  //   ): Promise<[Layer] | string> {
  //     throw new Error("Method not implemented.");
  //   }
  //   addCollaborator(
  //     tilemapId: string,
  //     collaboratorId: string
  //   ): Promise<{
  //     collaboratorIds: [string];
  //     collaboratorNames: [string];
  //   } | string> {
  //     throw new Error("Method not implemented.");
  //   }
  //   removeCollaborator(
  //     tilemapId: string,
  //     collaboratorsId: string
  //   ): Promise<{
  //     collaboratorIds: [string];
  //     collaboratorNames: [string];
  //   } | string> {
  //     throw new Error("Method not implemented.");
  //   }
  //   updateCollaboratorSettings(
  //     tilemapId: string,
  //     collaboratorSettings: CollaboratorSettings
  //   ): Promise<CollaboratorSettings | string> {
  //     throw new Error("Method not implemented.");
  //   }
  //   updateCollaboratorIndex(
  //     tilemapId: string,
  //     collaboratorIndex: number
  //   ): Promise<number | string> {
  //     throw new Error("Method not implemented.");
  //   }
  //   addProperty(
  //     tilemapId: string,
  //     property: Property
  //   ): Promise<[Property] | string> {
  //     throw new Error("Method not implemented.");
  //   }
  //   removeProperty(tilemapId: string, index: number): Promise<[Property] | string> {
  //     throw new Error("Method not implemented.");
  //   }
  //   updateProperty(
  //     tilemapId: string,
  //     property: Property,
  //     index: number
  //   ): Promise<[Property] | string> {
  //     throw new Error("Method not implemented.");
  //   }
  //   addTileset(tilemapId: string, tilesetId: string): Promise<[string] | string> {
  //     throw new Error("Method not implemented.");
  //   }
  //   removeTileset(tilemapId: string, index: number): Promise<[string] | string> {
  //     throw new Error("Method not implemented.");
  //   }
  addTilemapComment(
    userId: string,
    socialId: string
  ): Promise<TilemapSocialStatistics | string> {
    throw new Error("Method not implemented.");
  }
  toggleLike(
    userId: string,
    socialId: string
  ): Promise<TilemapSocialStatistics | string> {
    throw new Error("Method not implemented.");
  }
  toggleDislike(
    userId: string,
    socialId: string
  ): Promise<TilemapSocialStatistics | string> {
    throw new Error("Method not implemented.");
  }
  addView(
    userId: string,
    socialId: string
  ): Promise<TilemapSocialStatistics | string> {
    throw new Error("Method not implemented.");
  }
  updateTilemapPermissions(
    socialId: string,
    permissions: SocialStatisticsPermissions
  ): Promise<TilemapSocialStatistics | string> {
    throw new Error("Method not implemented.");
  }
}
