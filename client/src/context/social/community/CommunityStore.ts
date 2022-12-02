import { Community, User } from "@types"
import axios from "axios"
import { NavigateFunction } from "react-router"
import { CommunityApi } from "src/api"
import { AuthStore } from "src/context/auth/AuthStore"
import { SnackStore } from "src/context/snack/SnackStore"
import { CommunityAction, CommunityActionType } from "./CommunityAction"

export interface CommunityState {
    currentCommunity: Community | undefined
    communities: Community[]
}

export class CommunityStore {
    private readonly _comm: CommunityState
    private readonly _setComm: (comm: CommunityState) => void
    private nav: NavigateFunction

    constructor(comm: CommunityState, setComm: (comm: CommunityState) => void, nav: NavigateFunction) {
        this._comm = comm
        this._setComm = setComm
        this.nav = nav
    }

    public get currCommunity(): Community | undefined {
        return this._comm.currentCommunity
    }

    public get communities(): Community[] {
        return this._comm.communities
    }

    public async joinCommunity(snack?: SnackStore): Promise<User | undefined> {
        let commId = this._comm.currentCommunity?.id
        if (!commId) return undefined
        return CommunityApi.joinCommunity(commId, {}).then(res => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                this.handleAction({
                    type: CommunityActionType.viewCommunity,
                    payload: {
                        currentCommunity: res.data.community
                    }
                })
                return res.data.user
            }
        }).catch(e => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
            return undefined
        })
    }

    public async leaveCommunity(snack?: SnackStore): Promise<User | undefined> {
        let commId = this._comm.currentCommunity?.id
        if (!commId) return undefined
        return CommunityApi.leaveCommunity(commId, {}).then(res => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                this.handleAction({
                    type: CommunityActionType.viewCommunity,
                    payload: {
                        currentCommunity: res.data.community
                    }
                })
                return res.data.user
            }
        }).catch(e => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
            return undefined
        })
    }
    public async kickMember(userId: string, snack?: SnackStore): Promise<User | undefined> {
        let commId = this._comm.currentCommunity?.id
        if (!commId) return undefined
        return await CommunityApi.kickMember(userId, commId).then(res => {
            if (res.status === 200) {
                this.handleAction({
                    type: CommunityActionType.viewCommunity,
                    payload: {
                        currentCommunity: res.data.community
                    }
                })
                return res.data.user
            }
        }).catch(e => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
            return undefined
        })
    }
    public async banMember(userId: string, snack?: SnackStore): Promise<User | undefined> {
        let commId = this._comm.currentCommunity?.id
        if (!commId) return undefined
        return await CommunityApi.banMember(userId, commId).then(res => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                this.handleAction({
                    type: CommunityActionType.viewCommunity,
                    payload: {
                        currentCommunity: res.data.community
                    }
                })
                return res.data.user
            }
        }).catch(e => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
            return undefined
        })
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
                this.nav(`/community/${res.data.community.name}`)
                this.handleAction({
                    type: CommunityActionType.createCommunity,
                    payload: {
                        currentCommunity: res.data.community
                    }
                })
            }
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    public async getCommunitiesById(arr: string[] | undefined): Promise<Community[]> {
        if (arr) {
            let resultArr: Community[] = []
            arr.map(x => {
                CommunityApi.getCommunityById(x).then(res => {
                    if (res.status === 200) {
                        resultArr.push(res.data.community)
                    }
                }).catch(e => console.log('uh oh'))
            })
            return resultArr
        } else {
            return []
        }
    }

    public async getCommunitiesByName(query: string, sort: string, snack?: SnackStore): Promise<void> {
        let res = CommunityApi.getCommunities(query, sort)
        res.then((res) => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                if (res.data.communities) {
                    this.handleAction({
                        type: CommunityActionType.getCommunities,
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

    public async updateCurrentCommunity(name: string, desc: string, vis: string, snack?: SnackStore): Promise<void> {
        let cc = this._comm.currentCommunity
        if (cc) {
            CommunityApi.updateCommunity(cc.id, {community: { name: name, description: desc, visibility: vis}})
            .then(res => {
                if (res.status === 200) {
                    snack?.showSuccessMessage(res.data.message)
                    this.viewCommunity(res.data.community)
                }
            }).catch(e => {
                if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
            })
        }
    }

    public async viewCommunity(comm: Community): Promise<void> {
        this.nav(`/community/${comm.id}`)
        this.handleAction({
            type: CommunityActionType.viewCommunity,
            payload: {
                currentCommunity: comm
            }
        })
    }

    public async deleteCommunityById(communityId: string, snack?: SnackStore): Promise<void> {
        let res = CommunityApi.deleteCommunity(communityId, {})
        res.then((res) => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                this.handleAction({
                    type: CommunityActionType.getCommunities,
                    payload: {
                        communities: this._comm.communities.filter(x => x.id.localeCompare(communityId) !== 0)
                    }
                })
            }
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message) 
        })
    }

    public async deleteCommunityByName(userId: string | undefined, commName: string | undefined, snack?: SnackStore): Promise<void> {
        let res = CommunityApi.getCommunities(commName, 'none')
        res.then((res) => {
            if (res.status === 200 && res.data.communities) {
                let comms = res.data.communities
                comms.forEach(x => {
                    if (userId && commName && x.name.localeCompare(commName) === 0) {
                        let commId = x.id
                        if (x.owner.localeCompare(userId) === 0) {
                            this.deleteCommunityById(commId, snack)
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

    public async getPopularTop10(): Promise<Community[]> {
        return CommunityApi.getPopularTop10().then(res => {
            return res.data.communities
        })
    }

    protected handleAction(action: CommunityAction) {
        switch (action.type) {
            case CommunityActionType.createCommunity: {
                this._setComm({
                    currentCommunity: action.payload.currentCommunity,
                    communities: this._comm.communities
                })
                break
            }
            case CommunityActionType.getCommunities: {
                this._setComm({
                    currentCommunity: this._comm.currentCommunity,
                    communities: action.payload.communities
                })
                break
            }
            case CommunityActionType.viewCommunity: {
                this._setComm({
                    currentCommunity: action.payload.currentCommunity,
                    communities: this._comm.communities
                })
                break
            }
        }
    }
}