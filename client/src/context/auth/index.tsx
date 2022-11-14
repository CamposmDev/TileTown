import { User } from "@types";
import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthStore, AuthState } from "./AuthStore";

const DefaultUser = {
    id: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    imageURL: "",
    tilemaps: [],
    tilesets: [],
    favoriteTileMaps: [],
    favoriteTileSets: [],
    friends: [],
    isVerified: false,
    verifyKey: "",
    joinedCommunities: [],
    joinedContests: []
}

/** 
 * The auth context 
 */
const AuthContext = createContext<AuthStore>(new AuthStore({usr: DefaultUser, loggedIn: false}, () => {}, () => {}));

/**
 * The auth context provider. 
 */
function AuthContextProvider(props: Record<string, any>) {

    // The state of the auth context
    const [auth, setAuth] = useState<AuthState>({usr: DefaultUser, loggedIn: false});

    // The navigation for the auth context???
    const nav = useNavigate();

    // A wrapper around our state - the wrapper has the dispatch functions and the reducer
    const Auth = new AuthStore(auth, setAuth, nav);

    // When the context gets created -> try to log the user in...?
    // TODO
    // useEffect(() => { Auth.getLoggedIn() });

    return (
        <AuthContext.Provider value={Auth}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthContextProvider };
