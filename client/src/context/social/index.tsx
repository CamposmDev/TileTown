import { useState, createContext, useContext } from "react"
import { AuthContext } from "../auth";
import { AuthStore } from "../auth/AuthStore";
import { SocialState, SocialStore } from "./SocialStore";

const SocialContext = createContext<SocialStore>(new SocialStore(
    {
        currentUser: undefined,
        tilemaps: [],
        tilesets: [],
        users: [],
        communities: [],
        contests: [],
    }, () => {}, new AuthStore({loggedIn: false, usr: null}, () => {}, () => {})))

function SocialContextProvider(props: Record<string, any>) {
    const auth = useContext(AuthContext)
    const [social, setSocial] = useState<SocialState>(
        {
            currentUser: undefined,
            tilemaps: [],
            tilesets: [],
            users: [],
            communities: [],
            contests: [],
        })
    const Social = new SocialStore(social, setSocial, auth)
    return (
        <SocialContext.Provider value={Social}>
            {props.children}
        </SocialContext.Provider>
    )
}

export { SocialContext, SocialContextProvider }