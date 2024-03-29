import { useState, createContext } from "react"
import { useNavigate } from "react-router";
import TilemapViewerModal from "../../components/modals/TilemapViewerModal";
import TilesetViewerModal from "../../components/modals/TIlesetViewerModal";
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
            <TilemapViewerModal/>
            <TilesetViewerModal/>
        </SocialContext.Provider>
    )
}

export { SocialContext, SocialContextProvider }