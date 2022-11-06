import { TilemapSocial, TilemapSocialQuery } from "@types";

export default interface TilemapSocialDBM {

    getTilemapSocialByTilemapId(tilesetId: string): Promise<TilemapSocial | null>;

    getTilemapSocialById(socialId: string): Promise<TilemapSocial | null>

    createTilemapSocial(tilemapId: string, partial: Partial<TilemapSocial>): Promise<TilemapSocial | null>;

    updateTilemapSocial(tilemapId: string, partial: Partial<TilemapSocial>): Promise<TilemapSocial | null>;

    getTilemapSocials(query: TilemapSocialQuery): Promise<TilemapSocial[]>
    
}