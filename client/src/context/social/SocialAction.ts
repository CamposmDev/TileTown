import { Community, Contest, User, ForumPost } from "@types"

export type SocialAction =
| GetTilemapByName
| GetTilesetByName
| AddFriend
| RemoveFriend
| Clear

export enum SocialActionType {
    searchUsersByName = 'SEARCH_USERS_BY_NAME',
    getTilesetByName = 'GET_TILESET_BY_NAME',
    getTilemapByName = 'GET_TILEMAP_BY_NAME',
    addFriend = 'ADD_FRIEND',
    removeFriend = 'REMOVE_FRIEND',
    clear = 'CLEAR'
}

export type GetTilesetByName = {
    type: SocialActionType.getTilesetByName
}

export type GetTilemapByName = {
    type: SocialActionType.getTilemapByName
}

export type AddFriend = {
    type: SocialActionType.addFriend
}

export type RemoveFriend = {
    type: SocialActionType.removeFriend
}

export type Clear = {
    type: SocialActionType.clear
}

