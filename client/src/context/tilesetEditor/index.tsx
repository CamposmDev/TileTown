import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TilesetEditorState,
  TilesetEditControl,
  TilesetEditorModalType,
} from "./TilesetEditTypes";
import { TilesetEditStore } from "./TilesetEditStore";
import { SnackContext } from "../snack";
import { ModalContext } from "../modal";
import { TilesetApi } from "src/api";

/**
 * The edit context
 */
const TilesetEditContext = createContext<TilesetEditStore>(
  new TilesetEditStore(
    {
      tileset: {
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
        name: "",
        owner: "",
        properties: [],
        isPublished: false,
      },
      currentEditControl: TilesetEditControl.draw,
      penSize: 1,
      penColor: "#F00001",
      savedColors: [],
      gridEnabled: true,
      restrictToTile: false,
      gridSize: 1,
      gridColor: "#000001",
      modalType: TilesetEditorModalType.close,
      isSaved: true,
      firstRender: true,
      zoom: 1,
      currentTile: { x: null, y: null },
    },
    () => {},
    () => {}
  )
);

/**
 * The edit context provider.
 */
function TilesetEditContextProvider(props: Record<string, any>) {
  // The state of the edit context
  const [edit, setEdit] = useState<TilesetEditorState>({
    tileset: {
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
      name: "",
      owner: "",
      properties: [],
      isPublished: false,
    },
    currentEditControl: TilesetEditControl.draw,
    penSize: 1,
    penColor: "#F0D101",
    savedColors: [],
    gridEnabled: true,
    restrictToTile: true,
    gridSize: 1,
    gridColor: "#000000",
    modalType: TilesetEditorModalType.close,
    isSaved: true,
    firstRender: true,
    zoom: 1,
    currentTile: { x: null, y: null },
  });

  useEffect(() => {
    const href = window.location.href;
    const id = href.substring(href.lastIndexOf("/") + 1);
    TilesetApi.getTilesetById(id).then((res) => {
      setEdit({ ...edit, tileset: res.data.tileset });
    });
    if (edit.tileset.id === "") return;
  }, [edit.tileset.id]);

  // The navigation for the auth context???
  const nav = useNavigate();

  // A wrapper around our state - the wrapper has the dispatch functions and the reducer
  const TilesetEdit = new TilesetEditStore(edit, setEdit, nav);

  return (
    <TilesetEditContext.Provider value={TilesetEdit}>
      {props.children}
    </TilesetEditContext.Provider>
  );
}

export { TilesetEditContext, TilesetEditContextProvider };
