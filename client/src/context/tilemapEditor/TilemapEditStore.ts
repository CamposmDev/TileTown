import { ThirteenMp } from "@mui/icons-material";
import { Action } from "@remix-run/router";
import { NavigateFunction } from "react-router";
import TilesetCanvas from "src/components/screen/tileset-editor/TilesetCanvas";
import {
  Color,
  Tilemap,
  TilemapEditorState,
  TilemapEditControl,
  TilemapEditorModalType,
  TilemapEditorActionType,
  TilemapEditorAction,
} from "./TilemapEditTypes";

/**
 * A wrapper class that wraps around our "edit" state. Basically this class is the store. It contains
 * all of the dispatch functions for manipulating the state and the reducer for updating the state.
 */
export class TilemapEditStore {
  private readonly _state: TilemapEditorState;
  private readonly setEdit: (edit: TilemapEditorState) => void;
  private readonly nav: NavigateFunction;

  constructor(
    edit: TilemapEditorState,
    setEdit: (state: TilemapEditorState) => void,
    nav: NavigateFunction
  ) {
    this._state = edit;
    this.setEdit = setEdit;
    this.nav = nav;
  }

  public get state(): TilemapEditorState {
    return this._state;
  }

  public async createTilemap(name: string): Promise<void> {
    const newTilemap: Tilemap = {
      id: "",
      backgroundColor: "#FFFFFF",
      collaborators: [],
      collaboratorNames: [],
      collaboratorSettings: { editMode: "free", timeLimit: 0, tileLimit: 0 },
      collaboratorIndex: -1,
      createDate: new Date(),
      lastSaveDate: new Date(),
      image: "",
      height: 12,
      width: 12,
      layers: [
        {
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
          ],
          name: "layer 1",
          height: 12,
          width: 12,
          opacity: 1,
          properties: [],
          visible: true,
          x: 0,
          y: 0,
        },
      ],
      tileHeight: 10,
      tileWidth: 10,
      nextLayerId: 2,
      nextObjectId: 0,
      orientation: "orthogonal",
      name: "",
      owner: "",
      properties: [],
      tilesets: [],
      globalTileIDs: [0],
      renderOrder: "right-down",
      isPublished: false,
    };
    this.handleAction({
      type: TilemapEditorActionType.CREATE_NEW_TILEMAP,
      payload: {
        Tilemap: newTilemap,
      },
    });
  }

  public async updateTilemap(Tilemap: Partial<Tilemap>): Promise<void> {
    this.handleAction({
      type: TilemapEditorActionType.UPDATE_TILEMAP,
      payload: {
        Tilemap,
      },
    });
  }

  public async updateEditControl(
    editControl: TilemapEditControl
  ): Promise<void> {
    this.handleAction({
      type: TilemapEditorActionType.CHANGE_EDIT_CONTROL,
      payload: {
        editControl,
      },
    });
  }

  public async updateCurrentTile(currentTileIndex: number): Promise<void> {
    this.handleAction({
      type: TilemapEditorActionType.UPDATE_CURRENT_TILE,
      payload: { currentTileIndex },
    });
  }

  public async updateCurrentSelection(
    currentSelection: number[]
  ): Promise<void> {
    console.log(currentSelection);
    this.handleAction({
      type: TilemapEditorActionType.UPDATE_CURRENT_SELECTION,
      payload: { currentSelection },
    });
  }

  /**
   * This is the reducer function for the auth store.
   * @param action the type of the action
   * @param payload the data associated with the action
   */
  protected handleAction(action: TilemapEditorAction): void {
    const { type, payload } = action;
    switch (type) {
      case TilemapEditorActionType.CREATE_NEW_TILEMAP: {
        this.handleCreateNewTilemap(payload.Tilemap);
        break;
      }
      case TilemapEditorActionType.UPDATE_TILEMAP: {
        this.handleUpdateTilemap(payload.Tilemap);
        break;
      }
      case TilemapEditorActionType.SAVE_TILEMAP: {
        this.handleSaveTilemap(payload.Tilemap);
        break;
      }
      case TilemapEditorActionType.CHANGE_EDIT_CONTROL: {
        this.handleChangeEditControl(payload.editControl);
        break;
      }
      case TilemapEditorActionType.OPEN_MODAL: {
        this.handleOpenModal(payload.modal);
        break;
      }
      case TilemapEditorActionType.CLOSE_MODAL: {
        this.handleCloseModal();
        break;
      }
      case TilemapEditorActionType.UPDATE_CURRENT_TILE: {
        this.handleUpdateCurrentTile(payload.currentTileIndex);
        break;
      }
      case TilemapEditorActionType.UPDATE_CURRENT_SELECTION: {
        this.handleUpdateSelection(payload.currentSelection);
        break;
      }
      default: {
        throw new Error(
          `Unhandled action with type ${action} caught in auth reducer`
        );
      }
    }
  }
  protected handleUpdateSelection(currentSelection: number[]): void {
    this.setEdit({
      Tilemap: this._state.Tilemap,
      Tilesets: this._state.Tilesets,
      currentEditControl: this._state.currentEditControl,
      currentLayerIndex: this._state.currentLayerIndex,
      currentTilesetIndex: this._state.currentTilesetIndex,
      currentTileIndex: this._state.currentTilesetIndex,
      currentSelection,
      modalType: TilemapEditorModalType.close,
      isSaved: this._state.isSaved,
    });
  }
  protected handleUpdateCurrentTile(currentTileIndex: number): void {
    this.setEdit({
      Tilemap: this._state.Tilemap,
      Tilesets: this._state.Tilesets,
      currentEditControl: this._state.currentEditControl,
      currentLayerIndex: this._state.currentLayerIndex,
      currentTilesetIndex: this._state.currentTilesetIndex,
      currentTileIndex,
      currentSelection: this._state.currentSelection,
      modalType: TilemapEditorModalType.close,
      isSaved: this._state.isSaved,
    });
  }

  protected handleCreateNewTilemap(Tilemap: Tilemap): void {
    this.setEdit({
      Tilemap,
      Tilesets: this._state.Tilesets,
      currentEditControl: this._state.currentEditControl,
      currentLayerIndex: this._state.currentLayerIndex,
      currentTilesetIndex: this._state.currentTilesetIndex,
      currentTileIndex: this._state.currentTileIndex,
      currentSelection: this._state.currentSelection,
      modalType: TilemapEditorModalType.close,
      isSaved: this._state.isSaved,
    });
  }

  protected handleUpdateTilemap(Tilemap: Partial<Tilemap>): void {
    const updatedTilemap: Tilemap = {
      id: this._state.Tilemap.id,
      backgroundColor: Tilemap.backgroundColor
        ? Tilemap.backgroundColor
        : this._state.Tilemap.backgroundColor,
      collaborators: this._state.Tilemap.collaborators,
      collaboratorNames: this._state.Tilemap.collaboratorNames,
      collaboratorSettings: Tilemap.collaboratorSettings
        ? Tilemap.collaboratorSettings
        : this._state.Tilemap.collaboratorSettings,
      collaboratorIndex: Tilemap.collaboratorIndex
        ? Tilemap.collaboratorIndex
        : this._state.Tilemap.collaboratorIndex,
      createDate: this._state.Tilemap.createDate,
      lastSaveDate: this._state.Tilemap.lastSaveDate,
      image: this._state.Tilemap.image,
      height: Tilemap.height ? Tilemap.height : this._state.Tilemap.height,
      width: Tilemap.width ? Tilemap.width : this._state.Tilemap.width,
      layers: this._state.Tilemap.layers,
      tileHeight: Tilemap.tileHeight
        ? Tilemap.tileHeight
        : this._state.Tilemap.tileHeight,
      tileWidth: Tilemap.tileWidth
        ? Tilemap.tileWidth
        : this._state.Tilemap.tileWidth,
      nextLayerId: this._state.Tilemap.nextLayerId,
      nextObjectId: this._state.Tilemap.nextObjectId,
      orientation: this._state.Tilemap.orientation,
      name: Tilemap.name ? Tilemap.name : this._state.Tilemap.name,
      owner: this._state.Tilemap.owner,
      properties: this._state.Tilemap.properties,
      tilesets: this._state.Tilemap.tilesets,
      globalTileIDs: this._state.Tilemap.globalTileIDs,
      renderOrder: this._state.Tilemap.renderOrder,
      isPublished: false,
    };

    this.setEdit({
      Tilemap: updatedTilemap,
      Tilesets: this._state.Tilesets,
      currentEditControl: this._state.currentEditControl,
      currentLayerIndex: this._state.currentLayerIndex,
      currentTilesetIndex: this._state.currentTilesetIndex,
      currentTileIndex: this._state.currentTileIndex,
      currentSelection: this._state.currentSelection,
      modalType: TilemapEditorModalType.close,
      isSaved: this._state.isSaved,
    });
  }

  protected handleSaveTilemap(Tilemap: Tilemap): void {
    this.setEdit({
      Tilemap,
      Tilesets: this._state.Tilesets,
      currentEditControl: this._state.currentEditControl,
      currentLayerIndex: this._state.currentLayerIndex,
      currentTilesetIndex: this._state.currentTilesetIndex,
      currentTileIndex: this._state.currentTileIndex,
      currentSelection: this._state.currentSelection,
      modalType: TilemapEditorModalType.close,
      isSaved: true,
    });
  }

  protected handleChangeEditControl(editControl: TilemapEditControl): void {
    this.setEdit({
      Tilemap: this._state.Tilemap,
      currentEditControl: editControl,
      Tilesets: this._state.Tilesets,
      currentLayerIndex: this._state.currentLayerIndex,
      currentTilesetIndex: this._state.currentTilesetIndex,
      currentTileIndex: this._state.currentTileIndex,
      currentSelection: this._state.currentSelection,
      modalType: TilemapEditorModalType.close,
      isSaved: this._state.isSaved,
    });
  }

  protected handleCloseModal(): void {
    this.setEdit({
      Tilemap: this._state.Tilemap,
      Tilesets: this._state.Tilesets,
      currentEditControl: this._state.currentEditControl,
      currentLayerIndex: this._state.currentLayerIndex,
      currentTilesetIndex: this._state.currentTilesetIndex,
      currentTileIndex: this._state.currentTileIndex,
      currentSelection: this._state.currentSelection,
      modalType: TilemapEditorModalType.close,
      isSaved: this._state.isSaved,
    });
  }

  protected handleOpenModal(modalType: TilemapEditorModalType): void {
    this.setEdit({
      Tilemap: this._state.Tilemap,
      Tilesets: this._state.Tilesets,
      currentEditControl: this._state.currentEditControl,
      currentLayerIndex: this._state.currentLayerIndex,
      currentTilesetIndex: this._state.currentTilesetIndex,
      currentTileIndex: this._state.currentTileIndex,
      currentSelection: this._state.currentSelection,
      modalType,
      isSaved: this._state.isSaved,
    });
  }
}
