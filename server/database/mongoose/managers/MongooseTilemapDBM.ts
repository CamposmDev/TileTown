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

export default class MongooseTilemapDBM implements TilemapDBM {
  async getTilemapById(tilemapId: string): Promise<Tilemap | null> {
    await TilemapSchema.findById(tilemapId, function (err: any, tileMap: any) {
      if (err) return null;
      return null;
    });
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
  addTilemapComment(
    userId: string,
    socialId: string
  ): Promise<TilemapSocialStatistics | null> {
    throw new Error("Method not implemented.");
  }
  toggleLike(
    userId: string,
    socialId: string
  ): Promise<TilemapSocialStatistics | null> {
    throw new Error("Method not implemented.");
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
