import { NavigateFunction } from "react-router"
import { User } from "@types"
import { SnackStore } from "src/context/snack/SnackStore"
import { UserApi } from "src/api"
import axios from "axios"

type UserAction = GetUsersByUsername

enum UserActionType {
    getUsersByUsername = 'GET_USERS_BY_USERNAME'
}

type GetUsersByUsername = {
    type: UserActionType.getUsersByUsername,
    payload: {
        users: User[]
    }
}

export interface State {
    users: User[]
}

/**
 * The generally purpose of the user store is to keep track of
 * other searched users.
 */
export class UserStore {
    private readonly _user: State
    private readonly _setUser: (state: State) => void
    private readonly nav: NavigateFunction

    constructor(user: State, setUser: (state: State) => void, nav: NavigateFunction) {
        this._user = user
        this._setUser = setUser
        this.nav = nav
    }

    public get users(): User[] {
        return this._user.users
    }

    public async getUsersByUsername(query: string | undefined, sort?: string, snack?: SnackStore): Promise<void> {
        UserApi.getUsers({ username: query, sort: sort }).then(res => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                this.handleAction({
                    type: UserActionType.getUsersByUsername,
                    payload: {
                        users: res.data.users
                    }
                })
            }
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    protected handleAction(action: UserAction) {
        switch (action.type) {
            case UserActionType.getUsersByUsername: {
                this._setUser({
                    users: action.payload.users
                })
            }
        }
    }
}