import { ThirteenMp } from "@mui/icons-material";
import { Action } from "@remix-run/router";
import { NavigateFunction } from "react-router";
import {
  Color,
  Tileset,
  TilesetEditorState,
  TilesetEditControl,
  TilesetEditorModalType,
  TilesetEditorActionType,
  TilesetEditorAction,
} from "./TilesetEditTypes";

/**
 * A wrapper class that wraps around our "edit" state. Basically this class is the store. It contains
 * all of the dispatch functions for manipulating the state and the reducer for updating the state.
 */
export class TilesetEditStore {
  private readonly _state: TilesetEditorState;
  private readonly setEdit: (edit: TilesetEditorState) => void;
  private readonly nav: NavigateFunction;

  constructor(
    edit: TilesetEditorState,
    setEdit: (state: TilesetEditorState) => void,
    nav: NavigateFunction
  ) {
    this._state = edit;
    this.setEdit = setEdit;
    this.nav = nav;
  }

  public get state(): TilesetEditorState {
    return this._state;
  }

  public async createTileset(name: string): Promise<void> {
    const newTileset: Tileset = {
      id: "",
      columns: 12,
      rows: 12,
      createDate: new Date(),
      lastSaveDate: new Date(),
      image: "",
      imageHeight: 120,
      imageWidth: 120,
      tileHeight: 10,
      tileWidth: 10,
      margin: 0,
      name: name,
      owner: "",
      properties: [],
      isPublished: false,
    };
    this.handleAction({
      type: TilesetEditorActionType.CREATE_NEW_TILESET,
      payload: {
        tileset: newTileset,
      },
    });
  }

  public async updateTileset(tileset: Partial<Tileset>): Promise<void> {
    console.log(tileset);
    this.handleAction({
      type: TilesetEditorActionType.UPDATE_TILESET,
      payload: {
        tileset,
      },
    });
  }

  public async updateEditControl(
    editControl: TilesetEditControl
  ): Promise<void> {
    this.handleAction({
      type: TilesetEditorActionType.CHANGE_EDIT_CONTROL,
      payload: {
        editControl,
      },
    });
  }

  public async updatePen(size: number, color: Color): Promise<void> {
    this.handleAction({
      type: TilesetEditorActionType.UPDATE_PEN,
      payload: {
        size,
        color,
      },
    });
  }

  public async toggleGrid(): Promise<void> {
    this.handleAction({
      type: TilesetEditorActionType.UPDATE_GRID,
      payload: {
        gridEnabled: !this._state.gridEnabled,
        gridSize: this._state.gridSize,
        gridColor: this._state.gridColor,
      },
    });
  }

  public async updateGrid(gridSize: number, gridColor: Color): Promise<void> {
    this.handleAction({
      type: TilesetEditorActionType.UPDATE_GRID,
      payload: {
        gridEnabled: this._state.gridEnabled,
        gridSize,
        gridColor,
      },
    });
  }

  public async updateColors(colors: [Color]): Promise<void> {
    this.handleAction({
      type: TilesetEditorActionType.UPDATE_COLORS,
      payload: {
        colors,
      },
    });
  }

  public async toggleRestrictToTile(): Promise<void> {
    this.handleAction({
      type: TilesetEditorActionType.TOGGLE_RESTRICT_TO_TILE,
      payload: {},
    });
  }

  public async toggleFirstRender(): Promise<void> {
    this.handleAction({
      type: TilesetEditorActionType.TOGGLE_FIRST_RENDER,
      payload: {},
    });
  }

  public async updateZoom(zoom: number): Promise<void> {
    this.handleAction({
      type: TilesetEditorActionType.UPDATE_ZOOM,
      payload: { zoom },
    });
  }

