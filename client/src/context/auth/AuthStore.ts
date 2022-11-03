import { NavigateFunction } from 'react-router';

/**
 * The type of the AuthStore's state variable. For now it just has some dummy data I used to test if it worked
 */
export interface AuthState {
    username: string;
    email: string;
}

/**
 * The types of actions/events the auth store needs to handle.
 */
export enum AuthActionType {
    SET_LOGGED_IN = "SET_LOGGED_IN",
    REGISTER_USER = "REGISTER",
    LOGIN_USER = "LOGIN_USER",
    LOGOUT_USER = "LOGOUT_USER",
    DISPLAY_ERROR_MESSAGE = "DISPLAY_ERROR_MESSAGE",
    CLEAR_ERROR_MESSAGE = "CLEAR_ERROR_MESSAGE"
}

/**
 * A wrapper class that wraps around our "auth" state. Basically this class is the store. It contains
 * all of the dispatch functions for manipulating the state and the reducer for updating the state.
 */
export class AuthStore {

    private readonly _state: AuthState;
    private readonly setAuth: (auth: AuthState) => void;
    private readonly nav: NavigateFunction;

    constructor(auth: AuthState, setAuth: (state: AuthState) => void, nav: NavigateFunction) {
        this._state = auth;
        this.setAuth = setAuth;
        this.nav = nav;
    }

    public get state(): AuthState { return this._state; }

    public async loginUser(): Promise<void> { 
        this.handleAction(AuthActionType.LOGIN_USER, {});
    }

    public async logoutUser(): Promise<void> { 
        this.handleAction(AuthActionType.LOGOUT_USER, {});
    }

    public async getLoggedIn(): Promise<void> { 
        
    }

    public async registerUser(data: Record<string, any>): Promise<void> { 
        this.handleAction(AuthActionType.REGISTER_USER, {});
    }

    /**
     * This is the reducer function for the auth store. 
     * @param action the type of the action
     * @param payload the data associated with the action
     */
    protected handleAction(action: AuthActionType, payload: Record<string, any>): void {
        switch(action) {
            case AuthActionType.REGISTER_USER: {
                this.handleRegisterUser(payload);
                break;
            }
            case AuthActionType.LOGIN_USER: {
                this.handleLoginUser(payload);
                break;
            }
            case AuthActionType.LOGOUT_USER: {
                this.handleLogoutUser(payload);
                break;
            }
            case AuthActionType.SET_LOGGED_IN: {
                this.handleSetLogin(payload);
                break;
            }
            default: { 
                throw new Error(`Unhandled action with type ${action} caught in auth reducer`);
            }
        }
    }

    protected handleRegisterUser(payload: Record<string, any>): void {
        this.setAuth({
            email: "peter.t.walsh@stonybrook.edu",
            username: "peteylumpkins"
        });
    }

    protected handleLoginUser(payload: Record<string, any>): void {
        this.setAuth({
            email: "peteylumpkins@gmail.com", 
            username: "peter"
        });
    }

    protected handleLogoutUser(payload: Record<string, any>): void {
        this.setAuth({
            email: "dummy@example.com", 
            username: "dummy user name or something?"
        });
    }

    protected handleSetLogin(payload: Record<string, any>): void {}
}