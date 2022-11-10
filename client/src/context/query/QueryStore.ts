import { NavigateFunction } from "react-router";

export interface QueryState {
    tilemapResult: [],
    tilesetResult: [],
    userResult: [],
    commResult: [],
    contestResult: [],
    forumPostResult: []
}

export class QueryStore {
    private readonly _query: QueryState
    private readonly _setQuery: (query: QueryState) => void
    private readonly nav: NavigateFunction

    constructor(query: QueryState, setQuery: (state: QueryState) => void, nav: NavigateFunction) {
        this._query = query
        this._setQuery = setQuery
        this.nav = nav
    }
}