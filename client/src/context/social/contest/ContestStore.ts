import axios from "axios"
import { ContestApi } from "src/api"
import { SnackStore } from "src/context/snack/SnackStore"
import Contest from "../../../../../@types/Contest"
import User from "../../../../../@types/User"
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

    public get state(): ContestState {
        return this._contest
    }

    public async joinContest(id: string, snack?: SnackStore): Promise<User | undefined> {
        return ContestApi.joinContest(id).then(res => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                this.handleAction({
                    type: ContestActionType.viewContest,
                    payload: {
                        currentContest: res.data.contest
                    }
                })
                return res.data.user
            }
        }).catch(e => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
            return undefined
        })
    }

    public async leaveContest(id: string, snack?: SnackStore): Promise<User | undefined> {
        return ContestApi.leaveContest(id).then(res => {
            if (res.status === 200) {
                snack?.showSuccessMessage(res.data.message)
                this.handleAction({
                    type: ContestActionType.viewContest,
                    payload: {
                        currentContest: res.data.contest
                    }
                })
                return res.data.user
            }
        }).catch(e => {
            if (axios.isAxiosError(e) && e.response) snack?.showErrorMessage(e.response.data.message)
            return undefined
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
            if (res.status === 201) {
                snack?.showSuccessMessage(res.data.message)
                this.handleAction({
                    type: ContestActionType.viewContest,
                    payload: {
                        currentContest: res.data.contest
                    }
                })
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
        let res = ContestApi.getContests(contestName, 'none')
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

    public async getContestByName(query: string, sort: string, snack?: SnackStore): Promise<void> {
        let res = ContestApi.getContests(query, sort)
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

    public async viewContest(contest: Contest): Promise<void> {
        this.handleAction({
            type: ContestActionType.viewContest,
            payload: {
                currentContest: contest
            }
        })
    }

    public async clear(): Promise<void> {
        this.handleAction({
            type: ContestActionType.clear
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
            case ContestActionType.viewContest: {
                this._setContest({
                    currentContest: action.payload.currentContest,
                    contests: this._contest.contests
                })
                break
            }
            case ContestActionType.clear: {
                this._setContest({
                    currentContest: undefined,
                    contests: this._contest.contests
                })
                break
            }
        }
    }
}