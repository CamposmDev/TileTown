import Community from "../../../../../@types/Community"

export type CommunityAction =
| CreateCommunity
| GetCommunities
| ViewCommunity
| DeleteCommunity

export enum CommunityActionType {
    createCommunity = 'CREATE_COMMUNITY',
    getCommunities = 'GET_COMMUNITIES',
    viewCommunity = 'VIEW_COMMUNITY',
    deleteCommunity = 'DELETE_COMMUNITY'
}

export type CreateCommunity = {
    type: CommunityActionType.createCommunity,
    payload: {
        currentCommunity: Community
    }
}

export type GetCommunities = {
    type: CommunityActionType.getCommunities,
    payload: {
        communities: Community[]
    }
}

export type ViewCommunity = {
    type: CommunityActionType.viewCommunity,
    payload: {
        currentCommunity: Community
    }
}

export type DeleteCommunity = {
    type: CommunityActionType.deleteCommunity,
    payload: {
        deletedCommunity: Community
    }
}