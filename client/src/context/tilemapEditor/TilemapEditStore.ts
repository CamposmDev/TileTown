import { ThirteenMp, ThreeGMobiledata } from "@mui/icons-material";
import { Action } from "@remix-run/router";
import { NavigateFunction } from "react-router";
import TilesetCanvas from "src/components/screen/tileset-editor/TilesetCanvas";
import { textSpanIsEmpty } from "typescript";
import {
  Color,
  Tilemap,
  TilemapEditorState,
  TilemapEditControl,
  TilemapEditorModalType,
  TilemapEditorActionType,
  TilemapEditorAction,
  Layer,
  Property,
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

  public async updateCurrentTileset(
    currentTilesetIndex: number
  ): Promise<void> {
    console.log(currentTilesetIndex);
    this.handleAction({
      type: TilemapEditorActionType.UPDATE_CURRENT_TILESET,
      payload: { currentTilesetIndex },
    });
  }

  public async updateCurrentLayer(index: number): Promise<void> {
    this.handleAction({
      type: TilemapEditorActionType.UPDATE_CURRENT_LAYER,
      payload: {
        currentLayerIndex: index,
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

  public async updateLayerInfo(
    index: number,
    name?: string,
    visibility?: boolean,
    opacity?: number
  ): Promise<void> {
    this.handleAction({
      type: TilemapEditorActionType.UPDATE_LAYER_INFO,
      payload: {
        name: name ? name : this._state.Tilemap.layers[index].name,
        visibility:
          visibility !== undefined
            ? visibility
            : this._state.Tilemap.layers[index].visible,
        opacity:
          opacity !== undefined
            ? opacity
            : this.state.Tilemap.layers[index].opacity,
        index,
      },
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

  public async deleteLayer(index: number): Promise<void> {
    let currentLayerIndex =
      index === this.state.currentLayerIndex
        ? -1
        : this.state.currentLayerIndex;
    if (index < currentLayerIndex) currentLayerIndex--;
    this.handleAction({
      type: TilemapEditorActionType.DELETE_LAYER,
      payload: { index, currentLayerIndex },
    });
  }

  public async updateSwapIndex(swapIndex: number): Promise<void> {
    this.handleAction({
      type: TilemapEditorActionType.UPDATE_SWAP_INDEX,
      payload: { swapIndex },
    });
  }

  public async swapLayers(swapIndex: number): Promise<void> {
    let currentLayerIndex =
      this.state.currentLayerIndex === swapIndex
        ? this.state.currentSwapIndex
        : this.state.currentLayerIndex;
    currentLayerIndex =
      this.state.currentLayerIndex === this.state.currentSwapIndex
        ? swapIndex
        : currentLayerIndex;
    this.handleAction({
      type: TilemapEditorActionType.SWAP_LAYERS,
      payload: { swapIndex, currentLayerIndex },
    });
  }

  public async createProperty(property: Property): Promise<void> {
    this.handleAction({
      type: TilemapEditorActionType.CREATE_PROPERTY,
      payload: { property },
    });
  }

  public async updateProperty(
    property: Property,
    index: number
  ): Promise<void> {
    this.handleAction({
      type: TilemapEditorActionType.UPDATE_PROPERTY,
      payload: { property, index },
    });
  }

  public async deleteProperty(index: number): Promise<void> {
    this.handleAction({
      type: TilemapEditorActionType.DELETE_PROPERTY,
      payload: { index },
    });
  }

  public async addCollaborators(
    collaborators: { id: string; username: string }[]
  ): Promise<void> {
    this.handleAction({
      type: TilemapEditorActionType.ADD_COLLABORATORS,
      payload: { collaborators },
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
      case TilemapEditorActionType.UPDATE_CURRENT_TILESET: {
        this.handleUpdateCurrentTileset(payload.currentTilesetIndex);
        break;
      }
      case TilemapEditorActionType.UPDATE_CURRENT_LAYER: {
        this.handleUpdateCurrentLayer(payload.currentLayerIndex);
        break;
      }
      case TilemapEditorActionType.UPDATE_CURRENT_LAYER_DATA: {
        this.handleUpdateCurrentLayerData(
          payload.currentTileIndex,
          payload.updateData
        );
        break;
      }
      case TilemapEditorActionType.UPDATE_LAYER_INFO: {
        this.handleUpdateLayerInfo(
          payload.name,
          payload.visibility,
          payload.opacity,
          payload.index
        );
        break;
      }
      case TilemapEditorActionType.DELETE_LAYER: {
        this.handleDeleteLayer(payload.index, payload.currentLayerIndex);
        break;
      }
      case TilemapEditorActionType.UPDATE_SWAP_INDEX: {
        this.handleUpdateSwapIndex(payload.swapIndex);
        break;
      }
      case TilemapEditorActionType.SWAP_LAYERS: {
        this.handleSwapLayers(payload.swapIndex, payload.currentLayerIndex);
        break;
      }
      case TilemapEditorActionType.CREATE_NEW_LAYER: {
        this.handleCreateNewLayer(payload.name, payload.data);
        break;
      }
      case TilemapEditorActionType.CREATE_PROPERTY: {
        this.handleCreateProperty(payload.property);
        break;
      }
      case TilemapEditorActionType.UPDATE_PROPERTY: {
        this.handleUpdateProperty(payload.property, payload.index);
        break;
      }
      case TilemapEditorActionType.DELETE_PROPERTY: {
        this.handleDeleteProperty(payload.index);
        break;
      }
      case TilemapEditorActionType.ADD_COLLABORATORS: {
        this.handleAddCollaborators(payload.collaborators);
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
  protected handleAddCollaborators(
    collaborators: { id: string; username: string }[]
  ): void {
    const ids = collaborators.map((collaborator) => {
      return collaborator.id;
    });
    const usernames = collaborators.map((collaborator) => {
      return collaborator.username;
    });
    this.setEdit({
      ...this.state,
      Tilemap: {
        ...this.state.Tilemap,
        collaborators: [...this.state.Tilemap.collaborators, ...ids],
        collaboratorNames: [
          ...this.state.Tilemap.collaboratorNames,
          ...usernames,
        ],
      },
    });
  }
  protected handleUpdateCurrentTileset(currentTilesetIndex: number): void {
    this.setEdit({ ...this.state, currentTilesetIndex });
  }
  protected handleDeleteProperty(index: number): void {
    if (this.state.currentLayerIndex === -1) {
      this.setEdit({
        ...this.state,
        Tilemap: {
          ...this.state.Tilemap,
          properties: [...this.state.Tilemap.properties].filter(
            (currentProperty, currentIndex) => {
              return currentIndex !== index;
            }
          ),
        },
        isSaved: false,
      });
      return;
    }
    this.setEdit({
      ...this.state,
      Tilemap: {
        ...this.state.Tilemap,
        layers: [...this.state.Tilemap.layers].map((layer, layerIndex) => {
          if (layerIndex === this.state.currentLayerIndex) {
            layer.properties = [...layer.properties].filter(
              (currentProperty, currentIndex) => {
                return currentIndex !== index;
              }
            );
            return layer;
          }
          return layer;
        }),
      },
      isSaved: false,
    });
  }
  protected handleUpdateProperty(property: Property, index: number): void {
    if (this.state.currentLayerIndex === -1) {
      this.setEdit({
        ...this.state,
        Tilemap: {
          ...this.state.Tilemap,
          properties: [...this.state.Tilemap.properties].map(
            (currentProperty, currentIndex) => {
              if (currentIndex === index) return property;
              return currentProperty;
            }
          ),
        },
        isSaved: false,
      });
      return;
    }
    this.setEdit({
      ...this.state,
      Tilemap: {
        ...this.state.Tilemap,
        layers: [...this.state.Tilemap.layers].map((layer, layerIndex) => {
          if (layerIndex === this.state.currentLayerIndex) {
            layer.properties = [...layer.properties].map(
              (currentProperty, currentIndex) => {
                if (currentIndex === index) return property;
                return currentProperty;
              }
            );
            return layer;
          }
          return layer;
        }),
      },
      isSaved: false,
    });
  }
  protected handleCreateProperty(property: Property): void {
    if (this.state.currentLayerIndex === -1) {
      this.setEdit({
        ...this.state,
        Tilemap: {
          ...this.state.Tilemap,
          properties: [...this.state.Tilemap.properties, property],
        },
        isSaved: false,
      });
      return;
    }
    this.setEdit({
      ...this.state,
      Tilemap: {
        ...this.state.Tilemap,
        layers: [...this.state.Tilemap.layers].map((layer, index) => {
          if (index === this.state.currentLayerIndex) {
            layer.properties = [...layer.properties, property];
            return layer;
          }
          return layer;
        }),
      },
      isSaved: false,
    });
  }
  protected handleSwapLayers(
    swapIndex: number,
    currentLayerIndex: number
  ): void {
    const temp1 = this.state.Tilemap.layers[swapIndex];
    const temp2 = this.state.Tilemap.layers[this.state.currentSwapIndex];

    this.setEdit({
      ...this.state,
      Tilemap: {
        ...this.state.Tilemap,
        layers: [...this.state.Tilemap.layers].map((layer, index) => {
          if (index === swapIndex) return temp2;
          if (index === this.state.currentSwapIndex) return temp1;
          return layer;
        }),
      },
      currentLayerIndex,
      currentSwapIndex: -1,
    });
  }
  protected handleUpdateSwapIndex(currentSwapIndex: number) {
    this.setEdit({ ...this.state, currentSwapIndex });
  }
  protected handleDeleteLayer(index: number, currentLayerIndex: number) {
    this.setEdit({
      ...this.state,
      Tilemap: {
        ...this.state.Tilemap,
        layers: this.state.Tilemap.layers.filter((layer, currentIndex) => {
          return currentIndex !== index;
        }),
        nextLayerId: this.state.Tilemap.nextLayerId - 1,
      },
      currentLayerIndex,
    });
  }
  protected handleUpdateCurrentLayer(currentLayerIndex: number) {
    this.setEdit({ ...this.state, currentLayerIndex });
  }
  protected handleUpdateLayerInfo(
    name: string,
    visibility: boolean,
    opacity: number,
    index: number
  ) {
    this.setEdit({
      ...this.state,
      Tilemap: {
        ...this.state.Tilemap,
        layers: this.state.Tilemap.layers.map((layer, currentIndex): Layer => {
          if (index === currentIndex) {
            layer.name = name;
            layer.visible = visibility;
            layer.opacity = opacity;
          }
          return layer;
        }),
      },
    });
  }
  protected handleCreateNewLayer(name: string, data: number[]): void {
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
        nextLayerId: this.state.Tilemap.nextLayerId + 1,
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
