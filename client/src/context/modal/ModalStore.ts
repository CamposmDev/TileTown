import { ModalAction, ModalActionType } from "./ModalAction";

export interface ModalState {
  showCreateCommunityModal: boolean;
  showCreateContestModal: boolean;
  showDeleteCommunityModal: boolean;
  showDeleteContestModal: boolean;
  showUploadTilesetModal: boolean;
  showUploadTilemapModal: boolean;
  showCreatePropertyModal: boolean;
  showAddCollaboratorModal: boolean;
  showAddTilesetModal: boolean;
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

  public showUploadTilemapModal() {
    this.handleAction({
      type: ModalActionType.showUploadTilemap,
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

  public showAddTilesetModal() {
    this.handleAction({
      type: ModalActionType.showAddTileset,
    });
  }

  public close() {
    this._setModal({
      showCreateCommunityModal: false,
      showCreateContestModal: false,
      showDeleteCommunityModal: false,
      showDeleteContestModal: false,
      showUploadTilesetModal: false,
      showUploadTilemapModal: false,
      showCreatePropertyModal: false,
      showAddCollaboratorModal: false,
      showAddTilesetModal: false,
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
          showUploadTilemapModal: false,
          showCreatePropertyModal: false,
          showAddCollaboratorModal: false,
          showAddTilesetModal: false,
        });
        break;
      case ModalActionType.showCreateContest:
        this._setModal({
          showCreateCommunityModal: false,
          showCreateContestModal: true,
          showDeleteCommunityModal: false,
          showDeleteContestModal: false,
          showUploadTilesetModal: false,
          showUploadTilemapModal: false,
          showCreatePropertyModal: false,
          showAddCollaboratorModal: false,
          showAddTilesetModal: false,
        });
        break;
      case ModalActionType.showDeleteCommunity:
        this._setModal({
          showCreateCommunityModal: false,
          showCreateContestModal: false,
          showDeleteCommunityModal: true,
          showDeleteContestModal: false,
          showUploadTilesetModal: false,
          showUploadTilemapModal: false,
          showCreatePropertyModal: false,
          showAddCollaboratorModal: false,
          showAddTilesetModal: false,
        });
        break;
      case ModalActionType.showDeleteContest:
        this._setModal({
          showCreateCommunityModal: false,
          showCreateContestModal: false,
          showDeleteCommunityModal: false,
          showDeleteContestModal: true,
          showUploadTilesetModal: false,
          showUploadTilemapModal: false,
          showCreatePropertyModal: false,
          showAddCollaboratorModal: false,
          showAddTilesetModal: false,
        });
        break;
      case ModalActionType.showUploadTileset:
        this._setModal({
          showCreateCommunityModal: false,
          showCreateContestModal: false,
          showDeleteCommunityModal: false,
          showDeleteContestModal: false,
          showUploadTilesetModal: true,
          showUploadTilemapModal: false,
          showCreatePropertyModal: false,
          showAddCollaboratorModal: false,
          showAddTilesetModal: false,
        });
        break;
      case ModalActionType.showProperty:
        this._setModal({
          showCreateCommunityModal: false,
          showCreateContestModal: false,
          showDeleteCommunityModal: false,
          showDeleteContestModal: false,
          showUploadTilesetModal: false,
          showUploadTilemapModal: false,
          showCreatePropertyModal: true,
          showAddCollaboratorModal: false,
          showAddTilesetModal: false,
        });
        break;
      case ModalActionType.showCollaborator:
        this._setModal({
          showCreateCommunityModal: false,
          showCreateContestModal: false,
          showDeleteCommunityModal: false,
          showDeleteContestModal: false,
          showUploadTilesetModal: false,
          showUploadTilemapModal: false,
          showCreatePropertyModal: false,
          showAddCollaboratorModal: true,
          showAddTilesetModal: false,
        });
        break;
      case ModalActionType.showAddTileset:
        this._setModal({
          showCreateCommunityModal: false,
          showCreateContestModal: false,
          showDeleteCommunityModal: false,
          showDeleteContestModal: false,
          showUploadTilesetModal: false,
          showUploadTilemapModal: false,
          showCreatePropertyModal: false,
          showAddCollaboratorModal: false,
          showAddTilesetModal: true,
        });
        break;
      case ModalActionType.showUploadTilemap:
        this._setModal({
          showCreateCommunityModal: false,
          showCreateContestModal: false,
          showDeleteCommunityModal: false,
          showDeleteContestModal: false,
          showUploadTilesetModal: false,
          showUploadTilemapModal: true,
          showCreatePropertyModal: false,
          showAddCollaboratorModal: false,
          showAddTilesetModal: false,
        });
        break;
    }
  }
}
