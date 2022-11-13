import { useState, createContext } from "react"
import { SocialStore } from "./SocialStore";

const SocialContext = createContext({})

function SocialContextProvider(props: Record<string, any>) {
    const [social, setSocial] = useState({})
    const Social = new SocialStore(social, setSocial)
    return (
        <SocialContext.Provider value={Social}>
            {props.children}
        </SocialContext.Provider>
    )
}

export { SocialContext, SocialContextProvider }