import { User } from "@types";

export type AuthAction = 
| RegisterUser 
| LoginUser 
| LogoutUser
| LoginAsGuest
| ChangeUsername
| ChangePassword
| ChangeEmail
| AddCommunity
| DeleteCommunity
| GetLoggedIn
| AddFriend
| RemoveFriend


export enum AuthActionType {
    registerUser = "REGISTER",
    loginUser = "LOGIN_USER",
    logoutUser = "LOGOUT_USER",
    getLoggedIn = "GET_LOGGED_IN",

    loginAsGuest = 'LOGIN_AS_GUEST',

    changeUsername = "CHANGE_USERNAME",
    changePassword = "CHANGE_PASSWORD",
    changeEmail = "CHANGE_EMAIL",

    addCommunity = 'ADD_COMMUNITY',
    deleteCommunity = "DELETE_COMMUNITY",

    addFriend = 'ADD_FRIEND',
    removeFriend = 'REMOVE_FRIEND'
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

export type AddCommunity = {
    type: AuthActionType.addCommunity,
    payload: {
        communityId: string
    }
}

export type DeleteCommunity = {
    type: AuthActionType.deleteCommunity,
    payload: {
        communityId: string
    }
}

export type AddFriend = {
    type: AuthActionType.addFriend,
    payload: {
        userId: string
    }
}

export type RemoveFriend = {
    type: AuthActionType.removeFriend,
    payload: {
        userId: string
    }
}



