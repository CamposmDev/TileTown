export type QueryAction = 
| FindTilemap
| FindTileset
| FindUser
| FindCommunity
| FindContest

export enum QueryActionType {
    findTilemap = 'FIND_TILEMAP',
    findTileset = 'FIND_TILESET',
    findUser = 'FIND_USER',
    findCommunity = 'FIND_COMMUNITY',
    findContest = 'FIND_CONTEST',
    findForumPost = 'FIND_FORUM_POST'
}

export type FindTilemap = {
    type: QueryActionType.findTilemap,
    payload: {
        message: string,
        result: any
    }
}

export type FindTileset = {
    type: QueryActionType.findTileset,
    payload: {
        message: string,
        result: any
    }
}

export type FindUser = {
    type: QueryActionType.findUser,
    payload: {
        message: string,
        result: any
    }
}

export type FindCommunity = {
    type: QueryActionType.findCommunity,
    payload: {
        message: string,
        result: any
    }
}

export type FindContest = {
    type: QueryActionType.findContest,
    payload: {
        message: string,
        result: any
    }
}

export type FindForumPost = {
    type: QueryActionType.findForumPost,
    payload: {
        message: string,
        result: any
    }
}