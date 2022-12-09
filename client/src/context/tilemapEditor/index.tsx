import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TilemapEditorState,
  TilemapEditControl,
  TilemapEditorModalType,
} from "./TilemapEditTypes";
import { TilemapEditStore } from "./TilemapEditStore";
import { TilemapApi, TilesetApi } from "src/api";
import { AuthContext } from "../auth";
import { SnackContext } from "../snack";
import axios from "axios";
import { Tileset } from "../tilesetEditor/TilesetEditTypes";

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
      tileCount: 0,
      timeLeft: 0,
    },
    () => {},
    () => {}
  )
);

/**
 * The edit context provider.
 */
function TilemapEditContextProvider(props: Record<string, any>) {
  const auth = useContext(AuthContext);
  const snack = useContext(SnackContext);

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
    tileCount: 0,
    timeLeft: 0,
  });

  const nav = useNavigate();

  useEffect(() => {
    const href = window.location.href;
    const id = href.substring(href.lastIndexOf("/") + 1);
    TilemapApi.getTilemapById(id).then((res) => {
      if (res.data.tilemap) {
        let tilemap = res.data.tilemap;

        if (auth.usr?.id) {
          if (
            !(
              auth.usr.id === tilemap.owner ||
              tilemap.collaborators.includes(auth.usr.id)
            )
          ) {
            snack.showErrorMessage(
              "You Are Not Authorized To Edit This Tilemap"
            );
            nav("/home");
            return;
          }
          if (tilemap.collaboratorIndex === -1) {
            if (auth.usr.id === tilemap.owner) tilemap.collaboratorIndex = 0;
            else
              tilemap.collaboratorIndex =
                tilemap.collaborators.indexOf(auth.usr.id) + 1;
            const f = new FormData();

            const host: string =
              window.location.host === "localhost:3001"
                ? "localhost:3000"
                : window.location.host;

            f.append("image", "http://" + host + "/api/media/" + tilemap.image);
            f.append(
              "tilemap",
              JSON.stringify({ collaboratorIndex: tilemap.collaboratorIndex })
            );
            TilemapApi.updateTilemapById(tilemap.id, f)
              .then((res) => {
                if (res.status === 200) {
                  snack.showSuccessMessage(
                    "You Are Now The Current Collaborator"
                  );
                }
              })
              .catch((e) => {
                if (axios.isAxiosError(e) && e.response) {
                  snack.showErrorMessage(e.response.data.message);
                }
              });
          }
        } else {
          snack.showErrorMessage("You Are Not Authorized To Edit This Tilemap");
          nav("/home");
          return;
        }
        if (tilemap.tilesets.length > 0) {
          let tilesetCount = 0;
          let tilesets = edit.Tilesets;
          if (tilesets.length < tilemap.tilesets.length)
            tilemap.tilesets.forEach((tileset) => {
              TilesetApi.getTilesetById(tileset).then((res) => {
                console.log(res.data.tileset.id);
                tilesets.push(res.data.tileset);
                tilesetCount++;
                if (tilesetCount === tilemap.tilesets.length) {
                  console.log("all tilesets loaded in");
                  setEdit({
                    ...edit,
                    Tilemap: tilemap,
                    Tilesets: tilesets,
                    renderTilemapCanvas: false,
                    isSaved: true,
                  });
                }
              });
            });
        } else {
          setEdit({
            ...edit,
            Tilemap: tilemap,
            renderTilemapCanvas: false,
            isSaved: true,
          });
        }
      }
    });
    if (edit.Tilemap.id === "") return;

    // if (edit.Tilemap.tilesets.length !== edit.Tilesets.length) return;
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
