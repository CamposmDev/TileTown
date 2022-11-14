import { useState, createContext } from "react"
import { SocialState, SocialStore } from "./SocialStore";

const SocialContext = createContext<SocialStore>(new SocialStore(
    {
        currentUser: undefined,
        tilemaps: [],
        tilesets: [],
        users: [],
        communities: [],
        contests: [],
        forumPosts: []
    }, () => {}))

function SocialContextProvider(props: Record<string, any>) {
    const [social, setSocial] = useState<SocialState>(
        {
            currentUser: undefined,
            tilemaps: [],
            tilesets: [],
            users: [],
            communities: [],
            contests: [],
            forumPosts: []
        })
    const Social = new SocialStore(social, setSocial)
    return (
        <SocialContext.Provider value={Social}>
            {props.children}
        </SocialContext.Provider>
    )
}

export { SocialContext, SocialContextProvider }