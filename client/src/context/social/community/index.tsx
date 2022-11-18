import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import { CommunityState, CommunityStore } from "./CommunityStore";

const CommunityContext = createContext<CommunityStore>(new CommunityStore({
    currentCommunity: undefined,
    communities: []
}, () => {}, () => {}))

function CommunityContextProvider(props: Record<string, any>) {
    const nav = useNavigate()
    const [comm, setComm] = useState<CommunityState>({
        currentCommunity: undefined,
        communities: []
    })
    const Comm = new CommunityStore(comm, setComm, nav)
    return (
        <CommunityContext.Provider value={Comm}>
            {props.children}
        </CommunityContext.Provider>
    )
}

export { CommunityContext, CommunityContextProvider }