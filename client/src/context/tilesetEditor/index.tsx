import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*
    Store for the tileset editor
    
    @author Andrew Ojeda
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const TilesetEditorStoreContext = createContext({});

/**String of type of property**/
export type Type = "string" | "float" | "int" | "bool" | "color" | "object";

interface Property {
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

interface Tileset {
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

//color types, limits color to specific string formats
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type Color = RGB | RGBA | HEX;

//determines which editing tool the user is using
enum TilesetEditControl {
  draw = "DRAW",
  erase = "ERASE",
  fill = "FILL",
}

//determines which modal to open, closed by default
enum ModalType {
  close = "CLOSE",
  delete = "DELETE",
  publish = "PUBLISH",
  download = "DOWNLOAD",
  upload = "UPLOAD",
  save = "SAVE",
  error = "ERROR",
}

// THESE ARE ALL THE TYPES OF UPDATES TO OUR TILESET EDITOR
// DATA STORE STATE THAT CAN BE PROCESSED
enum TilesetEditorStoreActionType {
  changeTilesetName = "CHANGE_TILESET_NAME",
  createNewTileset = "CREATE_NEW_TILESET",
  updateTileset = "UPDATE_TILESET",
  saveTileset = "SAVE_TILESET",
  changeEditControl = "CHANGE_EDIT_CONTROL",
  updateGrid = "UPDATE_GRID",
  toggleRestrictToTile = "TOGGLE_RESTRICT_TO_TILE",
  updatePen = "UPDATE_PEN",
  updateColors = "UPDATE_COLORS",
  openModal = "OPEN_MODAL",
  closeModal = "CLOSE_MODAL",
}

//interface for the current state of the TilesetEditor
interface ITilesetEditorStore {
  tileSet: Tileset;
  currentEditControl: TilesetEditControl;
  penSize: number;
  penColor: Color;
  savedColors: Color[];
  gridEnabled: boolean;
  restrictToTile: boolean;
  gridSize: number;
  gridColor: Color;
  modalType: ModalType;
  isSaved: boolean;
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
// const tps = new jsTPS();

function TilesetEditorStoreContextProvider() {
  // THESE ARE ALL THE THINGS OUR TILESET STORE WILL MANAGE
  const [store, setStore] = useState<ITilesetEditorStore>({
    tileSet: {
      id: "",
      columns: 0,
      createDate: new Date(),
      lastSaveDate: new Date(),
      image: "",
      imageHeight: 0,
      imageWidth: 0,
      margin: 0,
      name: "",
      owner: "",
      properties: [],
      isPublished: false,
    },
    currentEditControl: TilesetEditControl.draw,
    penSize: 1,
    penColor: "#000000",
    savedColors: [],
    gridEnabled: true,
    restrictToTile: false,
    gridSize: 1,
    gridColor: "#000000",
    modalType: ModalType.close,
    isSaved: false,
  });

  type Action =
    | {
        type: TilesetEditorStoreActionType.changeTilesetName;
        payload: { name: string };
      }
    | {
        type: TilesetEditorStoreActionType.changeEditControl;
        payload: { editControl: TilesetEditControl };
      }
    | {
        type: TilesetEditorStoreActionType.createNewTileset;
        payload: { tileset: Tileset };
      }
    | {
        type: TilesetEditorStoreActionType.updateTileset;
        payload: { tileset: Tileset };
      }
    | {
        type: TilesetEditorStoreActionType.saveTileset;
        payload: { tileset: Tileset };
      }
    | {
        type: TilesetEditorStoreActionType.updateGrid;
        payload: { gridEnabled: boolean; gridSize: number; gridColor: Color };
      }
    | {
        type: TilesetEditorStoreActionType.updatePen;
        payload: { size: number; color: Color };
      }
    | {
        type: TilesetEditorStoreActionType.updateColors;
        payload: { colors: [Color] };
      }
    | {
        type: TilesetEditorStoreActionType.toggleRestrictToTile;
        payload: {};
      }
    | {
        type: TilesetEditorStoreActionType.openModal;
        payload: { modal: ModalType };
      }
    | {
        type: TilesetEditorStoreActionType.closeModal;
        payload: {};
      };

  // HERE'S THE DATA STORE'S REDUCER, IT MUST
  // HANDLE EVERY TYPE OF STATE CHANGE
  const storeReducer = (action: Action) => {
    const { type, payload } = action;
    if (store) {
      switch (type) {
        case TilesetEditorStoreActionType.createNewTileset: {
          setStore({
            tileSet: payload.tileset,
            currentEditControl: TilesetEditControl.draw,
            penSize: 1,
            penColor: "#000000",
            savedColors: [],
            gridEnabled: true,
            restrictToTile: false,
            gridSize: 1,
            gridColor: "#000000",
            modalType: ModalType.close,
            isSaved: true,
          });
          break;
        }
        case TilesetEditorStoreActionType.updateTileset: {
          setStore({
            tileSet: payload.tileset,
            currentEditControl: store.currentEditControl,
            penSize: store.penSize,
            penColor: store.penColor,
            savedColors: store.savedColors,
            gridEnabled: store.gridEnabled,
            restrictToTile: store.restrictToTile,
            gridSize: store.gridSize,
            gridColor: store.gridColor,
            modalType: ModalType.close,
            isSaved: false,
          });
          break;
        }
        case TilesetEditorStoreActionType.saveTileset: {
          setStore({
            tileSet: payload.tileset,
            currentEditControl: store.currentEditControl,
            penSize: store.penSize,
            penColor: store.penColor,
            savedColors: store.savedColors,
            gridEnabled: store.gridEnabled,
            restrictToTile: store.restrictToTile,
            gridSize: store.gridSize,
            gridColor: store.gridColor,
            modalType: ModalType.close,
            isSaved: store.isSaved,
          });
          break;
        }
        case TilesetEditorStoreActionType.changeEditControl: {
          setStore({
            tileSet: store.tileSet,
            currentEditControl: payload.editControl,
            penSize: store.penSize,
            penColor: store.penColor,
            savedColors: store.savedColors,
            gridEnabled: store.gridEnabled,
            restrictToTile: store.restrictToTile,
            gridSize: store.gridSize,
            gridColor: store.gridColor,
            modalType: ModalType.close,
            isSaved: store.isSaved,
          });
          break;
        }
        case TilesetEditorStoreActionType.updatePen: {
          setStore({
            tileSet: store.tileSet,
            currentEditControl: store.currentEditControl,
            penSize: payload.size,
            penColor: payload.color,
            savedColors: store.savedColors,
            gridEnabled: store.gridEnabled,
            restrictToTile: store.restrictToTile,
            gridSize: store.gridSize,
            gridColor: store.gridColor,
            modalType: ModalType.close,
            isSaved: store.isSaved,
          });
          break;
        }
        case TilesetEditorStoreActionType.updateGrid: {
          setStore({
            tileSet: store.tileSet,
            currentEditControl: store.currentEditControl,
            penSize: store.penSize,
            penColor: store.penColor,
            savedColors: store.savedColors,
            gridEnabled: payload.gridEnabled,
            restrictToTile: store.restrictToTile,
            gridSize: payload.gridSize,
            gridColor: payload.gridColor,
            modalType: ModalType.close,
            isSaved: store.isSaved,
          });
          break;
        }
        case TilesetEditorStoreActionType.updateColors: {
          setStore({
            tileSet: store.tileSet,
            currentEditControl: store.currentEditControl,
            penSize: store.penSize,
            penColor: store.penColor,
            savedColors: payload.colors,
            gridEnabled: store.gridEnabled,
            restrictToTile: store.restrictToTile,
            gridSize: store.gridSize,
            gridColor: store.gridColor,
            modalType: ModalType.close,
            isSaved: store.isSaved,
          });
          break;
        }
        case TilesetEditorStoreActionType.toggleRestrictToTile: {
          setStore({
            tileSet: store.tileSet,
            currentEditControl: store.currentEditControl,
            penSize: store.penSize,
            penColor: store.penColor,
            savedColors: store.savedColors,
            gridEnabled: store.gridEnabled,
            restrictToTile: !store.restrictToTile,
            gridSize: store.gridSize,
            gridColor: store.gridColor,
            modalType: ModalType.close,
            isSaved: store.isSaved,
          });
          break;
        }
        case TilesetEditorStoreActionType.openModal: {
          setStore({
            tileSet: store.tileSet,
            currentEditControl: store.currentEditControl,
            penSize: store.penSize,
            penColor: store.penColor,
            savedColors: store.savedColors,
            gridEnabled: store.gridEnabled,
            restrictToTile: store.restrictToTile,
            gridSize: store.gridSize,
            gridColor: store.gridColor,
            modalType: payload.modal,
            isSaved: store.isSaved,
          });
          break;
        }
        case TilesetEditorStoreActionType.closeModal: {
          setStore({
            tileSet: store.tileSet,
            currentEditControl: store.currentEditControl,
            penSize: store.penSize,
            penColor: store.penColor,
            savedColors: store.savedColors,
            gridEnabled: store.gridEnabled,
            restrictToTile: store.restrictToTile,
            gridSize: store.gridSize,
            gridColor: store.gridColor,
            modalType: ModalType.close,
            isSaved: store.isSaved,
          });
          break;
        }
        default:
          return store;
      }
    }
  };

  const createTileset = (name: string) => {
    const newTileset: Tileset = {
      id: "",
      columns: 0,
      createDate: new Date(),
      lastSaveDate: new Date(),
      image: "",
      imageHeight: 0,
      imageWidth: 0,
      margin: 0,
      name: name,
      owner: "",
      properties: [],
      isPublished: false,
    };
    storeReducer({
      type: TilesetEditorStoreActionType.createNewTileset,
      payload: {
        tileset: newTileset,
      },
    });
  };

  const updateTileset = (tileset: Tileset) => {
    storeReducer({
      type: TilesetEditorStoreActionType.updateTileset,
      payload: {
        tileset,
      },
    });
  };

  const updateEditControl = (editControl: TilesetEditControl) => {
    storeReducer({
      type: TilesetEditorStoreActionType.changeEditControl,
      payload: {
        editControl,
      },
    });
  };

  const updatePen = (size: number, color: Color) => {
    storeReducer({
      type: TilesetEditorStoreActionType.updatePen,
      payload: {
        size,
        color,
      },
    });
  };

  const toggleGrid = () => {
    storeReducer({
      type: TilesetEditorStoreActionType.updateGrid,
      payload: {
        gridEnabled: !store.gridEnabled,
        gridSize: store.gridSize,
        gridColor: store.gridColor,
      },
    });
  };

  const updateGrid = (gridSize: number, gridColor: Color) => {
    storeReducer({
      type: TilesetEditorStoreActionType.updateGrid,
      payload: {
        gridEnabled: store.gridEnabled,
        gridSize,
        gridColor,
      },
    });
  };

  const updateColors = (colors: [Color]) => {
    storeReducer({
      type: TilesetEditorStoreActionType.updateColors,
      payload: {
        colors,
      },
    });
  };

  const toggleRestrictToTile = () => {
    storeReducer({
      type: TilesetEditorStoreActionType.toggleRestrictToTile,
      payload: {},
    });
  };

  return (
    <TilesetEditorStoreContext.Provider
      value={{
        store,
      }}
    >
      {}
    </TilesetEditorStoreContext.Provider>
  );
}

export default TilesetEditorStoreContext;
export { TilesetEditorStoreContextProvider };
