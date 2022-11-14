export type ModalAction =
| ShowCreateCommunity
| ShowCreateContest

export enum ModalActionType {
    showCreateCommunity = 'SHOW_CREATE_COMMUNITY',
    showCreateContest = 'SHOW_CREATE_CONTEST'
}

export type ShowCreateCommunity = {
    type: ModalActionType.showCreateCommunity
}

export type ShowCreateContest = {
    type: ModalActionType.showCreateContest
}