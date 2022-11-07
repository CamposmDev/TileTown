import { User } from "@types";
import { MsgType } from "./AuthStore";

export type AuthAction = 
| RegisterUser 
| LoginUser 
| LogoutUser
| LoginAsGuest
| ChangeUsername
| ChangePassword
| ChangeEmail
| DisplayErrorModal
| ClearErrorModal
| GetLoggedIn


export enum AuthActionType {
    registerUser = "REGISTER",
    loginUser = "LOGIN_USER",
    logoutUser = "LOGOUT_USER",
    getLoggedIn = "GET_LOGGED_IN",

    loginAsGuest = 'LOGIN_AS_GUEST',

    changeUsername = "CHANGE_USERNAME",
    changePassword = "CHANGE_PASSWORD",
    changeEmail = "CHANGE_EMAIL",

    displayError = "DISPLAY_ERROR",
    clearError = "CLEAR_ERROR"
}

export type GetLoggedIn = {
    type: AuthActionType.getLoggedIn,
    payload: {
        message: string,
        user: User
    }
}

export type RegisterUser = {
    type: AuthActionType.registerUser,
    payload: {
        message: string,
        user: User
    }
}

export type LoginUser = {
    type: AuthActionType.loginUser,
    payload: {
        message: string,
        user: User
    }
}

export type LogoutUser = {
    type: AuthActionType.logoutUser,
    payload: {
        message: string
    }
}

export type LoginAsGuest = {
    type: AuthActionType.loginAsGuest,
    payload: {
        message: string
    }
}

export type ChangeUsername = {
    type: AuthActionType.changeUsername,
    payload: { 
        message: string,
        username: string
    }
}

export type ChangePassword = {
    type: AuthActionType.changePassword,
    payload: {
        message: string
    }
}

export type ChangeEmail = {
    type: AuthActionType.changeEmail,
    payload: {
        message: string,
        email: string
    }
}

export type DisplayErrorModal = {
    type: AuthActionType.displayError,
    payload: {
        messageType: MsgType,
        message: string
    }
}

export type ClearErrorModal = {
    type: AuthActionType.clearError
}



