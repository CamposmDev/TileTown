import { useState, createContext } from "react"
import { SocialState, SocialStore } from "./SocialStore";

const SocialContext = createContext<SocialStore>(new SocialStore(
    {
        tilemaps: [],
        tilesets: [],
    }, () => {}))

function SocialContextProvider(props: Record<string, any>) {
    const [social, setSocial] = useState<SocialState>(
        {
            tilemaps: [],
            tilesets: [],
        })
    const Social = new SocialStore(social, setSocial)
    return (
        <SocialContext.Provider value={Social}>
            {props.children}
        </SocialContext.Provider>
    )
}

export { SocialContext, SocialContextProvider }