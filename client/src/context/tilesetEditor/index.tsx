import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TilesetEditorState,
  TilesetEditControl,
  TilesetEditorModalType,
} from "./TilesetEditTypes";
import { TilesetEditStore } from "./TilesetEditStore";

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
        image: "/leve1and2tileset.png",
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
      image: "/leve1and2tileset.png",
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
  });

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