  /**
   * This is the reducer function for the auth store.
   * @param action the type of the action
   * @param payload the data associated with the action
   */
  protected handleAction(action: TilesetEditorAction): void {
    const { type, payload } = action;
    switch (type) {
      case TilesetEditorActionType.CREATE_NEW_TILESET: {
        this.handleCreateNewTileset(payload.tileset);
        break;
      }
      case TilesetEditorActionType.UPDATE_TILESET: {
        this.handleUpdateTileset(payload.tileset);
        break;
      }
      case TilesetEditorActionType.SAVE_TILESET: {
        this.handleSaveTileset(payload.tileset);
        break;
      }
      case TilesetEditorActionType.CHANGE_EDIT_CONTROL: {
        this.handleChangeEditControl(payload.editControl);
        break;
      }
      case TilesetEditorActionType.UPDATE_PEN: {
        this.handleUpdatePen(payload);
        break;
      }
      case TilesetEditorActionType.UPDATE_COLORS: {
        this.handleUpdateColors(payload.colors);
        break;
      }
      case TilesetEditorActionType.UPDATE_GRID: {
        this.handleUpdateGrid(payload);
        break;
      }
      case TilesetEditorActionType.TOGGLE_RESTRICT_TO_TILE: {
        this.handleToggleRestrictToTile();
        break;
      }
      case TilesetEditorActionType.OPEN_MODAL: {
        this.handleOpenModal(payload.modal);
        break;
      }
      case TilesetEditorActionType.CLOSE_MODAL: {
        this.handleCloseModal();
        break;
      }
      case TilesetEditorActionType.TOGGLE_FIRST_RENDER: {
        this.handleToggleFirstRender();
        break;
      }
      case TilesetEditorActionType.UPDATE_ZOOM: {
        this.handleUpdateZoom(payload.zoom);
        break;
      }
      default: {
        throw new Error(
          `Unhandled action with type ${action} caught in auth reducer`
        );
      }
    }
  }
  protected handleUpdateZoom(zoom: number): void {
    this.setEdit({
      tileset: this._state.tileset,
      currentEditControl: this._state.currentEditControl,
      penSize: this._state.penSize,
      penColor: this._state.penColor,
      savedColors: this._state.savedColors,
      gridEnabled: this._state.gridEnabled,
      restrictToTile: this._state.restrictToTile,
      gridSize: this._state.gridSize,
      gridColor: this._state.gridColor,
      modalType: TilesetEditorModalType.close,
      isSaved: this._state.isSaved,
      firstRender: this._state.firstRender,
      zoom,
    });
  }
  protected handleToggleFirstRender(): void {
    this.setEdit({
      tileset: this._state.tileset,
      currentEditControl: this._state.currentEditControl,
      penSize: this._state.penSize,
      penColor: this._state.penColor,
      savedColors: this._state.savedColors,
      gridEnabled: this._state.gridEnabled,
      restrictToTile: this._state.restrictToTile,
      gridSize: this._state.gridSize,
      gridColor: this._state.gridColor,
      modalType: TilesetEditorModalType.close,
      isSaved: this._state.isSaved,
      firstRender: !this._state.firstRender,
      zoom: this._state.zoom,
    });
  }

  protected handleCreateNewTileset(tileset: Tileset): void {
    this.setEdit({
      tileset,
      currentEditControl: TilesetEditControl.draw,
      penSize: 1,
      penColor: "#000000",
      savedColors: [],
      gridEnabled: true,
      restrictToTile: false,
      gridSize: 1,
      gridColor: "#000000",
      modalType: TilesetEditorModalType.close,
      isSaved: true,
      firstRender: true,
      zoom: this._state.zoom,
    });
  }

  protected handleUpdateTileset(tileset: Partial<Tileset>): void {
    const updatedTileset: Tileset = {
      id: this._state.tileset.id,
      columns: tileset.columns ? tileset.columns : this._state.tileset.columns,
      rows: tileset.rows ? tileset.rows : this._state.tileset.rows,
      createDate: this._state.tileset.createDate,
      lastSaveDate: this._state.tileset.lastSaveDate,
      image: this._state.tileset.image,
      imageHeight: tileset.imageHeight
        ? tileset.imageHeight
        : this._state.tileset.imageHeight,
      imageWidth: tileset.imageWidth
        ? tileset.imageWidth
        : this._state.tileset.imageWidth,
      tileHeight: tileset.tileHeight
        ? tileset.tileHeight
        : this._state.tileset.tileHeight,
      tileWidth: tileset.tileWidth
        ? tileset.tileWidth
        : this._state.tileset.imageWidth,
      margin: tileset.margin ? tileset.margin : this._state.tileset.margin,
      name: tileset.name ? tileset.name : this._state.tileset.name,
      owner: this._state.tileset.owner,
      properties: tileset.properties
        ? tileset.properties
        : this._state.tileset.properties,
      isPublished: false,
    };

    this.setEdit({
      tileset: updatedTileset,
      currentEditControl: this._state.currentEditControl,
      penSize: this._state.penSize,
      penColor: this._state.penColor,
      savedColors: this._state.savedColors,
      gridEnabled: this._state.gridEnabled,
      restrictToTile: this._state.restrictToTile,
      gridSize: this._state.gridSize,
      gridColor: this._state.gridColor,
      modalType: TilesetEditorModalType.close,
      isSaved: false,
      firstRender: this._state.firstRender,
      zoom: this._state.zoom,
    });
  }

