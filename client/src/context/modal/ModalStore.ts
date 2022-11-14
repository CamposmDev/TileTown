import { ModalAction, ModalActionType } from "./ModalAction"

export interface ModalState {
    showCreateCommunityModal: boolean
    showCreateContestModal: boolean
}

export class ModalStore {
    private readonly _modal: ModalState
    private readonly _setModal: (modal: ModalState) => void

    constructor(modal: ModalState, setModal: (modal: ModalState) => void) {
        this._modal = modal
        this._setModal = setModal
    }

    public getModal(): ModalState {
        return this._modal
    }

    public showCreateCommunityModal() {
        this.handleAction({
            type: ModalActionType.showCreateCommunity
        })
    }

    public showCreateContestModal() {
        this.handleAction({
            type: ModalActionType.showCreateContest
        })
    }

    public close() {
        this._setModal({
            showCreateCommunityModal: false,
            showCreateContestModal: false
        })
    }

    protected handleAction(action: ModalAction) {
        switch (action.type) {
            case ModalActionType.showCreateCommunity:
                console.log('show create comm')
                this._setModal({
                    showCreateCommunityModal: true,
                    showCreateContestModal: false
                })
                break
            case ModalActionType.showCreateContest:
                this._setModal({
                    showCreateCommunityModal: false,
                    showCreateContestModal: true
                })
                break
        }
    }
}