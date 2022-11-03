/**String of type of property**/
export type Type = "string" | "float" | "int" | "bool" | "color" | "object";

export interface Property {
  /**
   * A type that defines a TileSetProperties object on our server.
   * @author Andrew Ojeda
   */

  /** Name of property */
  name: string;

  /** Name of type*/
  ptype: Type;

  /** Value of property */
  value: string;
}

export interface Tileset {
  /**
   * A type that defines a TileSet object on our server.
   * @author Andrew Ojeda
   */

  /** The id of the associated Tileset in the DBMS */
  id: string;

  /** The number of tile columns in the tileset */
  columns: number;

  /** Date When tileset is first created */
  createDate: Date;

  /** Date When tileset was last saved */
  lastSaveDate: Date;

  /** Image used for tiles in this set */
  image: string;

  /** The height of the TileSet (in tiles) */
  imageHeight: number;

  /** The width of the TileSet (in tiles) */
  imageWidth: number;

  /** The margin of the TileSap (in tiles) */
  margin: number;

  /** The name of the TileSet*/
  name: string;

  /** Represents the id of the user who is the owner of the tile set */
  owner: string;

  /** Represents an array of properties of the tile set */
  properties: Property[];

  /** A flag indicating whether this TileSet has been published or not */
  isPublished: boolean;
}

export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;
export type Color = RGB | RGBA | HEX;

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
export interface TilesetEditorState {
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
