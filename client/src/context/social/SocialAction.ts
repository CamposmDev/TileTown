export type SocialAction =
| CreateCommunity
| DeleteCommunity
| CreateContest
| DeleteContest
| SearchCommunityByName
| SearchContestsByName
| SearchUsersByName
| AddFriend
| RemoveFriend

export enum SocialActionType {
    createCommunity = 'CREATE_COMMUNITY',
    deleteCommunity = 'DELETE_COMMUNITY',
    createContest = 'CREATE_CONTEST',
    deleteContest = 'DELETE_CONTEST',
    searchCommunityByName = 'SEARCH_COMMUNITY_BY_NAME',
    searchContestsByName = 'SEARCH_CONTESTS_BY_NAME',
    searchUsersByName = 'SEARCH_USERS_BY_NAME',
    addFriend = 'ADD_FRIEND',
    removeFriend = 'REMOVE_FRIEND'
}

export type CreateCommunity = {
    type: SocialActionType.createCommunity
}

export type DeleteCommunity = {
    type: SocialActionType.deleteCommunity
}

export type CreateContest = {
    type: SocialActionType.searchCommunityByName
}

export type DeleteContest = {
    type: SocialActionType.deleteContest
}

export type SearchCommunityByName = {
    type: SocialActionType.searchCommunityByName
}

export type SearchContestsByName = {
    type: SocialActionType.searchContestsByName
}

export type SearchUsersByName = {
    type: SocialActionType.searchUsersByName
}

export type AddFriend = {
    type: SocialActionType.addFriend
}

export type RemoveFriend = {
    type: SocialActionType.removeFriend
}

