import { ConstructionOutlined } from "@mui/icons-material";
import { Tileset } from "../tilesetEditor/TilesetEditTypes";

/**String of type of property**/
export type Type = "string" | "float" | "int" | "bool" | "color" | "object";

export interface Property {
  /**
   * A type that defines a TilemapProperties object on our server.
   * @author Andrew Ojeda
   */

  /** Name of property */
  name: string;

  /** Name of type*/
  ptype: Type;

  /** Value of property */
  value: string;
}

export interface Layer {
  /**
   * A type that defines a layer object on our server.
   * @author Andrew Ojeda
   */

  /** An array of data corresponding to the tiles associated with the tilemap */
  data: number[];

  /** The height of the TileMap (in tiles) */
  height: number;

  /** The width of the TileMap (in tiles) */
  width: number;

  /** The name of the Layer*/
  name: string;

  /**The opacity of the TileMap */
  opacity: number;

  /** A flag indicating whether this TileMapLayer should be visible or not */
  properties: Property[];

  /** A flag indicating whether this Layer should be displayed or not*/
  visible: boolean;

  /** Horizontal layer offset in tiles. Always 0.*/
  x: 0;

  /** Vertical layer offset in tiles. Always 0.*/
  y: 0;
}

export type Orientation =
  | "orthogonal"
  | "isometric"
  | "staggered"
  | "hexagonal";
export type EditMode = "free" | "queue";
export type CollaboratorSettings = {
  editMode: EditMode;
  timeLimit: number;
  tileLimit: number;
};
export type RenderOrder = "right-down" | "right-up" | "left-down" | "up";

export interface Tilemap {
  /**
   * A type that defines a Tilemap object on our server.
   * @author Andrew Ojeda
   */

  /** The id of the associated Tilemap in the DBMS */
  id: string;

  /** The background color of the TileMap */
  backgroundColor: Color;

  /** ObjectID of users who have collaborator permissions enabled for this TileMap project. */
  collaborators: string[];

  /** Names of users who have collaborator permissions enabled for this TileMap project. */
  collaboratorNames: string[];

  /** Settings that determine who can edit the map, how much time per edit, and how many tiles per edit*/
  collaboratorSettings: CollaboratorSettings;

  /** Index of which user can current edit tilemap, -1 if any user has permission*/
  collaboratorIndex: number;

  /** Date When tilemap was created*/
  createDate: Date;

  /** Date When tilemap was last saved */
  lastSaveDate: Date;

  /** Image URL of tilemap*/
  image: string;

  /** The height of the Tilemap (in tiles) */
  height: number;

  /** The width of the Tilemap (in tiles) */
  width: number;

  /** A list of Layers in this TileMap */
  layers: Layer[];

  /** The height of the Tiles in the tilesets */
  tileHeight: number;

  /** The width of the Tiles in the tilesets*/
  tileWidth: number;

  /** Auto-increments for each placed layer */
  nextLayerId: number;

  /** Auto-increments for each placed object */
  nextObjectId: number;

  /** The orientation of this TileMap */
  orientation: Orientation;

  /** The name of the Tilemap*/
  name: string;

  /** Represents the id of the user who is the owner of the tile set */
  owner: string;

  /** Represents an array of properties of the tile set */
  properties: Property[];

  /** Array of tilesets ids used in tilemap */
  tilesets: string[];

  /** Global Tile IDs of each Tileset */
  globalTileIDs: number[];

