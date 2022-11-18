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
import { TilesetApi } from "../../api";
import { SnackContext } from "../snack";
import axios from "axios";
import { useContext } from "react";
import { SnackStore } from "../snack/SnackStore";
import { ModalStore } from "../modal/ModalStore";
import { useNavigate } from "react-router";

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

  public loadTileset(id: string, snack?: SnackStore): void {
    TilesetApi.getTilesetById(id)
      .then((res) => {
        if (res.status === 200) {
          this.handleAction({
            type: TilesetEditorActionType.UPDATE_TILESET,
            payload: { tileset: res.data.tileset },
          });
          snack?.showSuccessMessage(res.data.message);
        }
      })
      .catch((e) => {
        if (axios.isAxiosError(e) && e.response) {
          snack?.showErrorMessage(e.response.data.message);
        }
      });
  }

  public createTileset(
    formData: FormData,
    snack?: SnackStore,
    modal?: ModalStore
  ): void {
    TilesetApi.createTileset(formData)
      .then((res) => {
        if (res.status === 201) {
          console.log("hello");
          const newTileset: Tileset = res.data.tileset;
          this.handleAction({
            type: TilesetEditorActionType.CREATE_NEW_TILESET,
            payload: {
              tileset: newTileset,
            },
          });
          snack?.showSuccessMessage(res.data.message);
          modal?.close();
        }
      })
      .catch((e) => {
        if (axios.isAxiosError(e) && e.response) {
          snack?.showErrorMessage(e.response.data.message);
        }
      });
  }

  public async updateTileset(tileset: Partial<Tileset>): Promise<void> {
    this.handleAction({
      type: TilesetEditorActionType.UPDATE_TILESET,
      payload: {
        tileset,
      },
    });
  }

  public async saveTileset(snack?: SnackStore): Promise<void> {
    const f = new FormData();
    // f.append("tileset", JSON.stringify(this._state.tilesetChanges));

    TilesetApi.updateTilesetById(
      this._state.tileset.id,
      this._state.tilesetChanges
    )
      .then((res) => {
        this.handleAction({
          type: TilesetEditorActionType.SAVE_TILESET,
          payload: {},
        });
        snack?.showSuccessMessage(res.data.message);
      })
      .catch((e) => {
        if (axios.isAxiosError(e) && e.response) {
          snack?.showErrorMessage(e.response.data.message);
        }
      });
  }

  public async saveImage(imageData: string): Promise<void> {
    this.handleAction({
      type: TilesetEditorActionType.SAVE_IMAGE_DATA,
      payload: { imageData },
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

  public async updateCurrentTile(currentTile: {
    x: number | null;
    y: number | null;
  }): Promise<void> {
    this.handleAction({
      type: TilesetEditorActionType.UPDATE_CURRENT_TILE,
      payload: { currentTile },
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
        this.handleSaveTileset();
        break;
      }
      case TilesetEditorActionType.SAVE_IMAGE_DATA: {
        this.handleSaveImage(payload.imageData);
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
      case TilesetEditorActionType.UPDATE_CURRENT_TILE: {
        this.handleUpdateCurrentTile(payload);
        break;
      }
      default: {
        throw new Error(
          `Unhandled action with type ${action} caught in auth reducer`
        );
      }
    }
  }
  protected handleSaveImage(imageData: string) {
    this.setEdit({
      tileset: this._state.tileset,
      imageData: imageData,
      tilesetChanges: this._state.tilesetChanges,
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
      currentTile: this._state.currentTile,
    });
  }
  protected handleUpdateCurrentTile(payload: {
    currentTile: { x: number | null; y: number | null };
  }): void {
    this.setEdit({
      tileset: this._state.tileset,
      imageData: this._state.imageData,
      tilesetChanges: this._state.tilesetChanges,
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
      zoom: this._state.zoom,
      currentTile: payload.currentTile,
    });
  }
  protected handleUpdateZoom(zoom: number): void {
    this.setEdit({
      tileset: this._state.tileset,
      tilesetChanges: this._state.tilesetChanges,
      imageData: this._state.imageData,
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
      currentTile: this._state.currentTile,
    });
  }
  protected handleToggleFirstRender(): void {
    this.setEdit({
      tileset: this._state.tileset,

      tilesetChanges: this._state.tilesetChanges,
      imageData: this._state.imageData,
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
      currentTile: this._state.currentTile,
    });
  }

  protected handleCreateNewTileset(tileset: Tileset): void {
    this.setEdit({
      tileset: tileset,

      tilesetChanges: this._state.tilesetChanges,
      imageData: this._state.imageData,
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
      firstRender: true,
      zoom: this._state.zoom,
      currentTile: this._state.currentTile,
    });
  }

  protected handleUpdateTileset(tileset: Partial<Tileset>): void {
    const updatedTileset = this._state.tileset;
    const updatedChanges = this._state.tilesetChanges;

    Object.assign(updatedTileset, tileset);
    Object.assign(updatedChanges, tileset);

    this.setEdit({
      tileset: updatedTileset,
      tilesetChanges: updatedChanges,
      imageData: this._state.imageData,
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
      currentTile: this._state.currentTile,
    });
  }

  protected handleSaveTileset(): void {
    this.setEdit({
      tileset: this._state.tileset,
      tilesetChanges: {},
      imageData: this._state.imageData,
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
      currentTile: this._state.currentTile,
    });
  }

  protected handleChangeEditControl(editControl: TilesetEditControl): void {
    this.setEdit({
      tileset: this._state.tileset,
      tilesetChanges: this._state.tilesetChanges,
      imageData: this._state.imageData,
      currentEditControl: editControl,
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
      zoom: this._state.zoom,
      currentTile: this._state.currentTile,
    });
  }

  protected handleUpdatePen(payload: { size: number; color: Color }): void {
    this.setEdit({
      tileset: this._state.tileset,
      tilesetChanges: this._state.tilesetChanges,
      imageData: this._state.imageData,
      currentEditControl: this._state.currentEditControl,
      penSize: payload.size,
      penColor: payload.color,
      savedColors: this._state.savedColors,
      gridEnabled: this._state.gridEnabled,
      restrictToTile: this._state.restrictToTile,
      gridSize: this._state.gridSize,
      gridColor: this._state.gridColor,
      modalType: TilesetEditorModalType.close,
      isSaved: this._state.isSaved,
      firstRender: this._state.firstRender,
      zoom: this._state.zoom,
      currentTile: this._state.currentTile,
    });
  }
  protected handleUpdateColors(colors: [Color]): void {
    this.setEdit({
      tileset: this._state.tileset,
      tilesetChanges: this._state.tilesetChanges,
      imageData: this._state.imageData,
      currentEditControl: this._state.currentEditControl,
      penSize: this._state.penSize,
      penColor: this._state.penColor,
      savedColors: colors,
      gridEnabled: this._state.gridEnabled,
      restrictToTile: this._state.restrictToTile,
      gridSize: this._state.gridSize,
      gridColor: this._state.gridColor,
      modalType: TilesetEditorModalType.close,
      isSaved: this._state.isSaved,
      firstRender: this._state.firstRender,
      zoom: this._state.zoom,
      currentTile: this._state.currentTile,
    });
  }

  protected handleUpdateGrid(payload: {
    gridEnabled: boolean;
    gridSize: number;
    gridColor: Color;
  }): void {
    this.setEdit({
      tileset: this._state.tileset,
      tilesetChanges: this._state.tilesetChanges,
      imageData: this._state.imageData,
      currentEditControl: this._state.currentEditControl,
      penSize: this._state.penSize,
      penColor: this._state.penColor,
      savedColors: this._state.savedColors,
      gridEnabled: payload.gridEnabled,
      restrictToTile: this._state.restrictToTile,
      gridSize: payload.gridSize,
      gridColor: payload.gridColor,
      modalType: TilesetEditorModalType.close,
      isSaved: this._state.isSaved,
      firstRender: this._state.firstRender,
      zoom: this._state.zoom,
      currentTile: this._state.currentTile,
    });
  }

  protected handleToggleRestrictToTile(): void {
    this.setEdit({
      tileset: this._state.tileset,
      tilesetChanges: this._state.tilesetChanges,
      imageData: this._state.imageData,
      currentEditControl: this._state.currentEditControl,
      penSize: this._state.penSize,
      penColor: this._state.penColor,
      savedColors: this._state.savedColors,
      gridEnabled: this._state.gridEnabled,
      restrictToTile: !this._state.restrictToTile,
      gridSize: this._state.gridSize,
      gridColor: this._state.gridColor,
      modalType: TilesetEditorModalType.close,
      isSaved: this._state.isSaved,
      firstRender: this._state.firstRender,
      zoom: this._state.zoom,
      currentTile: this._state.currentTile,
    });
  }
  protected handleCloseModal(): void {
    this.setEdit({
      tileset: this._state.tileset,
      tilesetChanges: this._state.tilesetChanges,
      imageData: this._state.imageData,
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
      zoom: this._state.zoom,
      currentTile: this._state.currentTile,
    });
  }

  protected handleOpenModal(modalType: TilesetEditorModalType): void {
    this.setEdit({
      tileset: this._state.tileset,
      tilesetChanges: this._state.tilesetChanges,
      imageData: this._state.imageData,
      currentEditControl: this._state.currentEditControl,
      penSize: this._state.penSize,
      penColor: this._state.penColor,
      savedColors: this._state.savedColors,
      gridEnabled: this._state.gridEnabled,
      restrictToTile: this._state.restrictToTile,
      gridSize: this._state.gridSize,
      gridColor: this._state.gridColor,
      modalType,
      isSaved: this._state.isSaved,
      firstRender: this._state.firstRender,
      zoom: this._state.zoom,
      currentTile: this._state.currentTile,
    });
  }
}
