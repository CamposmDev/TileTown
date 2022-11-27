import { createContext, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router"

interface State {
    viewUnpublishedTilesets: boolean
}

class StateStore {
    private readonly _state: State
    private readonly _setState: (state: State) => void
    private readonly nav: NavigateFunction
    constructor(state: State, setState: (state: State) => void, nav: NavigateFunction) {
        this._state = state
        this._setState = setState
        this.nav = nav
    }

    public get state(): State {
        return this._state
    }

    public viewUnpublishedTilesets(userId: string | undefined): void {
        this.nav(`/profile/${userId}`)
        this._setState({
            viewUnpublishedTilesets: true
        })
    }

    public viewPublishedTilesets(userId: string | undefined): void {
        this.nav(`/profile/${userId}`)
        this._setState({
            viewUnpublishedTilesets: false
        })
    }
}

const ProfileContext = createContext<StateStore>(new StateStore({viewUnpublishedTilesets: false}, () => {}, () => {}))

function ProfileContextProvider(props: Record<string, any>) {
    const [state, setState] = useState<State>({viewUnpublishedTilesets: false})
    const nav = useNavigate()
    const stateStore = new StateStore(state, setState, nav)
    return (
        <ProfileContext.Provider value={stateStore}>
            {props.children}
        </ProfileContext.Provider>
    )
}

export {ProfileContext, ProfileContextProvider}