  /** The order in which the tiles for this TileMap should be rendered*/
  renderOrder: RenderOrder;

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

/**determines which editing tool the user is using for Tilemap*/
export enum TilemapEditControl {
  draw = "DRAW",
  erase = "ERASE",
  shapeFill = "SHAPE_FILL",
  bucketFill = "BUCKET_FILL",
  magicWand = "MAGIC_WAND",
  sameTileSelect = "SAME_TILE_SELECT",
  fillSelect = "FILL_SELECT",
}

/** determines which modal to open in the Tilemap editor, closed by default*/
export enum TilemapEditorModalType {
  close = "CLOSE",
  delete = "DELETE",
  publish = "PUBLISH",
  download = "DOWNLOAD",
  collab = "COLLAB",
  uploadTileSet = "UPLOAD_TILESET",
  uploadTileMap = "UPLOAD_TILEMAP",
  save = "SAVE",
  error = "ERROR",
}
/**
 * The type of the Tilemap Edit Store's state variable.
 */
export interface TilemapEditorState {
  Tilemap: Tilemap;
  Tilesets: Tileset[];
  currentEditControl: TilemapEditControl;
  currentLayerIndex: number;
  currentSwapIndex: number;
  currentTilesetIndex: number;
  currentTileIndex: number;
  currentSelection: number[]; //array of indices of tiles selected for editing
  modalType: TilemapEditorModalType;
  isSaved: boolean;
  renderTilemapCanvas: boolean;
  renderTilemapGridCanvas: boolean;
  renderCurrentLayerCanvas: boolean;
  renderTileSelectorCanvas: boolean;
}

/**
 * The types of actions/events the Tilemap edit store needs to handle.
 */
export enum TilemapEditorActionType {
  CREATE_NEW_TILEMAP = "CREATE_NEW_TILEMAP",
  UPDATE_TILEMAP = "UPDATE_TILEMAP",
  SAVE_TILEMAP = "SAVE_TILEMAP",
  CHANGE_EDIT_CONTROL = "CHANGE_EDIT_CONTROL",
  UPDATE_CURRENT_TILE = "UPDATE_CURRENT_TILE",
  UPDATE_CURRENT_TILESET = "UPDATE_CURRENT_TILESET",
  UPDATE_CURRENT_LAYER = "UPDATE_CURRENT_LAYER",
  UPDATE_LAYER_INFO = "UPDATE_LAYER_INFO",
  UPDATE_CURRENT_LAYER_DATA = "UPDATE_CURRENT_LAYER_DATA",
  UPDATE_SWAP_INDEX = "UPDATE_SWAP_INDEX",
  SWAP_LAYERS = "SWAP_LAYERS",
  CREATE_NEW_LAYER = "CREATE_NEW_LAYER",
  DELETE_LAYER = "DELETE_LAYER",
  CREATE_PROPERTY = "CREATE_PROPERTY",
  UPDATE_PROPERTY = "UPDATE_PROPERTY",
  DELETE_PROPERTY = "DELETE_PROPERTY",
  UPDATE_CURRENT_SELECTION = "UPDATE_CURRENT_SELECTION",
  PREVENT_TILEMAP_CANVAS_RENDER = "PREVENT_TILEMAP_CANVAS_RENDER",
  PREVENT_GRID_CANVAS_RENDER = "PREVENT_GRID_CANVAS_RENDER",
  RENDER_CURRENT_LAYER_CANVAS_RENDER = "RENDER_CURRENT_LAYER_CANVAS_RENDER",
  PREVENT_TILE_SELECTION_CANVAS_RENDER = "PREVENT_TILEMAP_CANVAS_RENDER",
}

/**action type and payload pairs*/
export type TilemapEditorAction =
  | {
      type: TilemapEditorActionType.CHANGE_EDIT_CONTROL;
      payload: { editControl: TilemapEditControl };
    }
  | {
      type: TilemapEditorActionType.CREATE_NEW_TILEMAP;
      payload: { Tilemap: Tilemap };
    }
  | {
      type: TilemapEditorActionType.UPDATE_TILEMAP;
      payload: { Tilemap: Partial<Tilemap> };
    }
  | {
      type: TilemapEditorActionType.SAVE_TILEMAP;
      payload: { Tilemap: Tilemap };
    }
  | {
      type: TilemapEditorActionType.UPDATE_CURRENT_TILE;
      payload: { currentTileIndex: number };
    }
  | {
      type: TilemapEditorActionType.UPDATE_CURRENT_LAYER;
      payload: { currentLayerIndex: number };
    }
  | {
      type: TilemapEditorActionType.UPDATE_LAYER_INFO;
      payload: { name: string; visibility: boolean; index: number };
    }
  | {
      type: TilemapEditorActionType.CREATE_NEW_LAYER;
      payload: { name: string; data: number[] };
    }
  | {
      type: TilemapEditorActionType.DELETE_LAYER;
      payload: { index: number; currentLayerIndex: number };
    }
  | {
      type: TilemapEditorActionType.UPDATE_CURRENT_LAYER_DATA;
      payload: { currentTileIndex: number; updateData: number[] };
    }
  | {
      type: TilemapEditorActionType.UPDATE_SWAP_INDEX;
      payload: { swapIndex: number };
    }
  | {
      type: TilemapEditorActionType.SWAP_LAYERS;
      payload: { swapIndex: number; currentLayerIndex: number };
    }
  | {
      type: TilemapEditorActionType.UPDATE_CURRENT_TILESET;
      payload: { currentTilesetIndex: number };
    }
  | {
      type: TilemapEditorActionType.CREATE_PROPERTY;
      payload: { property: Property };
    }
  | {
      type: TilemapEditorActionType.UPDATE_PROPERTY;
      payload: { property: Property; index: number };
    }
  | {
      type: TilemapEditorActionType.DELETE_PROPERTY;
      payload: { index: number };
    }
  | {
      type: TilemapEditorActionType.UPDATE_CURRENT_SELECTION;
      payload: { currentSelection: number[] };
    }
  | {
      type: TilemapEditorActionType.PREVENT_TILEMAP_CANVAS_RENDER;
      payload: {};
    }
  | {
      type: TilemapEditorActionType.PREVENT_GRID_CANVAS_RENDER;
      payload: {};
    }
  | {
      type: TilemapEditorActionType.RENDER_CURRENT_LAYER_CANVAS_RENDER;
      payload: { willRender: boolean };
    }
  | {
      type: TilemapEditorActionType.PREVENT_TILE_SELECTION_CANVAS_RENDER;
      payload: {};
    };
