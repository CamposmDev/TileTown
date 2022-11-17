export type ModalAction =
| ShowCreateCommunity
| ShowCreateContest
| ShowDeleteCommunity
| ShowDeleteContest
| ShowUploadTileset

export enum ModalActionType {
    showCreateCommunity = 'SHOW_CREATE_COMMUNITY',
    showCreateContest = 'SHOW_CREATE_CONTEST',
    showDeleteCommunity = 'SHOW_DELETE_COMMUNITY',
    showDeleteContest = 'SHOW_DELETE_CONTEST',
    showUploadTileset = 'SHOW_UPLOAD_TILESET'
}

export type ShowCreateCommunity = {
    type: ModalActionType.showCreateCommunity
}

export type ShowCreateContest = {
    type: ModalActionType.showCreateContest
}

export type ShowDeleteCommunity = {
    type: ModalActionType.showDeleteCommunity
}

export type ShowDeleteContest = {
    type: ModalActionType.showDeleteContest
}

export type ShowUploadTileset = {
    type: ModalActionType.showUploadTileset
}