  protected handleSaveTileset(tileset: Tileset): void {
    this.setEdit({
      tileset,
      currentEditControl: this._state.currentEditControl,
      penSize: this._state.penSize,
      penColor: this._state.penColor,
      savedColors: this._state.savedColors,
      gridEnabled: this._state.gridEnabled,
      restrictToTile: this._state.restrictToTile,
      gridSize: this._state.gridSize,
      gridColor: this._state.gridColor,
      modalType: TilesetEditorModalType.close,
      isSaved: true,
      firstRender: this._state.firstRender,
      zoom: this._state.zoom,
    });
  }

  protected handleChangeEditControl(editControl: TilesetEditControl): void {
    this.setEdit({
      tileset: this._state.tileset,
      currentEditControl: editControl,
      penSize: this._state.penSize,
      penColor: this._state.penColor,
      savedColors: this._state.savedColors,
      gridEnabled: this._state.gridEnabled,
      restrictToTile: this._state.restrictToTile,
      gridSize: this._state.gridSize,
      gridColor: this._state.gridColor,
      modalType: TilesetEditorModalType.close,
      isSaved: false,
      firstRender: this._state.firstRender,
      zoom: this._state.zoom,
    });
  }

  protected handleUpdatePen(payload: { size: number; color: Color }): void {
    this.setEdit({
      tileset: this._state.tileset,
      currentEditControl: this._state.currentEditControl,
      penSize: payload.size,
      penColor: payload.color,
      savedColors: this._state.savedColors,
      gridEnabled: this._state.gridEnabled,
      restrictToTile: this._state.restrictToTile,
      gridSize: this._state.gridSize,
      gridColor: this._state.gridColor,
      modalType: TilesetEditorModalType.close,
      isSaved: false,
      firstRender: this._state.firstRender,
      zoom: this._state.zoom,
    });
  }
  protected handleUpdateColors(colors: [Color]): void {
    this.setEdit({
      tileset: this._state.tileset,
      currentEditControl: this._state.currentEditControl,
      penSize: this._state.penSize,
      penColor: this._state.penColor,
      savedColors: colors,
      gridEnabled: this._state.gridEnabled,
      restrictToTile: this._state.restrictToTile,
      gridSize: this._state.gridSize,
      gridColor: this._state.gridColor,
      modalType: TilesetEditorModalType.close,
      isSaved: false,
      firstRender: this._state.firstRender,
      zoom: this._state.zoom,
    });
  }

  protected handleUpdateGrid(payload: {
    gridEnabled: boolean;
    gridSize: number;
    gridColor: Color;
  }): void {
    this.setEdit({
      tileset: this._state.tileset,
      currentEditControl: this._state.currentEditControl,
      penSize: this._state.penSize,
      penColor: this._state.penColor,
      savedColors: this._state.savedColors,
      gridEnabled: payload.gridEnabled,
      restrictToTile: this._state.restrictToTile,
      gridSize: payload.gridSize,
      gridColor: payload.gridColor,
      modalType: TilesetEditorModalType.close,
      isSaved: false,
      firstRender: this._state.firstRender,
      zoom: this._state.zoom,
    });
  }

  protected handleToggleRestrictToTile(): void {
    this.setEdit({
      tileset: this._state.tileset,
      currentEditControl: this._state.currentEditControl,
      penSize: this._state.penSize,
      penColor: this._state.penColor,
      savedColors: this._state.savedColors,
      gridEnabled: this._state.gridEnabled,
      restrictToTile: !this._state.restrictToTile,
      gridSize: this._state.gridSize,
      gridColor: this._state.gridColor,
      modalType: TilesetEditorModalType.close,
      isSaved: false,
      firstRender: this._state.firstRender,
      zoom: this._state.zoom,
    });
  }
  protected handleCloseModal(): void {
    this.setEdit({
      tileset: this._state.tileset,
      currentEditControl: this._state.currentEditControl,
      penSize: this._state.penSize,
      penColor: this._state.penColor,
      savedColors: this._state.savedColors,
      gridEnabled: this._state.gridEnabled,
      restrictToTile: this._state.restrictToTile,
      gridSize: this._state.gridSize,
      gridColor: this._state.gridColor,
      modalType: TilesetEditorModalType.close,
      isSaved: false,
      firstRender: this._state.firstRender,
      zoom: this._state.zoom,
    });
  }

  protected handleOpenModal(modalType: TilesetEditorModalType): void {
    this.setEdit({
      tileset: this._state.tileset,
      currentEditControl: this._state.currentEditControl,
      penSize: this._state.penSize,
      penColor: this._state.penColor,
      savedColors: this._state.savedColors,
      gridEnabled: this._state.gridEnabled,
      restrictToTile: this._state.restrictToTile,
      gridSize: this._state.gridSize,
      gridColor: this._state.gridColor,
      modalType,
      isSaved: false,
      firstRender: this._state.firstRender,
      zoom: this._state.zoom,
    });
  }
}
