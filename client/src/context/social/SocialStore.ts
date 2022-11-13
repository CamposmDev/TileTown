import axios from "axios"
import { CommunityApi, ContestApi } from "src/api"
import { SnackStore } from "../snack/SnackStore"
import { SocialAction } from "./SocialAction"

export interface SocialState {

}

export class SocialStore {
    private readonly _social: SocialState

    constructor(social: SocialState, setSocial: (social: SocialState) => void) {
        this._social = social
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

    public async searchUsers(query: string, snack?: SnackStore): Promise<void> {
        throw new Error('Not Yet Implemented')
    }

    public async addFriend(userId: string, snack?: SnackStore): Promise<void> {
        throw new Error('Not Yet Implemented')
    }

    public async removeFriend(userId: string, snack?: SnackStore): Promise<void> {
        throw new Error('Not Yet Implemented')
    }

    protected handleAction(action: SocialAction): void {
        switch (action.type) {

        }
    }
}