import Contest from "../../../../../@types/Contest";

export type ContestAction =
| CreateContest
| GetContests 
| UpdateContest
| DeleteContest
| ViewContest

export enum ContestActionType {
    createContest = 'CREATE_CONTEST',
    getContests = 'GET_CONTEST',
    updateContest = 'UPDATE_CONTEST',
    deleteContest = 'DELETE_CONTEST',
    viewContest = 'VIEW_CONTEST'
}

export type CreateContest = {
    type: ContestActionType.createContest,
    payload: {
        currentContest: Contest
    }
}

export type GetContests = {
    type: ContestActionType.getContests,
    payload: {
        contests: Contest[]
    }
}

export type UpdateContest = {
    type: ContestActionType.updateContest,
    payload: {
        currentContest: Contest
    }
}

export type DeleteContest = {
    type: ContestActionType.deleteContest
}

export type ViewContest = {
    type: ContestActionType.viewContest,
    payload: {
        currentContest: Contest
    }
}

