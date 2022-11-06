import { ConstructionOutlined } from "@mui/icons-material";

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

  /**The number of tile rows in the tileset */
  rows: number;

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

  /** The height of the tiles in pixels */
  tileHeight: number;

  /** The width of the tiles in pixels */
  tileWidth: number;

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
export type HEX = `#${string}`;
export type Color = RGB | HEX;

export function isColor(color: string): boolean {
  if (!isRGB(color)) return isHex(color);
  return true;
}

export function isRGB(color: string): boolean {
  if (!(color.substring(0, 4) === "rgb(")) return false;
  const RGBNumsSubString = color.substring(
    color.indexOf("(") + 1,
    color.length - 1
  );
  const RGBNums = RGBNumsSubString.split(",");
  if (RGBNums.length > 3) return false;
  for (let i = 0; i < RGBNums.length; i++) {
    let num = Number(RGBNums[i]);
    if (isNaN(num)) return false;
    if (num > 255 || num < 0) return false;
  }
  return true;
}

export function isHex(color: string): boolean {
  if (color[0] !== "#") return false;
  for (let i = 1; i < color.length; i++) {
    if (isNaN(Number(color[i]))) {
      if (color.charCodeAt(i) > 70 || color.charCodeAt(i) < 65) return false;
    }
  }
  return true;
}

export function RGBToHex(color: string): string {
  const RGBNumsSubString = color.substring(
    color.indexOf("(") + 1,
    color.length - 1
  );
  const RGBNums = RGBNumsSubString.split(",");
  let r = (+RGBNums[0]).toString(16);
  let g = (+RGBNums[1]).toString(16);
  let b = (+RGBNums[2]).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

/**Reverse the bytes of the hex color, add alpha value and convert to decimal*/
export function HexToDec(color: string): number {
  let decString = "0xFF";
  for (let i = color.length - 1; i > 0; i = i - 2) {
    let hexByte = color[i - 1] + color[i];
    console.log(hexByte);
    decString += hexByte;
  }

  console.log(decString);
  console.log(parseInt(decString).toString(16));
  return parseInt(decString);
}

/**Converts RGB and HEX colors to decimal that canvas can read*/
export function ColorToDec(color: string): number {
  if (isRGB(color)) return HexToDec(RGBToHex(color));
  if (isHex(color)) return HexToDec(color);
  return -1;
}

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
  firstRender: boolean;
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
  TOGGLE_FIRST_RENDER = "TOGGLE_FIRST_RENDER",
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
      payload: { tileset: Partial<Tileset> };
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
    }
  | {
      type: TilesetEditorActionType.TOGGLE_FIRST_RENDER;
      payload: {};
    };
