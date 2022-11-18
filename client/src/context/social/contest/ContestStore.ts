import axios from "axios"
import { ContestApi } from "src/api"
import { SnackStore } from "src/context/snack/SnackStore"
import Contest from "../../../../../@types/Contest"
import { ContestAction, ContestActionType } from "./ContestAction"

export interface ContestState {
    currentContest: Contest | undefined
    contests: Contest[]
}

export class ContestStore {
    private readonly _contest: ContestState
    private readonly _setContest: (contest: ContestState) => void

    constructor(contest: ContestState, setContest: (contest: ContestState) => void) {
        this._contest = contest
        this._setContest = setContest
    }

    public getCurrentContest(): Contest | undefined {
        return this._contest.currentContest
    }

    public getContests(): Contest[] {
        return this._contest.contests
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
                    type: ContestActionType.getContests,
                    payload: {
                        contests: this._contest.contests.filter(x => x.id.localeCompare(contestId) !== 0)
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

    public async getContestByName(query: string, snack?: SnackStore): Promise<void> {
        let res = ContestApi.getContests(query)
        res.then((res) => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                if (res.data.contests) {
                    console.log(res.data.contests)
                    this.handleAction({
                        type: ContestActionType.getContests,
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

    protected handleAction(action: ContestAction) {
        switch (action.type) {
            case ContestActionType.getContests: {
                this._setContest({
                    currentContest: this._contest.currentContest,
                    contests: action.payload.contests,
                })
                break
            }
        }
    }
}