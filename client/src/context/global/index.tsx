import { createContext, useContext, useState } from "react"
import DeleteCommunityModal from "src/components/modals/DeleteCommunityModal"
import { AuthContext } from "../auth"
import { AuthStore } from "../auth/AuthStore"
import { SocialContext } from "../social"
import { SocialStore } from "../social/SocialStore"

interface GlobalState {
    auth: AuthStore | undefined
    social: SocialStore | undefined
}

class GlobalStore {
    private readonly _global: GlobalState
    private readonly _setGlobal: (global: GlobalState) => void
    constructor(global: GlobalState, setGlobal: (global: GlobalState) => void) {
        this._global = global
        this._setGlobal = setGlobal
    }

    public async deleteCommunity(commId: string) {
        this._global.auth?.deleteCommunity(commId)
        this._global.social?.deleteCommunityById(commId)
    }
}

const GlobalContext = createContext<GlobalStore>(
    new GlobalStore({auth: undefined, social: undefined}, () => {}))

function GlobalContextProvider(props: Record<string, any>) {
    const auth = useContext(AuthContext)
    const social = useContext(SocialContext)
    const [global, setGlobal] = useState<GlobalState>(
        {
            auth: auth,
            social: social
        })
    const Global = new GlobalStore(global, setGlobal)
    return (
        <GlobalContext.Provider value={Global}>
            {props.children}
        </GlobalContext.Provider>
    )
}