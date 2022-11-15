import { Community, Contest, User } from "@types"

export type SocialAction =
| CreateCommunity
| DeleteCommunity
| CreateContest
| DeleteContest
| GetTilemapByName
| GetTilesetByName
| GetCommunityByName
| GetContestByName
| GetUserByUsername
| AddFriend
| RemoveFriend
| Clear

export enum SocialActionType {
    createCommunity = 'CREATE_COMMUNITY',
    deleteCommunity = 'DELETE_COMMUNITY',
    createContest = 'CREATE_CONTEST',
    deleteContest = 'DELETE_CONTEST',
    getTilesetByName = 'GET_TILESET_BY_NAME',
    getTilemapByName = 'GET_TILEMAP_BY_NAME',
    getCommunityByName = 'GET_COMMUNITY_BY_NAME',
    getContestByName = 'GET_CONTEST_BY_NAME',
    getUserByUsername = 'GET_USER_BY_NAME',
    addFriend = 'ADD_FRIEND',
    removeFriend = 'REMOVE_FRIEND',
    clear = 'CLEAR'
}

export type CreateCommunity = {
    type: SocialActionType.createCommunity
}

export type DeleteCommunity = {
    type: SocialActionType.deleteCommunity
}

export type CreateContest = {
    type: SocialActionType.createContest
}

export type DeleteContest = {
    type: SocialActionType.deleteContest
}

export type GetTilesetByName = {
    type: SocialActionType.getTilesetByName
}

export type GetTilemapByName = {
    type: SocialActionType.getTilemapByName
}

export type GetCommunityByName = {
    type: SocialActionType.getCommunityByName,
    payload: {
        communities: Community[]
    }
}

export type GetContestByName = {
    type: SocialActionType.getContestByName,
    payload: {
        contests: Contest[]
    }
}

export type GetUserByUsername = {
    type: SocialActionType.getUserByUsername,
    payload: {
        users: User[]
    }
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

