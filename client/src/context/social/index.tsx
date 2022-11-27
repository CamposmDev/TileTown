import { useState, createContext } from "react"
import { useNavigate } from "react-router";
import TilesetViewerModal from "src/components/modals/TilesetViewerModal";
import { SocialState, SocialStore } from "./SocialStore";

const SocialContext = createContext<SocialStore>(new SocialStore(
    {
        currentTMS: undefined,
        currentTSS: undefined,
        tilemaps: [],
        tilesets: [],
    }, () => {}, () => {}))

function SocialContextProvider(props: Record<string, any>) {
    const [social, setSocial] = useState<SocialState>(
        {
            currentTMS: undefined,
            currentTSS: undefined,
            tilemaps: [],
            tilesets: [],
        })
    const nav = useNavigate()
    const Social = new SocialStore(social, setSocial, nav)
    return (
        <SocialContext.Provider value={Social}>
            {props.children}
            <TilesetViewerModal/>
        </SocialContext.Provider>
    )
}

export { SocialContext, SocialContextProvider }