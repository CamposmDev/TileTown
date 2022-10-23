import {
  Tileset,
  TilesetSocialStatistics,
  SocialStatisticsPermissions,
  SortBy,
} from "../../../types";
import Comment from "../../../types/Comment";

export default interface TilesetDBM {
  getTilesetById(tilesetId: string): Promise<Tileset | string>;

  createTileset(
    userId: string,
    tileset: Partial<Tileset>
  ): Promise<Tileset | string>;

  updateTilesetById(
    tilesetId: string,
    tileset: Partial<Tileset>
  ): Promise<Tileset | string>;

  deleteTilesetById(tilesetId: string): Promise<Partial<Tileset> | string>;

  getTilesetPartials(
    userId: string,
    search: string,
    sortBy: SortBy
  ): Promise<[Partial<Tileset>] | string>;

  addTilesetComment(
    payload: Comment
  ): Promise<TilesetSocialStatistics | null>;

  toggleLike(
    userId: string,
    socialId: string
  ): Promise<TilesetSocialStatistics | null>;

  toggleDislike(
    userId: string,
    socialId: string
  ): Promise<TilesetSocialStatistics | null>;

  addView(
    userId: string,
    socialId: string
  ): Promise<TilesetSocialStatistics | null>;

  updateTilesetPermissions(
    socialId: string,
    permissions: SocialStatisticsPermissions
  ): Promise<TilesetSocialStatistics | null>;
}
