import { AlertColor, snackbarClasses } from '@mui/material';
import { User } from '@types';
import axios from 'axios';
import { NavigateFunction } from 'react-router';
import { UserApi } from "../../api/";
import { SnackStore } from '../snack/SnackStore';

import { 
    AuthActionType, AuthAction, RegisterUser, LoginUser, 
    LogoutUser, ChangeUsername, ChangePassword, ChangeEmail,
    GetLoggedIn, LoginAsGuest, AddFriend, RemoveFriend
} from "./AuthAction"; 

/**
 * The type of the AuthStore's state variable. For now it just has some dummy data I used to test if it worked
 */
export interface AuthState {
    usr: User | null,
    loggedIn: boolean
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

    public isLoggedIn(): boolean {
        return this._auth.loggedIn
    }

    public isGuest(): boolean {
        return (this._auth.usr === null) && (this._auth.loggedIn)
    }

    public getUsr(): User | null {
        return this._auth.usr
    }

    public addFriend(userId: string) {
        this.handleAction({
            type: AuthActionType.addFriend,
            payload: {
                userId: userId
            }
        })
    }

    public removeFriend(userId: string) {
        this.handleAction({
            type: AuthActionType.removeFriend,
            payload: {
                userId: userId
            }
        })
        // let usr = this.getUsr()
        // if (usr && usr.friends) {
        //     let i = usr.friends.indexOf(userId)
        //     if (i >= 0) {
        //         let friends = usr.friends.splice(i, 1)
        //         if (this._auth.usr !== null) {
        //             this._setAuth({
        //                 usr: {...this._auth.usr, friends: friends}, 
        //                 loggedIn: this._auth.loggedIn
        //             })
        //         }
               
        //     }
        // }
    }

    public async loginUser(email: string | undefined, password: string | undefined, snack?: SnackStore): Promise<void> { 
        let res = UserApi.login({email: email, password: password});
        res.then((res) => {
            if (res.status === 200 && res.data.user) {
                this.nav('/home')
                this.handleAction({
                    type: AuthActionType.loginUser,
                    payload: {
                        user: res.data.user,
                        message: res.data.message
                    }
                })
                if (snack) snack.showSuccessMessage(res.data.message)
            }
        }).catch(e => {
            if (e.response.status) {
                snack?.showErrorMessage(e.response.data.message)
                // this.handleAction({
                //     type: AuthActionType.displayError,
                //     payload: {
                //         messageType: MsgType.error,
                //         message: e.response.data.message
                //     }
                // })
                // if (snack) snack.showErrorMessage(e.response.data.message)
            }
        })
    }

