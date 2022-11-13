import { User } from "@types";

export type AuthAction = 
| RegisterUser 
| LoginUser 
| LogoutUser
| LoginAsGuest
| ChangeUsername
| ChangePassword
| ChangeEmail
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
    type: AuthActionType.logoutUser
}

export type LoginAsGuest = {
    type: AuthActionType.loginAsGuest
}

export type ChangeUsername = {
    type: AuthActionType.changeUsername,
    payload: { 
        username: string
    }
}

export type ChangePassword = {
    type: AuthActionType.changePassword,
}

export type ChangeEmail = {
    type: AuthActionType.changeEmail,
    payload: {
        email: string
    }
}



