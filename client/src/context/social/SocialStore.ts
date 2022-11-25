import axios from "axios"
import { CommentApi, CommunityApi, ContestApi, MediaApi, TilesetApi, UserApi } from "src/api"
import { Comment, Community, Contest, Tilemap, TilemapSocial, Tileset, TilesetSocial, User } from "@types"
import { SnackStore } from "../snack/SnackStore"
import { SocialAction, SocialActionType } from "./SocialAction"
import { AuthStore } from "../auth/AuthStore"

export interface SocialState {
    currentTMS: TilemapSocial | undefined
    currentTSS: TilesetSocial | undefined
    tilemaps: Tilemap[]
    tilesets: Tileset[]
}

/**
 * The purpose of this class is to store tilemap, tileset queried data, and other utility functions to communicate with the back-end server.
 */
export class SocialStore {
    private readonly _social: SocialState
    private readonly _setSocial: (social: SocialState) => void

    constructor(social: SocialState, setSocial: (social: SocialState) => void) {
        this._social = social
        this._setSocial = setSocial
    }

    public get state(): SocialState {
        return this._social
    }

    public get tilesets(): Tileset[] {
        return this._social.tilesets
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

    public async getTilesetsById(arr: string[] | undefined): Promise<Tileset[]> {
        if (arr) {
            let resultArr: Tileset[] = []
            arr.forEach(id => {
                this.getTilesetById(id).then(tileset => {
                    if (tileset) resultArr.push(tileset)
                })
            })
            return resultArr
        }
        return []
    }

    public async getTilesetById(tilesetId: string): Promise<Tileset | undefined> {
        return TilesetApi.getTilesetById(tilesetId).then(res => {
            if (res.status === 200) {
                return res.data.tileset
            }
        })
    }

    public async getTilesetsByName(query: string, snack?: SnackStore): Promise<void> {
        TilesetApi.getPublishedTilesetsByName(query, query).then(res => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                this.handleAction({
                    type: SocialActionType.getTilesetsByName,
                    payload: {
                        tilesets: res.data.tilesets
                    }
                })
            }
        })
    }

    public async getTilesetSocialByTilesetId(tilesetId: string): Promise<TilesetSocial | undefined> {
        return TilesetApi.getTilesetSocialByTilesetId(tilesetId).then(res => {
            if (res.status === 200) {
               return res.data.social 
            }
        })
    }

    public viewTilemapSocial(social: TilemapSocial): void {
        throw new Error('Not Yet Implemented')
        // this.handleAction({
        //     type: SocialActionType.setCurrentTMS,
        //     payload: {
        //         currentTMS: social
        //     }
        // })
    }

    public viewTilesetSocial(id: string): void {
        TilesetApi.viewTilesetSocial(id).then(res => {
            if (res.status === 200) {
                this.handleAction({
                    type: SocialActionType.setCurrentTSS,
                    payload: {
                        currentTSS: res.data.social
                    }
                })      
            }
        })
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

    public async getCommunityNames(ids: string[]): Promise<string[]> {
        let arr: string[] = []
        ids.forEach(id => {
            this.getCommunityName(id).then(name => {
                if (name) {
                    arr.push(name)
                }
            })
        })
        return arr
    }

    public async getCommunityName(communityId: string): Promise<string | undefined> {
        return CommunityApi.getCommunityName(communityId).then(res => {
            if (res.status === 200) {
                return res.data.name
            }
        })
    }

    public async publishTileset(tilesetId: string, desc: string, commName: string, permissions: [], tags: []): Promise<void> {
        TilesetApi.publishTilesetById(tilesetId, {
            description: desc,
            communityName: commName,
            permissions: permissions,
            tags: tags
        }).then(res => {
            if (res.status === 200) {
                
            }
        })
    }

    public async getUserPublishedTilesets(userId: string): Promise<TilesetSocial[]> {
        let arr: TilesetSocial[] = []
        UserApi.getUsersPublishedTilesets(userId).then(res => {
            if (res.status === 200) {
                console.log(res.data.socials)
            }
        })
        return arr
    }

    /**
     * Returns array of user's published tilesets
     * @returns 
     */
    public async getUserTilesets(): Promise<Tileset[]> {
        let arr: Tileset[] = []
        TilesetApi.getUnpublishedTilesets().then(res => {
            if (res.status === 200) {
                console.log(res.data.tilesets)
            }
        })
        return arr
    }

    public async getAllUserTilesets(userId: string): Promise<string[] | undefined> {
        return UserApi.getUserById(userId).then(res => {
            if (res.status === 200) {
                return res.data.user.tilesets
            }
        })
    }

    public async clear(): Promise<void> {
        this.handleAction({
            type: SocialActionType.clear
        })
    }

    protected handleAction(action: SocialAction): void {
        switch (action.type) {
            case SocialActionType.setCurrentTMS: {
                this._setSocial({
                    currentTMS: action.payload.currentTMS,
                    currentTSS: this._social.currentTSS,
                    tilemaps: this._social.tilemaps,
                    tilesets: this._social.tilesets,
                })
                break
            }
            case SocialActionType.setCurrentTSS: {
                this._setSocial({
                    currentTMS: this._social.currentTMS,
                    currentTSS: action.payload.currentTSS,
                    tilemaps: this._social.tilemaps,
                    tilesets: this._social.tilesets,
                })
                break
            }
            case SocialActionType.getTilemapsByName: {
                this._setSocial({
                    currentTMS: this._social.currentTMS,
                    currentTSS: this._social.currentTSS,
                    tilemaps: action.payload.tilemaps,
                    tilesets: this._social.tilesets
                })
                break
            }
            case SocialActionType.getTilesetsByName: {
                this._setSocial({
                    currentTMS: this._social.currentTMS,
                    currentTSS: this._social.currentTSS,
                    tilemaps: this._social.tilemaps,
                    tilesets: action.payload.tilesets
                })
                break
            }
            case SocialActionType.clear: {
                this._setSocial({
                    currentTMS: undefined,
                    currentTSS: undefined,
                    tilemaps: this._social.tilemaps,
                    tilesets: this._social.tilesets
                })
            }
        }
    }    
}