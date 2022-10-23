import {
  Tileset,
  TilesetSocialStatistics,
  SocialStatisticsPermissions,
} from "../../../types";
import Comment from "../../../types/Comment";

export default interface TilesetDBM {
  getTilesetById(tilesetId: string): Promise<Tileset | null>;

  createTileset(tileset: Partial<Tileset>): Promise<Tileset | null>;

  updateTilesetById(
    tilesetId: string,
    tileset: Partial<Tileset>
  ): Promise<Tileset | null>;

  deleteTilesetById(tilesetId: string): Promise<Tileset | null>;

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
