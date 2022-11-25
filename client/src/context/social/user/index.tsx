import { createContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { State, UserStore } from './UserStore'

const UserContext = createContext<UserStore>(new UserStore({
    users: []
}, () => {}, () => {}))

function UserContextProvider(props: Record<string, any>) {
    const [state, setState] = useState<State>({users: []})
    const nav = useNavigate()
    const store = new UserStore(state, setState, nav)
    return (
        <UserContext.Provider value={store}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider }