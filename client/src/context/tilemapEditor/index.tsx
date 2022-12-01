import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TilemapEditorState,
  TilemapEditControl,
  TilemapEditorModalType,
} from "./TilemapEditTypes";
import { TilemapEditStore } from "./TilemapEditStore";
import { TilemapApi, TilesetApi } from "src/api";

/**
 * The edit context
 */
const TilemapEditContext = createContext<TilemapEditStore>(
  new TilemapEditStore(
    {
      Tilemap: {
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
        layers: [],
        tileHeight: 10,
        tileWidth: 10,
        nextLayerId: 2,
        nextObjectId: 0,
        orientation: "orthogonal",
        name: "",
        owner: "",
        properties: [],
        tilesets: [],
        globalTileIDs: [],
        renderOrder: "right-down",
        isPublished: false,
      },
      Tilesets: [],
      currentEditControl: TilemapEditControl.draw,
      currentLayerIndex: 0,
      currentTileIndex: 1,
      currentSwapIndex: -1,
      currentTilesetIndex: 0,
      currentSelection: [],
      modalType: TilemapEditorModalType.close,
      isSaved: false,
      renderTilemapCanvas: true,
      renderCurrentLayerCanvas: true,
    },
    () => {},
    () => {}
  )
);

/**
 * The edit context provider.
 */
function TilemapEditContextProvider(props: Record<string, any>) {
  // The state of the edit context
  const [edit, setEdit] = useState<TilemapEditorState>({
    Tilemap: {
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
      layers: [],
      tileHeight: 10,
      tileWidth: 10,
      nextLayerId: 2,
      nextObjectId: 0,
      orientation: "orthogonal",
      name: "My New Tilemap",
      owner: "",
      properties: [],
      tilesets: [],
      globalTileIDs: [],
      renderOrder: "right-down",
      isPublished: false,
    },
    Tilesets: [],
    currentEditControl: TilemapEditControl.draw,
    currentLayerIndex: -1,
    currentSwapIndex: -1,
    currentTileIndex: 1,
    currentTilesetIndex: 0,
    currentSelection: [],
    modalType: TilemapEditorModalType.close,
    isSaved: true,
    renderTilemapCanvas: false,
    renderCurrentLayerCanvas: true,
  });

  const nav = useNavigate();

  useEffect(() => {
    const href = window.location.href;
    const id = href.substring(href.lastIndexOf("/") + 1);
    TilemapApi.getTilemapById(id).then((res) => {
      if (res.data.tilemap) {
        setEdit({ ...edit, Tilemap: res.data.tilemap });
      }
    });
    if (edit.Tilemap.id === "") return;
    if (edit.Tilemap.tilesets.length > 0) {
      edit.Tilemap.tilesets.forEach((tileset) => {
        console.log("load tileset");
        TilesetApi.getTilesetById(tileset).then((res) => {
          setEdit({
            ...edit,
            Tilesets: [...edit.Tilesets, res.data.tileset],
          });
        });
      });
    }
    if (edit.Tilemap.tilesets.length !== edit.Tilesets.length) return;
  }, [edit.Tilemap.id]);

  // A wrapper around our state - the wrapper has the dispatch functions and the reducer
  const TilemapEdit = new TilemapEditStore(edit, setEdit, nav);

  return (
    <TilemapEditContext.Provider value={TilemapEdit}>
      {props.children}
    </TilemapEditContext.Provider>
  );
}

export { TilemapEditContext, TilemapEditContextProvider };
