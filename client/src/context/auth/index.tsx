import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthStore, AuthState } from "./AuthStore";


/** 
 * The auth context 
 */
const AuthContext = createContext<AuthStore>(new AuthStore({email: "", username: ""}, () => {}, () => {}))

/**
 * The auth context provider. 
 */
function AuthContextProvider(props: Record<string, any>) {

    // The state of the auth context
    const [auth, setAuth] = useState<AuthState>({email: "", username: ""});

    // The navigation for the auth context???
    const nav = useNavigate();

    // A wrapper around our state - the wrapper has the dispatch functions and the reducer
    const Auth = new AuthStore(auth, setAuth, nav);

    // When the context gets created -> try to log the user in...?
    useEffect(() => { Auth.getLoggedIn() });

    return (
        <AuthContext.Provider value={Auth}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthContextProvider };
