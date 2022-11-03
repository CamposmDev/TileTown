import Tileset from "./Tileset";
import { Color } from "./Color";

/**determines which editing tool the user is using for tileset*/
export enum TilesetEditControl {
  draw = "DRAW",
  erase = "ERASE",
  fill = "FILL",
}

/** determines which modal to open in the tileset editor, closed by default*/
export enum TilesetEditorModalType {
  close = "CLOSE",
  delete = "DELETE",
  publish = "PUBLISH",
  download = "DOWNLOAD",
  upload = "UPLOAD",
  save = "SAVE",
  error = "ERROR",
}
/**
 * The type of the Tileset Edit Store's state variable.
 */
export default interface TilesetEditorState {
  tileset: Tileset;
  currentEditControl: TilesetEditControl;
  penSize: number;
  penColor: Color;
  savedColors: Color[];
  gridEnabled: boolean;
  restrictToTile: boolean;
  gridSize: number;
  gridColor: Color;
  modalType: TilesetEditorModalType;
  isSaved: boolean;
}

/**
 * The types of actions/events the tileset edit store needs to handle.
 */
export enum TilesetEditorActionType {
  CHANGE_TILESET_NAME = "CHANGE_TILESET_NAME",
  CREATE_NEW_TILESET = "CREATE_NEW_TILESET",
  UPDATE_TILESET = "UPDATE_TILESET",
  SAVE_TILESET = "SAVE_TILESET",
  CHANGE_EDIT_CONTROL = "CHANGE_EDIT_CONTROL",
  UPDATE_GRID = "UPDATE_GRID",
  TOGGLE_RESTRICT_TO_TILE = "TOGGLE_RESTRICT_TO_TILE",
  UPDATE_PEN = "UPDATE_PEN",
  UPDATE_COLORS = "UPDATE_COLORS",
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
}

/**action type and payload pairs*/
export type TilesetEditorAction =
  | {
      type: TilesetEditorActionType.CHANGE_TILESET_NAME;
      payload: { name: string };
    }
  | {
      type: TilesetEditorActionType.CHANGE_EDIT_CONTROL;
      payload: { editControl: TilesetEditControl };
    }
  | {
      type: TilesetEditorActionType.CREATE_NEW_TILESET;
      payload: { tileset: Tileset };
    }
  | {
      type: TilesetEditorActionType.UPDATE_TILESET;
      payload: { tileset: Tileset };
    }
  | {
      type: TilesetEditorActionType.SAVE_TILESET;
      payload: { tileset: Tileset };
    }
  | {
      type: TilesetEditorActionType.UPDATE_GRID;
      payload: { gridEnabled: boolean; gridSize: number; gridColor: Color };
    }
  | {
      type: TilesetEditorActionType.UPDATE_PEN;
      payload: { size: number; color: Color };
    }
  | {
      type: TilesetEditorActionType.UPDATE_COLORS;
      payload: { colors: [Color] };
    }
  | {
      type: TilesetEditorActionType.TOGGLE_RESTRICT_TO_TILE;
      payload: {};
    }
  | {
      type: TilesetEditorActionType.OPEN_MODAL;
      payload: { modal: TilesetEditorModalType };
    }
  | {
      type: TilesetEditorActionType.CLOSE_MODAL;
      payload: {};
    };
