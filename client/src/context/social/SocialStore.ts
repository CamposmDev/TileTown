import axios from "axios"
import { CommentApi, CommunityApi, ContestApi, SocialApi, TilemapApi, TilesetApi, UserApi } from "src/api"
import { Comment, Tilemap, TilemapSocial, Tileset, TilesetSocial, User } from "@types"
import { SnackStore } from "../snack/SnackStore"
import { SocialAction, SocialActionType } from "./SocialAction"
import { AuthStore } from "../auth/AuthStore"
import { NavigateFunction } from "react-router"

export interface SocialState {
    currentTMS: TilemapSocial | undefined
    currentTSS: TilesetSocial | undefined
    tilemaps: TilemapSocial[]
    tilesets: TilesetSocial[]
}

/**
 * The purpose of this class is to store tilemap, tileset queried data, and other utility functions to communicate with the back-end server.
 */
export class SocialStore {
    private readonly _social: SocialState
    private readonly _setSocial: (social: SocialState) => void
    private readonly nav: NavigateFunction

    constructor(social: SocialState, setSocial: (social: SocialState) => void, nav: NavigateFunction) {
        this._social = social
        this._setSocial = setSocial
        this.nav = nav
    }

    public get state(): SocialState {
        return this._social
    }

    public async getUserCollaboratedTilemaps(userId: string) {
        return TilemapApi.getUserCollaboratedTilemaps(userId).then(res => {
            if (res.status === 200) {
                return res.data.tilemaps
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

    public async favoriteTMS(tmsId: string, snack?: SnackStore): Promise<User | undefined> {
        return SocialApi.favoriteTilemapSocial(tmsId).then(res => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                return res.data.user
            }
        }).catch(e => {
            if (axios.isAxiosError(e) && e.response) {
                snack?.showErrorMessage(e.response.data.message)
                return undefined
            }
        })

    }

    public async unfavoriteTMS(tmsId: string, snack?: SnackStore): Promise<User | undefined> {
        return SocialApi.unfavoriteTilemapSocial(tmsId).then(res => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                return res.data.user
            }
        }).catch(e => {
            if (axios.isAxiosError(e) && e.response) {
                snack?.showErrorMessage(e.response.data.message)
                return undefined
            }
        })

    }

