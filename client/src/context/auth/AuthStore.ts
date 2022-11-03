import { User } from '@types';
import { NavigateFunction } from 'react-router';
import { UserApi } from "../../api/";

import { 
    AuthActionType, AuthAction, RegisterUser, LoginUser, 
    LogoutUser, ChangeUsername, ChangePassword, ChangeEmail,
    DisplayErrorModal, ClearErrorModal, GetLoggedIn
} from "./AuthAction"; 

/**
 * The type of the AuthStore's state variable. For now it just has some dummy data I used to test if it worked
 */
export interface AuthState {
    usr: User | null,
    loggedIn: boolean,
    msg: string | null
}

/**
 * A wrapper class that wraps around our "auth" state. Basically this class is the store. It contains
 * all of the dispatch functions for manipulating the state and the reducer for updating the state.
 */
export class AuthStore {

    private readonly _auth: AuthState;
    private readonly _setAuth: (auth: AuthState) => void;
    private readonly nav: NavigateFunction;

    constructor(auth: AuthState, setAuth: (state: AuthState) => void, nav: NavigateFunction) {
        this._auth = auth;
        this._setAuth = setAuth;
        this.nav = nav;
    }

    public get auth(): AuthState { return this._auth; }
    public get setAuth(): (auth: AuthState) => void { return this._setAuth; }

    public async loginUser(email: string, password: string): Promise<void> { 
        let res = UserApi.login({email: email, password: password});
        res.then((res) => {
            if (res.status === 200 && res.data.user) {
                this.handleAction({
                    type: AuthActionType.loginUser,
                    payload: {
                        user: res.data.user,
                        message: res.data.message
                    }
                })
            }
        });
    }
    public async logoutUser(): Promise<void> { 
        let res = UserApi.logout();
        res.then((res) => {
            if (res.status === 200) {
                this.handleAction({
                    type: AuthActionType.logoutUser,
                    payload: {
                        message: res.data.message
                    }
                })
            }
        });
    }

    public async getLoggedIn(): Promise<void> { 
        let res = UserApi.getLoggedIn()
        res.then((res) => {
            if (res.status === 200 && res.data.user) {
                this.handleAction({
                    type: AuthActionType.getLoggedIn,
                    payload: {
                        message: res.data.message,
                        user: res.data.user
                    }
                });
            }
        })
    }

    public async registerUser(data: {firstName: string, lastName: string, username: string, password: string, email: string}): Promise<void> { 
        let res = UserApi.register(data);
        res.then((res) => {
            if (res.status === 200 && res.data.user) {
                this.handleAction({
                    type: AuthActionType.registerUser,
                    payload: { 
                        user: res.data.user,
                        message: res.data.message
                    }
                });
            }
        });
    }

    /**
     * This is the reducer function for the auth store. 
     * @param action the type of the action
     * @param payload the data associated with the action
     */
    protected handleAction(action: AuthAction): void {
        switch(action.type) {
            case AuthActionType.getLoggedIn: {
                this.handleGetLoggedIn(action);
                break;
            }
            case AuthActionType.registerUser: {
                this.handleRegisterUser(action);
                break;
            }
            case AuthActionType.loginUser: {
                this.handleLoginUser(action);
                break;
            }
            case AuthActionType.logoutUser: {
                this.handleLogoutUser(action);
                break;
            }
            case AuthActionType.changePassword: {
                this.handleChangePassword(action);
                break;
            }
            case AuthActionType.changeUsername: {
                this.handleChangeUsername(action);
                break;
            }
            case AuthActionType.changeEmail: {
                this.handleChangeEmail(action);
                break;
            }
            default: { 
                throw new Error(`Unhandled action with type ${action} caught in auth reducer`);
            }
        }
    }

    protected handleGetLoggedIn(action: GetLoggedIn): void {
        this._setAuth({
            msg: action.payload.message,
            usr: action.payload.user,
            loggedIn: true
        });
    }
    protected handleRegisterUser(action: RegisterUser): void {
        this.setAuth({
            usr: null,
            msg: action.payload.message,
            loggedIn: this._auth.loggedIn,
        });
    }
    protected handleLoginUser(action: LoginUser): void {
        this.setAuth({
            usr: action.payload.user,
            msg: action.payload.message,
            loggedIn: true
        })
    }
    protected handleLogoutUser(action: LogoutUser): void {
        this.setAuth({
            usr: null, 
            msg: action.payload.message,
            loggedIn: false
        });
    }
    protected handleChangePassword(action: ChangePassword): void {
        this.setAuth({
            usr: this._auth.usr, 
            msg: action.payload.message,
            loggedIn: this._auth.loggedIn
        });
    };
    protected handleChangeUsername(action: ChangeUsername): void {
        if (this._auth.usr !== null) {
            this.setAuth({
                usr: {...this._auth.usr, username: action.payload.username}, 
                msg: action.payload.message,
                loggedIn: this._auth.loggedIn
            });
        }
    };
    protected handleChangeEmail(action: ChangeEmail): void {
        if (this._auth.usr !== null) {
            this._setAuth({
                usr: {...this._auth.usr, email: action.payload.email},
                msg: action.payload.message,
                loggedIn: this._auth.loggedIn
            });
        }
    };
}