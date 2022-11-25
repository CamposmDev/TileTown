import { useState, createContext } from "react"
import TilesetViewerModal from "src/components/modals/TIlesetViewerModal";
import { SocialState, SocialStore } from "./SocialStore";

const SocialContext = createContext<SocialStore>(new SocialStore(
    {
        currentTMS: undefined,
        currentTSS: undefined,
        tilemaps: [],
        tilesets: [],
    }, () => {}))

function SocialContextProvider(props: Record<string, any>) {
    const [social, setSocial] = useState<SocialState>(
        {
            currentTMS: undefined,
            currentTSS: undefined,
            tilemaps: [],
            tilesets: [],
        })
    const Social = new SocialStore(social, setSocial)
    return (
        <SocialContext.Provider value={Social}>
            {props.children}
            <TilesetViewerModal/>
        </SocialContext.Provider>
    )
}

export { SocialContext, SocialContextProvider }