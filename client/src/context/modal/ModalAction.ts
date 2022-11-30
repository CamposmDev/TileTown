export type ModalAction =
  | ShowCreateCommunity
  | ShowCreateContest
  | ShowDeleteCommunity
  | ShowDeleteContest
  | ShowUploadTileset
  | ShowUploadTilemap
  | ShowProperty
  | ShowCollaborator
  | ShowAddTileset;

export enum ModalActionType {
  showCreateCommunity = "SHOW_CREATE_COMMUNITY",
  showCreateContest = "SHOW_CREATE_CONTEST",
  showDeleteCommunity = "SHOW_DELETE_COMMUNITY",
  showDeleteContest = "SHOW_DELETE_CONTEST",
  showUploadTileset = "SHOW_UPLOAD_TILESET",
  showUploadTilemap = "SHOW_UPLOAD_TILEMAP",
  showProperty = "SHOW_PROPERTY",
  showCollaborator = "SHOW_COLLABORATOR",
  showAddTileset = "SHOW_ADD_TILESET",
}

export type ShowCreateCommunity = {
  type: ModalActionType.showCreateCommunity;
};

export type ShowCreateContest = {
  type: ModalActionType.showCreateContest;
};

export type ShowDeleteCommunity = {
  type: ModalActionType.showDeleteCommunity;
};

export type ShowDeleteContest = {
  type: ModalActionType.showDeleteContest;
};

export type ShowUploadTileset = {
  type: ModalActionType.showUploadTileset;
};

export type ShowUploadTilemap = {
  type: ModalActionType.showUploadTilemap;
};

export type ShowProperty = {
  type: ModalActionType.showProperty;
};

export type ShowCollaborator = {
  type: ModalActionType.showCollaborator;
};

export type ShowAddTileset = {
  type: ModalActionType.showAddTileset;
};
