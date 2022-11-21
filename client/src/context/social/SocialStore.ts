import axios from "axios"
import { CommentApi, CommunityApi, ContestApi, MediaApi, TilesetApi, UserApi } from "src/api"
import { Comment, Community, Contest, Tilemap, TilemapSocial, Tileset, TilesetSocial, User } from "@types"
import { SnackStore } from "../snack/SnackStore"
import { SocialAction, SocialActionType } from "./SocialAction"
import { AuthStore } from "../auth/AuthStore"
import { Iron } from "@mui/icons-material"

export interface SocialState {
    currentUser: User | undefined
    tilesets: TilesetSocial[]
    tilemaps: TilemapSocial[]
    users: User[]
}

export class SocialStore {
    private readonly _social: SocialState
    private readonly _setSocial: (social: SocialState) => void

    constructor(social: SocialState, setSocial: (social: SocialState) => void) {
        this._social = social
        this._setSocial = setSocial
    }

    public getUsers(): User[] {
        return this._social.users
    }

    public async createContest(name: string, description: string, endDate: Date, snack?: SnackStore): Promise<void> {
        let res = ContestApi.createContest({
            contest: {
                name: name,
                description: description,
                isPublished: true,
                endDate: endDate
            }
        })
        res.then((res) => {
            if (res.status === 201) snack?.showSuccessMessage(res.data.message)
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    public async getUserByUsername(query: string | undefined, snack?: SnackStore): Promise<void> {
        let res = UserApi.getUsers({username: query})
        res.then((res) => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                this.handleAction({
                    type: SocialActionType.getUserByUsername,
                    payload: {
                        users: res.data.users
                    }
                })
            }
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    public async getUserById(userId: string): Promise<User | null> {
        let res = UserApi.getUserById(userId)
        return res.then((res) => {
            if (res.status === 200) {
                return res.data.user
            }
        }).catch((e) => {
            return null
        })
    }

    public async getUsersByUsername(query: string | undefined): Promise<User[] | null> {
        let res = UserApi.getUsers({username: query})
        return res.then((res) => {
            if (res.status === 200) {
                return res.data.users
            }
        }).catch((e) => {
            return null
        })
    }

    public async getContestsById(arr: string[] | undefined): Promise<Contest[]> {
        if (arr) {
            let resultArr: Contest[] = []
            arr.map((id) => {
                let res = ContestApi.getContestById(id)
                res.then(res => {
                    if (res.status === 200) {
                        resultArr.push(res.data.contest)
                    }
                })
            })
            return resultArr
        } else {
            return []
        }
    }

    public async getTilesetsById(arr: string[] | undefined): Promise<Tileset[]> {
        if (arr) {
            let resultArr: Tileset[] = []
            arr.forEach(id => {
                let res = TilesetApi.getTilesetById(id)
                res.then(res => {
                    if (res.status === 200) {
                        resultArr.push(res.data.tileset)
                    }
                })
            })
            return resultArr
        }
        return []
    }

    public async addFriend(userId: string, auth: AuthStore, snack?: SnackStore): Promise<void> {
        let res = UserApi.addFriend(userId)
        res.then((res) => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                auth.addFriend(userId)
            }
        }).catch((e) => {
            if (e.response) {
                console.log(e.response.data.message)
                snack?.showErrorMessage(e.response.data.message)
            }
        })
    }

    public async removeFriend(userId: string, auth: AuthStore, snack?: SnackStore): Promise<void> {
        let res = UserApi.removeFriend(userId)
        res.then((res) => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                auth.removeFriend(userId)
            }
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    public async getCommentById(commentId: string): Promise<{comment: Comment | undefined, user: User | undefined}> {
        let comment: Comment | undefined = await CommentApi.getCommentById(commentId).then(res => {
            if (res.status === 200) {
                return res.data.comment
            }
        })
        let user: User | undefined
        if (comment) {
            user = await UserApi.getUserById(comment.author).then(res => {
                if (res.status === 200) {
                    return res.data.user
                }
            })
        }
        return {
            comment: comment,
            user: user
        }
    }

    public async clear(): Promise<void> {
        this.handleAction({
            type: SocialActionType.clear
        })
    }

    protected handleAction(action: SocialAction): void {
        switch (action.type) {
            case SocialActionType.getTilesetByName: {
                throw new Error('Not Yet Implemented')
            }
            case SocialActionType.getTilemapByName: {
                throw new Error('Not Yet Implemented')
            }
            case SocialActionType.getUserByUsername: {
                this._setSocial({
                    currentUser: this._social.currentUser,
                    tilemaps: this._social.tilemaps,
                    tilesets: this._social.tilesets,
                    users: action.payload.users,
                })
                break
            }
            case SocialActionType.clear: {
                this._setSocial({
                    currentUser: this._social.currentUser,
                    tilemaps: [],
                    tilesets: [],
                    users: [],
                })
            }
        }
    }    
}