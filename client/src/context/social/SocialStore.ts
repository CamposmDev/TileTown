import axios from "axios"
import { CommunityApi, ContestApi, ForumApi, UserApi } from "src/api"
import { Community, ForumPost, User } from "@types"
import { SnackStore } from "../snack/SnackStore"
import { SocialAction, SocialActionType } from "./SocialAction"
import { SnackActionType } from "../snack/SnackAction"

export interface SocialState {
    users: User[]
}

export class SocialStore {
    private readonly _social: SocialState
    private readonly _setSocial: (social: SocialState) => void

    constructor(social: SocialState, setSocial: (social: SocialState) => void) {
        this._social = social
        this._setSocial = setSocial
    }

    public getUserSearchResult(): User[] {
        return this._social.users
    }

    public async createCommunity(name: string, description: string, snack?: SnackStore): Promise<void> {
        let res = CommunityApi.createCommunity({
            community: {
                name: name,
                description: description
            }
        })
        res.then((res) => {
            if (res.status === 201) {
                snack?.showSuccessMessage(res.data.message)
            }
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    public async deleteCommunity(communityId: string, snack?: SnackStore): Promise<void> {
        let res = CommunityApi.deleteCommunity(communityId, {})
        res.then((res) => {
            if (res.status === 200) snack?.showSuccessMessage(res.data.message)
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

    public async deleteContest(contestId: string, snack?: SnackStore): Promise<void> {
        let res = ContestApi.deleteContestById(contestId)
        res.then((res) => {
            if (res.status === 200) snack?.showSuccessMessage(res.data.message)
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    public async searchCommunityByName(query: string, snack?: SnackStore): Promise<void> {
        let res = CommunityApi.getCommunities(query)
        res.then((res) => {
            if (res.status === 200) snack?.showSuccessMessage(res.data.message)
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    public async searchContestsByName(query: string, snack?: SnackStore): Promise<void> {
        let res = ContestApi.getContests(query)
        res.then((res) => {
            if (res.status === 200) snack?.showSuccessMessage(res.data.message)
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }
    public async searchForumsByName(query: string, snack?: SnackStore): Promise<void> {
        let res = ForumApi.getForums(query)
        res.then((res) => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                let arr: ForumPost[] | undefined = res.data.forumPost
                if (arr) {
                    console.log(arr)
                    this.handleAction({
                        type: SocialActionType.searchForumsByName,
                        payload: {
                            forums: arr
                        }
                    })
                }
            }
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    public async searchUsers(query: string, snack?: SnackStore): Promise<void> {
        let res = UserApi.getUsers({username: query})
        res.then((res) => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                this.handleAction({
                    type: SocialActionType.searchUsersByName,
                    payload: {
                        users: res.data.users
                    }
                })
            }
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    public async addFriend(userId: string, snack?: SnackStore): Promise<void> {
        let res = UserApi.addFriend(userId)
        res.then((res) => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
            }
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    public async removeFriend(userId: string, snack?: SnackStore): Promise<void> {
        let res = UserApi.removeFriend(userId)
        res.then((res) => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
            }
        }).catch((e) => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
        })
    }

    protected handleAction(action: SocialAction): void {
        switch (action.type) {
            case SocialActionType.searchUsersByName: {
                this._setSocial({
                    users: action.payload.users
                })
                break
            }
        }
    }
}