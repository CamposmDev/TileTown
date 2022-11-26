import { ModalAction, ModalActionType } from "./ModalAction";

export interface ModalState {
  showCreateCommunityModal: boolean;
  showCreateContestModal: boolean;
  showDeleteCommunityModal: boolean;
  showDeleteContestModal: boolean;
  showUploadTilesetModal: boolean;
  showCreatePropertyModal: boolean;
  showAddCollaboratorModal: boolean;
}

export class ModalStore {
  private readonly _modal: ModalState;
  private readonly _setModal: (modal: ModalState) => void;

  constructor(modal: ModalState, setModal: (modal: ModalState) => void) {
    this._modal = modal;
    this._setModal = setModal;
  }

  public getModal(): ModalState {
    return this._modal;
  }

  public showCreateCommunityModal() {
    this.handleAction({
      type: ModalActionType.showCreateCommunity,
    });
  }

  public showCreateContestModal() {
    this.handleAction({
      type: ModalActionType.showCreateContest,
    });
  }

  public showDeleteCommunityModal() {
    this.handleAction({
      type: ModalActionType.showDeleteCommunity,
    });
  }

  public showDeleteContestModal() {
    this.handleAction({
      type: ModalActionType.showDeleteContest,
    });
  }

  public showUploadTilesetModal() {
    this.handleAction({
      type: ModalActionType.showUploadTileset,
    });
  }

  public showCreatePropertyModal() {
    this.handleAction({
      type: ModalActionType.showProperty,
    });
  }

  public showAddCollaboratorModal() {
    this.handleAction({
      type: ModalActionType.showCollaborator,
    });
  }

  public close() {
    this._setModal({
      showCreateCommunityModal: false,
      showCreateContestModal: false,
      showDeleteCommunityModal: false,
      showDeleteContestModal: false,
      showUploadTilesetModal: false,
      showCreatePropertyModal: false,
      showAddCollaboratorModal: false,
    });
  }

  protected handleAction(action: ModalAction) {
    switch (action.type) {
      case ModalActionType.showCreateCommunity:
        console.log("show create comm");
        this._setModal({
          showCreateCommunityModal: true,
          showCreateContestModal: false,
          showDeleteCommunityModal: false,
          showDeleteContestModal: false,
          showUploadTilesetModal: false,
          showCreatePropertyModal: false,
          showAddCollaboratorModal: false,
        });
        break;
      case ModalActionType.showCreateContest:
        this._setModal({
          showCreateCommunityModal: false,
          showCreateContestModal: true,
          showDeleteCommunityModal: false,
          showDeleteContestModal: false,
          showUploadTilesetModal: false,
          showCreatePropertyModal: false,
          showAddCollaboratorModal: false,
        });
        break;
      case ModalActionType.showDeleteCommunity:
        this._setModal({
          showCreateCommunityModal: false,
          showCreateContestModal: false,
          showDeleteCommunityModal: true,
          showDeleteContestModal: false,
          showUploadTilesetModal: false,
          showCreatePropertyModal: false,
          showAddCollaboratorModal: false,
        });
        break;
      case ModalActionType.showDeleteContest:
        this._setModal({
          showCreateCommunityModal: false,
          showCreateContestModal: false,
          showDeleteCommunityModal: false,
          showDeleteContestModal: true,
          showUploadTilesetModal: false,
          showCreatePropertyModal: false,
          showAddCollaboratorModal: false,
        });
        break;
      case ModalActionType.showUploadTileset:
        this._setModal({
          showCreateCommunityModal: false,
          showCreateContestModal: false,
          showDeleteCommunityModal: false,
          showDeleteContestModal: false,
          showUploadTilesetModal: true,
          showCreatePropertyModal: false,
          showAddCollaboratorModal: false,
        });
        break;
      case ModalActionType.showProperty:
        this._setModal({
          showCreateCommunityModal: false,
          showCreateContestModal: false,
          showDeleteCommunityModal: false,
          showDeleteContestModal: false,
          showUploadTilesetModal: false,
          showCreatePropertyModal: true,
          showAddCollaboratorModal: false,
        });
        break;
      case ModalActionType.showCollaborator:
        this._setModal({
          showCreateCommunityModal: false,
          showCreateContestModal: false,
          showDeleteCommunityModal: false,
          showDeleteContestModal: false,
          showUploadTilesetModal: false,
          showCreatePropertyModal: false,
          showAddCollaboratorModal: true,
        });
        break;
    }
  }
}
