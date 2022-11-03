import { TilemapSocial } from "@types";

export default interface TilemapSocialDBM {

    getTilemapSocialByTilesetId(tilesetId: string): Promise<TilemapSocial | null>;

    getTilemapSocialById(socialId: string): Promise<TilemapSocial | null>

    createTilemapSocial(tilemapId: string, partial: Partial<TilemapSocial>): Promise<TilemapSocial | null>;

    updateTilemapSocial(tilemapId: string, partial: Partial<TilemapSocial>): Promise<TilemapSocial | null>;

}