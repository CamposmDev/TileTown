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
  Layer,
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
          data: [],
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

  public async updateCurrentLayerData(
    currentTileIndex: number,
    currentSelection?: number[]
  ): Promise<void> {
    const updateData = currentSelection
      ? currentSelection
      : this._state.currentSelection;
    this.handleAction({
      type: TilemapEditorActionType.UPDATE_CURRENT_LAYER_DATA,
      payload: { currentTileIndex, updateData },
    });
  }

  public async createNewLayer(
    newName?: string,
    newData?: number[]
  ): Promise<void> {
    const name = newName ? newName : "New Layer";
    const data = newData
      ? newData
      : new Array(this.state.Tilemap.width * this.state.Tilemap.height).fill(0);
    this.handleAction({
      type: TilemapEditorActionType.CREATE_NEW_LAYER,
      payload: { name, data },
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
    this.handleAction({
      type: TilemapEditorActionType.UPDATE_CURRENT_SELECTION,
      payload: { currentSelection },
    });
  }

  public async preventTilemapRender(): Promise<void> {
    this.handleAction({
      type: TilemapEditorActionType.PREVENT_TILEMAP_CANVAS_RENDER,
      payload: {},
    });
  }

  public async preventTileSelectionRender(): Promise<void> {
    this.handleAction({
      type: TilemapEditorActionType.PREVENT_TILE_SELECTION_CANVAS_RENDER,
      payload: {},
    });
  }
  public async renderCurrentLayerRender(willRender: boolean): Promise<void> {
    this.handleAction({
      type: TilemapEditorActionType.RENDER_CURRENT_LAYER_CANVAS_RENDER,
      payload: { willRender },
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
      case TilemapEditorActionType.UPDATE_CURRENT_LAYER_DATA: {
        this.handleUpdateCurrentLayerData(
          payload.currentTileIndex,
          payload.updateData
        );
        break;
      }
      case TilemapEditorActionType.CREATE_NEW_LAYER: {
        this.handleCreateNewLayer(payload.name, payload.data);
        break;
      }
      case TilemapEditorActionType.CHANGE_EDIT_CONTROL: {
        this.handleChangeEditControl(payload.editControl);
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
      case TilemapEditorActionType.RENDER_CURRENT_LAYER_CANVAS_RENDER: {
        this.handleRenderCurrentLayerCanvas(payload.willRender);
        break;
      }
      default: {
        throw new Error(
          `Unhandled action with type ${action.type} caught in tilemap edit reducer`
        );
      }
    }
  }
  protected handleCreateNewLayer(name: string, data: number[]): void {
    // const newLayer: Layer = {
    //   name,
    //   data,
    //   height: this.state.Tilemap.height,
    //   width: this.state.Tilemap.width,
    //   opacity: 1,
    //   properties: [],
    //   visible: true,
    //   x: 0,
    //   y: 0,
    // };
    // const updatedLayers: Layer[] = [...this.state.Tilemap.layers, newLayer];
    // const updatedTilemap: Tilemap = {
    //   ...this.state.Tilemap,
    //   layers: [...this.state.Tilemap.layers, newLayer],
    // };
    this.setEdit({
      ...this.state,
      Tilemap: {
        ...this.state.Tilemap,
        layers: [
          ...this.state.Tilemap.layers,
          {
            name,
            data,
            height: this.state.Tilemap.height,
            width: this.state.Tilemap.width,
            opacity: 1,
            properties: [],
            visible: true,
            x: 0,
            y: 0,
          },
        ],
      },
      isSaved: false,
    });
  }
  protected handleUpdateCurrentLayerData(
    currentTileIndex: number,
    updateData: number[]
  ): void {
    const updatedLayerData: number[] =
      this._state.Tilemap.layers[this._state.currentLayerIndex].data;
    for (let i = 0; i < updateData.length; i++) {
      updatedLayerData[updateData[i]] = currentTileIndex;
    }
    const updatedTilemap = this._state.Tilemap;
    updatedTilemap.layers[this._state.currentLayerIndex].data =
      updatedLayerData;
    this.setEdit({
      ...this._state,
      Tilemap: updatedTilemap,
      isSaved: false,
      renderCurrentLayerCanvas: true,
    });
  }
  protected handleRenderCurrentLayerCanvas(willRender: boolean): void {
    this.setEdit({
      ...this._state,
      renderCurrentLayerCanvas: willRender,
    });
  }

  protected handleUpdateSelection(currentSelection: number[]): void {
    this.setEdit({
      ...this._state,
      currentSelection,
    });
  }
  protected handleUpdateCurrentTile(currentTileIndex: number): void {
    this.setEdit({
      ...this._state,
      currentTileIndex,
    });
  }

  protected handleCreateNewTilemap(Tilemap: Tilemap): void {
    this.setEdit({
      ...this._state,
      Tilemap,
    });
  }

  protected handleUpdateTilemap(Tilemap: Partial<Tilemap>): void {
    // const updatedTilemap: Tilemap = Object.assign(this._state.Tilemap, Tilemap);

    this.setEdit({
      ...this._state,
      Tilemap: Object.assign(this._state.Tilemap, Tilemap),
      isSaved: false,
    });
  }

  protected handleSaveTilemap(Tilemap: Tilemap): void {
    this.setEdit({
      ...this._state,
      isSaved: true,
    });
  }

  protected handleChangeEditControl(editControl: TilemapEditControl): void {
    this.setEdit({
      ...this._state,
      currentEditControl: editControl,
    });
  }
}
