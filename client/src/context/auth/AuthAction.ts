import { User } from "@types";

export type AuthAction = 
| RegisterUser 
| LoginUser 
| LogoutUser 
| ChangeUsername
| ChangePassword
| ChangeEmail
| DisplayErrorModal
| ClearErrorModal


export enum AuthActionType {
    registerUser = "REGISTER",
    loginUser = "LOGIN_USER",
    logoutUser = "LOGOUT_USER",

    changeUsername = "CHANGE_USERNAME",
    changePassword = "CHANGE_PASSWORD",
    changeEmail = "CHANGE_EMAIL",

    displayError = "DISPLAY_ERROR",
    clearError = "CLEAR_ERROR"
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
        message: string
    }
}

export type ClearErrorModal = {
    type: AuthActionType.clearError,
    payload: {
        message: string
    }
}



