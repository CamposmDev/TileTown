import { TilesetSocial } from "@types";

export default interface TilesetSocialDBM {

    getTilesetSocialsByUserId(userId: string): Promise<TilesetSocial[]>;

    getTilesetSocialByTilesetId(tilesetId: string): Promise<TilesetSocial | null>;

    getTilesetSocialById(socialId: string): Promise<TilesetSocial | null>

    createTilesetSocial(tilesetId: string, partial: Partial<TilesetSocial>): Promise<TilesetSocial | null>;

    updateTilesetSocial(tilesetId: string, partial: Partial<TilesetSocial>): Promise<TilesetSocial | null>;

}