    public async logoutUser(snack?: SnackStore): Promise<void> {
        if (this.isGuest()) {
            this.nav('/')
            this.handleAction({
                type: AuthActionType.logoutUser
            })
            if (snack) snack.showSuccessMessage('Guest successfully logged out!')
            return
        }
        let res = UserApi.logout();
        res.then((res) => {
            if (res.status === 200) {
                this.nav('/')
                this.handleAction({
                    type: AuthActionType.logoutUser
                })
                if (snack) snack.showSuccessMessage(res.data.message)
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
                        user: res.data.user,
                        message: res.data.message
                    }
                });
            }
        })
    }

    public async registerUser(data: {firstName: string | undefined, lastName: string | undefined, username: string | undefined, password: string | undefined, email: string | undefined}, snack?: SnackStore): Promise<void> { 
        let res = UserApi.register(data);
        res.then((res) => {
            if (res.status === 201 && res.data.user) {
                this.nav('/home')
                this.handleAction({
                    type: AuthActionType.registerUser,
                    payload: {
                        user: res.data.user
                    }
                });
                if (snack) snack.showSuccessMessage(res.data.message)
            }
        }).catch(e => {
            if (axios.isAxiosError(e)) {
                if (e.response) {
                    if (snack) snack.showErrorMessage(e.response.data.message)
                }
            }
        })
    }

    public async loginAsGuest(snack?: SnackStore): Promise<void> {
        this.nav('/home')
        this.handleAction({
            type: AuthActionType.loginAsGuest
        })
        if (snack) snack.showSuccessMessage('Guest successfully logged in!')
    }

    public async changeUsername(username: string | undefined, snack?: SnackStore): Promise<void> {
        let res = UserApi.updateUsername({
            username: username
        })
        res.then((res) => {
            if (res.status === 200 && res.data) {
                this.handleAction({
                    type: AuthActionType.changeUsername,
                    payload: {
                        username: res.data.username
                    }
                })
                snack?.showSuccessMessage(res.data.message)
            }
        }).catch(e => {
            if (axios.isAxiosError(e)) {
                if (e.response && e.response.status === 400) {
                    snack?.showErrorMessage(e.response.data.message)
                    // this.handleAction({
                    //     type: AuthActionType.displayError,
                    //     payload: {
                    //         messageType: MsgType.error,
                    //         message: e.response.data.message
                    //     }
                    // })
                }
            }
        })
    }

    public async changeEmail(email: string | undefined, snack?: SnackStore): Promise<void> {
        let res = UserApi.updateEmail({
            email: email
        })
        res.then((res) => {
            if (res.status === 200 && res.data) {
                this.handleAction({
                    type: AuthActionType.changeEmail,
                    payload: {
                        email: res.data.email
                    }
                })
                snack?.showSuccessMessage(res.data.message)
            }
        }).catch(e => {
            if (axios.isAxiosError(e)) {
                if (e.response && e.response.status === 400) {
                    snack?.showErrorMessage(e.response.data.message)
                    // this.handleAction({
                    //     type: AuthActionType.displayError,
                    //     payload: {
                    //         messageType: MsgType.error,
                    //         message: e.response.data.message
                    //     }
                    // })
                }
            }
        })
    }

    public async changePassword(oldPassword: string | undefined, newPassword: string | undefined, snack?: SnackStore): Promise<void> {
        let res = UserApi.updatePassword({
            oldPassword: oldPassword,
            newPassword: newPassword,
        })
        res.then((res) => {
            if (res.status === 200 && res.data) {
                // this.handleAction({
                //     type: AuthActionType.changePassword,
                //     payload: {
                //         message: res.data.message
                //     }
                // })
                snack?.showSuccessMessage(res.data.message)
            }
        }).catch(e => {
            if (axios.isAxiosError(e)) {
                if (e.response && e.response.status === 400) {
                    snack?.showErrorMessage(e.response.data.message)
                    // this.handleAction({
                    //     type: AuthActionType.displayError,
                    //     payload: {
                    //         messageType: MsgType.error,
                    //         message: e.response.data.message
                    //     }
                    // })
                }
            }
        })
    }

    public async deleteAccount(snack?: SnackStore): Promise<void> {
        let res = UserApi.delete()
        res.then((res) => {
            if (res.status === 200 && res.data) {
                this.nav('/')
                this.handleAction({
                    type: AuthActionType.logoutUser
                })
                snack?.showSuccessMessage(res.data.message)
            }
        }).catch(e => {
            if (axios.isAxiosError(e)) {
                if (e.response && e.response.status) {
                    snack?.showErrorMessage(e.response.data.message)
                }
            }
        })
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
            case AuthActionType.loginAsGuest: {
                this.handleLoginAsGuest(action)
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
            case AuthActionType.addFriend: {
                this.handleAddFriend(action)
                break
            }
            case AuthActionType.removeFriend: {
                this.handleRemoveFriend(action)
                break
            }
            default: { 
                throw new Error(`Unhandled action with type ${action} caught in auth reducer`);
            }
        }
    }

    protected handleGetLoggedIn(action: GetLoggedIn): void {
        this._setAuth({
            usr: action.payload.user,
            loggedIn: true
        });
    }
    protected handleRegisterUser(action: RegisterUser): void {
        this.setAuth({
            usr: action.payload.user,
            loggedIn: true
        });
    }
    protected handleLoginUser(action: LoginUser): void {
        this.setAuth({
            usr: action.payload.user,
            loggedIn: true
        })
    }
    protected handleLogoutUser(action: LogoutUser): void {
        this.setAuth({
            usr: null, 
            loggedIn: false
        });
    }
    protected handleLoginAsGuest(action: LoginAsGuest): void {
        this.setAuth({
            usr: null,
            loggedIn: true
        })
    }
    protected handleChangePassword(action: ChangePassword): void {
        this.setAuth({
            usr: this._auth.usr, 
            loggedIn: this._auth.loggedIn
        });
    };
    protected handleChangeUsername(action: ChangeUsername): void {
        if (this._auth.usr !== null) {
            this.setAuth({
                usr: {...this._auth.usr, username: action.payload.username}, 
                loggedIn: this._auth.loggedIn
            });
        }
    };
    protected handleChangeEmail(action: ChangeEmail): void {
        if (this._auth.usr !== null) {
            this._setAuth({
                usr: {...this._auth.usr, email: action.payload.email},
                loggedIn: this._auth.loggedIn
            });
        }
    };
    protected handleAddFriend(action: AddFriend): void {
        if (this._auth.usr !== null) {
            this._auth.usr.friends.push(action.payload.userId)
            this._setAuth({
                usr: {...this._auth.usr, friends: this._auth.usr.friends},
                loggedIn: this._auth.loggedIn
            })
        }
    }
    protected handleRemoveFriend(action: RemoveFriend): void {
        if (this._auth.usr !== null) {
            this._setAuth({
                usr: {...this._auth.usr, friends: this._auth.usr.friends.filter(x => x.localeCompare(action.payload.userId) !== 0)},
                loggedIn: this._auth.loggedIn
            })
        }
    }
}