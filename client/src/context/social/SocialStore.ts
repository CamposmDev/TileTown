import axios from "axios"
import { CommunityApi, ContestApi, UserApi } from "src/api"
import { Community, Contest, Tilemap, TilemapSocial, Tileset, TilesetSocial, User } from "@types"
import { SnackStore } from "../snack/SnackStore"
import { SocialAction, SocialActionType } from "./SocialAction"
import { AuthStore } from "../auth/AuthStore"

export interface SocialState {
    currentUser: User | undefined
    tilesets: TilesetSocial[]
    tilemaps: TilemapSocial[]
    users: User[]
    communities: Community[]
    contests: Contest[]
}

export class SocialStore {
    private readonly _social: SocialState
    private readonly _setSocial: (social: SocialState) => void
    private readonly _auth: AuthStore

    constructor(social: SocialState, setSocial: (social: SocialState) => void, auth: AuthStore) {
        this._social = social
        this._setSocial = setSocial
        this._auth = auth
    }

    public getUsers(): User[] {
        return this._social.users
    }

    public getCommunities(): Community[] {
        return this._social.communities
    }

    public getContests(): Contest[] {
        return this._social.contests
    }

    public async createCommunity(name: string, description: string, vis: string, auth?: AuthStore, snack?: SnackStore): Promise<void> {
        let res = CommunityApi.createCommunity({
            community: {
                name: name,
                description: description,
                visibility: vis
            }
        })
        res.then((res) => {
            if (res.status === 201) {
                snack?.showSuccessMessage(res.data.message)
                auth?.addCommunity(res.data.community.id)
            }
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    public async deleteCommunityById(communityId: string, auth?: AuthStore, snack?: SnackStore): Promise<void> {
        let res = CommunityApi.deleteCommunity(communityId, {})
        res.then((res) => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                auth?.deleteCommunity(communityId)
                this.handleAction({
                    type: SocialActionType.getCommunityByName,
                    payload: {
                        communities: this._social.communities.filter(x => x.id.localeCompare(communityId) !== 0)
                    }
                })
            }
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message) 
        })
    }
    
    public async deleteCommunityByName(userId: string | undefined, commName: string | undefined, auth?: AuthStore, snack?: SnackStore): Promise<void> {
        let res = CommunityApi.getCommunities(commName)
        res.then((res) => {
            if (res.status === 200 && res.data.communities) {
                let comms = res.data.communities
                comms.forEach(x => {
                    if (userId && commName && x.name.localeCompare(commName) === 0) {
                        let commId = x.id
                        if (x.owner.localeCompare(userId) === 0) {
                            this.deleteCommunityById(commId, auth, snack)
                        } else {
                            snack?.showErrorMessage(`You do not own community '${x.name}'`)
                        }
                    }
                })
            }
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
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

    public async deleteContestById(contestId: string, snack?: SnackStore): Promise<void> {
        let res = ContestApi.deleteContestById(contestId)
        res.then((res) => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                this.handleAction({
                    type: SocialActionType.getContestByName,
                    payload: {
                        contests: this._social.contests.filter(x => x.id.localeCompare(contestId) !== 0)
                    }
                })
            }
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    public async deleteContestByName(userId: string | undefined, contestName: string | undefined, snack?: SnackStore): Promise<void> {
        let res = ContestApi.getContests(contestName)
        res.then((res) => {
            if (res.status === 200 && res.data.contests) {
                let contests = res.data.contests
                contests.forEach(x => {
                    if (userId && contestName && x.name.localeCompare(contestName) === 0) {
                        let contestId = x.id
                        if (x.owner.localeCompare(userId) === 0) {
                            this.deleteContestById(contestId, snack)
                        } else {
                            snack?.showErrorMessage(`You do not own contest '${x.name}'`)
                        }
                    }
                })
            } 
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

    public async getUserProfileCard(userId: string): Promise<User | null> {
        return null
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

    public async getCommunitiesById(arr: string[] | undefined): Promise<Community[]> {
        if (arr) {
            let resultArr: Community[] = []
            arr.map(x => {
                CommunityApi.getCommunityById(x).then(res => {
                    if (res.status === 200) {
                        console.log('hmmm')
                        console.log(res.data.community)
                        resultArr.push(res.data.community)
                    }
                }).catch(e => console.log('uh oh'))
            })
            return resultArr
        } else {
            return []
        }
    }

    public async getCommunityByName(query: string, snack?: SnackStore): Promise<void> {
        let res = CommunityApi.getCommunities(query)
        res.then((res) => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                if (res.data.communities) {
                    console.log(res.data.communities)
                    this.handleAction({
                        type: SocialActionType.getCommunityByName,
                        payload: {
                            communities: res.data.communities
                        }
                    })
                }
            }
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
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

    public async getContestByName(query: string, snack?: SnackStore): Promise<void> {
        let res = ContestApi.getContests(query)
        res.then((res) => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                if (res.data.contests) {
                    console.log(res.data.contests)
                    this.handleAction({
                        type: SocialActionType.getContestByName,
                        payload: {
                            contests: res.data.contests
                        }
                    })
                }
            }
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
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

    public async clear(): Promise<void> {
        this.handleAction({
            type: SocialActionType.clear
        })
    }

    protected handleAction(action: SocialAction): void {
        switch (action.type) {
            case SocialActionType.getTilesetByName: {
                throw new Error('Not Yet Implemented')
                break
            }
            case SocialActionType.getTilemapByName: {
                throw new Error('Not Yet Implemented')
                break
            }
            case SocialActionType.getUserByUsername: {
                this._setSocial({
                    currentUser: this._social.currentUser,
                    tilemaps: this._social.tilemaps,
                    tilesets: this._social.tilesets,
                    users: action.payload.users,
                    communities: this._social.communities,
                    contests: this._social.contests,
                })
                break
            }
            case SocialActionType.getCommunityByName: {
                this._setSocial({
                    currentUser: this._social.currentUser,
                    tilemaps: this._social.tilemaps,
                    tilesets: this._social.tilesets,
                    users: this._social.users,
                    communities: action.payload.communities,
                    contests: this._social.contests,
                })
                break
            }
            case SocialActionType.getContestByName: {
                this._setSocial({
                    currentUser: this._social.currentUser,
                    tilemaps: this._social.tilemaps,
                    tilesets: this._social.tilesets,
                    users: this._social.users,
                    communities: this._social.communities,
                    contests: action.payload.contests,
                })
                break
            }
            case SocialActionType.clear: {
                this._setSocial({
                    currentUser: this._social.currentUser,
                    tilemaps: [],
                    tilesets: [],
                    users: [],
                    communities: [],
                    contests: [],
                })
            }
        }
    }

    
}