    public async favoriteTSS(tssId: string, snack?: SnackStore): Promise<User | undefined> {
        return SocialApi.favoriteTilesetSocial(tssId).then(res => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                return res.data.user
            }
        }).catch(e => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
            return undefined
        })
    }

    public async unfavoriteTSS(tssId: string, snack?: SnackStore): Promise<User | undefined> {
        return SocialApi.unfavoriteTilesetSocial(tssId).then(res => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                return res.data.user
            }
        }).catch(e => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
            return undefined
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
        let res = UserApi.getUsers({username: query, sort: 'none'})
        return res.then((res) => {
            if (res.status === 200) {
                return res.data.users
            }
        }).catch((e) => {
            return null
        })
    }

    public async getTilemapSocialsByName(query: string, sort: string, tags: string[], snack?: SnackStore): Promise<void> {
        SocialApi.getTilemapSocialsByName(query, sort, tags).then(res => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                this.handleAction({
                    type: SocialActionType.getTilemapsByName,
                    payload: {
                        tilemaps: res.data.tilemaps
                    }
                })
            }
        })
    }

    public async getTilemapById(id: string): Promise<Tilemap | undefined> {
        return TilemapApi.getTilemapById(id).then(res => {
            if (res.status === 200) {
                return res.data.tilemap
            }
        })
    }

    public async getTilemapSocialByTilemapId(tilemapId: string): Promise<TilemapSocial | undefined> {
        return SocialApi.getTilemapSocialByTilemapId(tilemapId).then(res => {
            if (res.status === 200) {
                return res.data.social
            }
        })
    }

    public async getTilemapSocialById(id: string): Promise<TilemapSocial | undefined> {
        return SocialApi.getTilemapSocialById(id).then(res => {
            if (res.status === 200) {
                return res.data.social
            }
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

    public async getTilesetSocialsByName(query: string, sort: string, tags: string[], snack?: SnackStore): Promise<void> {
        SocialApi.getTilesetSocialsByName(query, sort, tags).then(res => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                this.handleAction({
                    type: SocialActionType.getTilesetsByName,
                    payload: {
                        tilesets: res.data.tilesets
                    }
                })
            }
        }).catch(e => {
            if (axios.isAxiosError(e) && e.response) {
                if (e.response.status === 404) {
                    snack?.showErrorMessage('Query cannot be empty!')
                }
            }
        })
    }

    public async getTilesetSocialById(id: string): Promise<TilesetSocial | undefined> {
        return SocialApi.getTilesetSocialById(id).then(res => {
            if (res.status === 200) {
                return res.data.social
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

    /** Returns array of user's published tileset socials */
    public async getUserTilesetSocials(userId: string): Promise<TilesetSocial[]> {
        let arr: TilesetSocial[] = []
        UserApi.getUsersPublishedTilesets(userId).then(res => {
            if (res.status === 200) {
                console.log(res.data.socials)
            }
        })
        return arr
    }

    /** Returns array of the current user's published tilesets */
    public async getUserUnpublishedTilesets(): Promise<Tileset[]> {
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

    /** Queries back-end to get an array of community names based on given array of community ids */
    public async getCommunityNames(communityIds: string[]): Promise<string[]> {
        let arr: string[] = []
        communityIds.forEach(id => {
            this.getCommunityName(id).then(name => {
                if (name) {
                    arr.push(name)
                }
            })
        })
        return arr
    }

    /** Queries back-end to get a community name based on given community id */
    public async getCommunityName(communityId: string): Promise<string | undefined> {
        return CommunityApi.getCommunityName(communityId).then(res => {
            if (res.status === 200) {
                return res.data.name
            }
        })
    }

    public async hasContestSubmission(contestId: string): Promise<boolean> {
        return ContestApi.hasSubmitted(contestId).then(res => {
            if (res.status === 200) {
                return res.data.submitted
            }
        })
    }

    /**
     * Returns array of contest names where the theme of the contest is tilemap
     * @param contestIds - array of contest ids
     * @returns 
     */
    public async getTilemapContestNames(contestIds: string[]): Promise<string[]> {
        let arr: string[] = []
        contestIds.forEach(id => {
            this.getTilemapContestName(id).then(name => {
                if (name) {
                    arr.push(name)
                }
            })
        })
        return arr
    }

    public async getContestNameById(contestId: string): Promise<string | null> {
        return ContestApi.getContestNameById(contestId).then(res => {
            if (res.status === 200) {
                return res.data.name
            }
        })
    }

    /**
     * Returns array of contest names where the theme of the contest is tileset
     * @param contestIds - array of contest ids
     * @returns 
     */
    public async getTilesetContestNames(contestIds: string[]): Promise<string[]> {
        let arr: string[] = []
        contestIds.forEach(id => {
            this.getTilesetContestName(id).then(name => {
                if (name) {
                    arr.push(name)
                }
            })
        })
        return arr
    }

    public async getTilemapContestName(contestId: string): Promise<string | null> {
        return ContestApi.getTilemapContestName(contestId).then(res => {
            if (res.status === 200) {
                return res.data.name
            }
        })
    }

    public async getTilesetContestName(contestId: string): Promise<string | undefined> {
        return ContestApi.getTilesetContestName(contestId).then(res => {
            if (res.status === 200) {
                return res.data.name
            }
        })
    }

    public async likeTMS(snack?: SnackStore): Promise<void> {
        let currentTMS = this._social.currentTMS
        if (currentTMS) {
            SocialApi.likeTilemapById(currentTMS.id).then(res => {
                if (res.status === 200) {
                    let tms = res.data.social
                    if (tms) {
                        this.handleAction({
                            type: SocialActionType.setCurrentTMS,
                            payload: {
                                newTMS: tms,
                                oldTMS: currentTMS
                            }
                        })
                    }
                    snack?.showSuccessMessage(res.data.message)
                }
            })
        }
    }

    public async dislikeTMS(snack?: SnackStore): Promise<void> {
        let currentTMS = this._social.currentTMS
        if (currentTMS) {
            SocialApi.dislikeTilemapById(currentTMS.id).then(res => {
                if (res.status === 200) {
                    let tms = res.data.social
                    if (tms) {
                        this.handleAction({
                            type: SocialActionType.setCurrentTMS,
                            payload: {
                                newTMS: tms,
                                oldTMS: currentTMS
                            }
                        })
                    }
                    snack?.showSuccessMessage(res.data.message)
                }
            })
        }
    }

    public async commentTMS(body: string, snack?: SnackStore): Promise<void> {
        let currentTMS = this._social.currentTMS
        if (currentTMS) {
            SocialApi.commentTilemapById(currentTMS.id, {comment:{body: body}}).then(res => {
                if (res.status === 201) {
                    this.handleAction({
                        type: SocialActionType.setCurrentTMS,
                        payload: {
                            newTMS: res.data.tilemapSocial,
                            oldTMS: currentTMS
                        }
                    })
                    snack?.showSuccessMessage(res.data.message)
                }
            })
        }
    }

    public viewTilemapSocial(tms: TilemapSocial): void {
        SocialApi.viewTilemapById(tms.id).then(res => {
            if (res.status === 200) {
                this.handleAction({
                    type: SocialActionType.setCurrentTMS,
                    payload: {
                        newTMS: res.data.social,
                        oldTMS: tms
                    }
                })
            }
        })
    }

    public async publishTilemap(tilemapId: string, desc: string, commName: string, contestName: string, permissions: [], tags: string[], snack?: SnackStore): Promise<void> {
        /** TODO */
        TilemapApi.publishTilemapById(tilemapId, {
            description: desc,
            communityName: commName,
            contestName: contestName,
            permissions: permissions,
            tags: tags
        }).then(res => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
            }
        }).catch(e => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    public async deleteTilemapById(id: string, snack?: SnackStore): Promise<void> {
        /** TODO */
    }

    public async likeTSS(snack?: SnackStore): Promise<void> {
        let currentTSS = this._social.currentTSS
        if (currentTSS) {
            SocialApi.likeTilesetById(currentTSS.id).then(res => {
                if (res.status === 200) {
                    let tss = res.data.social
                    if (tss) {
                        this.handleAction({
                            type: SocialActionType.setCurrentTSS,
                            payload: {
                                newTSS: tss,
                                oldTSS: currentTSS
                            }
                        })
                    }
                    snack?.showSuccessMessage(res.data.message)
                }
            })
        }
    }

    public async dislikeTSS(snack?: SnackStore): Promise<void> {
        let currentTSS = this._social.currentTSS
        if (currentTSS) {
            SocialApi.dislikeTilesetById(currentTSS.id).then(res => {
                if (res.status === 200) {
                    let tss = res.data.social
                    if (tss) {
                        this.handleAction({
                            type: SocialActionType.setCurrentTSS,
                            payload: {
                                newTSS: tss,
                                oldTSS: currentTSS
                            }
                        })
                    }
                    snack?.showSuccessMessage(res.data.message)
                }
            })
        }
    }

    public async commentTSS(body: string, snack?: SnackStore): Promise<void> {
        let currentTSS = this._social.currentTSS
        if (currentTSS) {
            SocialApi.commentTilesetById(currentTSS.id, {comment: { body: body }}).then(res => {
                if (res.status === 201) {
                    this.handleAction({
                        type: SocialActionType.setCurrentTSS,
                        payload: {
                            newTSS: res.data.tilesetSocial,
                            oldTSS: currentTSS
                        }
                    })
                    snack?.showSuccessMessage(res.data.message)
                }
            })
        }
    }

    /** Increments tileset social view count and updates currentTSS state */
    public viewTilesetSocial(tss: TilesetSocial): void {
        TilesetApi.viewTilesetSocial(tss.id).then(res => {
            if (res.status === 200) {
                this.handleAction({
                    type: SocialActionType.setCurrentTSS,
                    payload: {
                        newTSS: res.data.social,
                        oldTSS: tss
                    }
                })      
            }
        })
    }

    public async publishTileset(tilesetId: string, desc: string, commName: string, contestName: string, permissions: [], tags: string[], snack?: SnackStore): Promise<void> {
        TilesetApi.publishTilesetById(tilesetId, {
            description: desc,
            communityName: commName,
            contestName: contestName,
            permissions: permissions,
            tags: tags
        }).then(res => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
            }
        }).catch(e => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    public async deleteTilesetById(id: string, snack?: SnackStore): Promise<void> {
        TilesetApi.deleteTilesetById(id, {}).then(res => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
            }
        }).catch(e => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    public async getPopularTop10TMS(): Promise<TilemapSocial[]> {
        return SocialApi.getPopularTop10TMS().then(res => {
            return res.data.tilemaps
        })
    }

    public async getPopularTop10TSS(): Promise<TilesetSocial[]> {
        return SocialApi.getPopularTop10TSS().then(res => {
            return res.data.tilesets
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
                let payload = action.payload
                if (!payload.oldTMS) return
                let i = this._social.tilemaps.indexOf(payload.oldTMS)
                if (i !== -1) this._social.tilemaps.splice(i, 1, payload.newTMS)
                this._setSocial({
                    currentTMS: action.payload.newTMS,
                    currentTSS: this._social.currentTSS,
                    tilemaps: this._social.tilemaps,
                    tilesets: this._social.tilesets
                })
                break
            }
            case SocialActionType.setCurrentTSS: {
                let payload = action.payload
                if (!payload.oldTSS) return
                let i = this._social.tilesets.indexOf(payload.oldTSS)
                if (i !== -1) this._social.tilesets.splice(i, 1, payload.newTSS)
                this._setSocial({
                    currentTMS: this._social.currentTMS,
                    currentTSS: payload.newTSS,
                    tilemaps: this._social.tilemaps,
                    tilesets: this._social.tilesets
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