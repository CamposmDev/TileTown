import { Community, Contest, User, ForumPost, Tileset, Tilemap, TilesetSocial, TilemapSocial } from "@types"

export type SocialAction =
| SetCurrentTMS
| SetCurrentTSS
| GetTilemapsByName
| GetTilesetsByName
| Clear

export enum SocialActionType {
    setCurrentTMS = 'SET_CURRENT_TMS',
    setCurrentTSS = 'SET_CURRENT_TSS',
    getTilesetsByName = 'GET_TILESET_BY_NAME',
    getTilemapsByName = 'GET_TILEMAP_BY_NAME',
    addFriend = 'ADD_FRIEND',
    removeFriend = 'REMOVE_FRIEND',
    clear = 'CLEAR'
}

export type SetCurrentTMS = {
    type: SocialActionType.setCurrentTMS,
    payload: {
        newTMS: TilemapSocial,
        oldTMS: TilemapSocial | undefined
    }
}

export type SetCurrentTSS = {
    type: SocialActionType.setCurrentTSS,
    payload: {
        newTSS: TilesetSocial,
        oldTSS: TilesetSocial | undefined
    }
}

export type GetTilemapsByName = {
    type: SocialActionType.getTilemapsByName,
    payload: {
        tilemaps: TilemapSocial[]
    }
}

export type GetTilesetsByName = {
    type: SocialActionType.getTilesetsByName,
    payload: {
        tilesets: TilesetSocial[]
    }
}

export type Clear = {
    type: SocialActionType.clear
}

