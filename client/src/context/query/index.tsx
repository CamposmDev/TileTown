import { createContext, useState } from "react"
import { useNavigate } from "react-router"
import { QueryState, QueryStore } from "./QueryStore"

const DefaultQuery = {
    tilemapResult: [],
    tilesetResult: [],
    userResult: [],
    commResult: [],
    contestResult: [],
    forumPostResult: []
}

const QueryContext = createContext<QueryStore>(new QueryStore({
    tilemapResult: [],
    tilesetResult: [],
    userResult: [],
    commResult: [],
    contestResult: [],
    forumPostResult: []
}, () => {}, () => {}))

/**
 * @deprecated
 * @param props 
 * @returns 
 */
function QueryContextProvider(props: Record<string, any>) {
    const [query, setQuery] = useState<QueryState>({
        tilemapResult: [],
        tilesetResult: [],
        userResult: [],
        commResult: [],
        contestResult: [],
        forumPostResult: []
    })
    const nav = useNavigate()
    const Query = new QueryStore(query, setQuery, nav)
    return (
        <QueryContext.Provider value={Query}>
            {props.children}
        </QueryContext.Provider>
    )
}

export {QueryContext, QueryContextProvider}