import {
  Button,
  Grid,
  Toolbar,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import {
  Save,
  Publish,
  Delete,
  Download,
  Undo,
  Redo,
  Edit,
  FormatColorFill,
} from "@mui/icons-material";
import { FaEraser } from "react-icons/fa";
import TilesetEditorDrawer from "./TilesetEditorDrawer";
import TilesetCanvasWrapper from "./TilesetCanvasWrapper";
import PublishTilesetButton from "../../button/PublishTilesetButton";
import { useContext, useEffect } from "react";
import { TilesetEditContext } from "../../../context/tilesetEditor";
import { SnackContext } from "src/context/snack";
import {
  TilesetEditControl,
  Color,
} from "src/context/tilesetEditor/TilesetEditTypes";
import { SocialContext } from "src/context/social";
import DeleteTilesetButton from "src/components/button/DeleteTilesetButton";
import { AuthContext } from "src/context/auth";
import { useNavigate } from "react-router";
import ExitTilesetButton from "src/components/button/ExitTilesetButton";

const TilesetEditorScreen = () => {
  const auth = useContext(AuthContext);
  const snack = useContext(SnackContext);
  const nav = useNavigate();
  useEffect(() => {
    if (!auth.isLoggedIn) {
      snack.showErrorMessage("Credentials invalid or expired!");
      nav("/");
    }
  });
  const edit = useContext(TilesetEditContext);
  const social = useContext(SocialContext);
  //set the color of the selected mode
  const unselectedColor = "";
  // const selectedColor = "rgba(255,255,255,0.08)";
  const selectedColor = "rgba(38, 162, 123, 0.08)";
  const currentEditControl = edit.state.currentEditControl;
  let drawColor = unselectedColor;
  let eraseColor = unselectedColor;
  let fillColor = unselectedColor;
  switch (currentEditControl) {
    case TilesetEditControl.draw: {
      drawColor = selectedColor;
      break;
    }
    case TilesetEditControl.erase: {
      eraseColor = selectedColor;
      break;
    }
    case TilesetEditControl.fill: {
      fillColor = selectedColor;
      break;
    }
    default:
      break;
  }

  const setEditControl = (editControl: TilesetEditControl) => {
    edit.updateEditControl(editControl);
  };

  const download = () => {
    const link = document.createElement("a");
    link.download = edit.state.tileset.name;
    link.href = edit.state.imageData;
    link.click();
  };

  return (
    <Grid alignItems="center">
      <Toolbar sx={{ boxShadow: 1 }} variant="dense">
        <Grid container direction="row" alignItems="center">
          <TilesetEditorDrawer />
          <Grid item flexGrow={1}>
            <Tooltip
              title="Save"
              arrow
              children={
                <IconButton
                  color="primary"
                  children={<Save />}
                  disabled={edit.state.isSaved}
                  onClick={() => edit.saveTileset(snack)}
                />
              }
            />
            <Tooltip
              title="Download"
              arrow
              children={
                <IconButton
                  color="primary"
                  children={<Download />}
                  onClick={() => download()}
                />
              }
            />
            <Tooltip
              title="Undo"
              arrow
              children={
                <IconButton
                  disabled={!edit.canUndo()}
                  onClick={() => {
                    edit.undo();
                  }}
                  color="primary"
                  children={<Undo />}
                />
              }
            />
            <Tooltip
              title="Redo"
              arrow
              children={
                <IconButton
                  disabled={!edit.canRedo()}
                  onClick={() => {
                    edit.redo();
                  }}
                  color="primary"
                  children={<Redo />}
                />
              }
            />
            <Tooltip
              title="Draw"
              arrow
              children={
                <IconButton
                  color="primary"
                  sx={{ bgcolor: drawColor }}
                  onClick={() => setEditControl(TilesetEditControl.draw)}
                  children={<Edit />}
                />
              }
            />
            <Tooltip
              title="Eraser"
              arrow
              children={
                <IconButton
                  color="primary"
                  sx={{ bgcolor: eraseColor }}
                  onClick={() => setEditControl(TilesetEditControl.erase)}
                >
                  <FaEraser></FaEraser>
                </IconButton>
              }
            />
            <Tooltip
              title="Fill"
              arrow
              children={
                <IconButton
                  color="primary"
                  sx={{ bgcolor: fillColor }}
                  onClick={() => setEditControl(TilesetEditControl.fill)}
                  children={<FormatColorFill />}
                />
              }
            />
          </Grid>
          <Grid item>
            <Stack direction={"row"} spacing={1}>
              <ExitTilesetButton
                id={edit.state.tileset.id}
                name={edit.state.tileset.name}
              ></ExitTilesetButton>
              <DeleteTilesetButton
                id={edit.state.tileset.id}
                name={edit.state.tileset.name}
              />
              <PublishTilesetButton
                id={edit.state.tileset.id}
                name={edit.state.tileset.name}
              />
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
      <TilesetCanvasWrapper />
    </Grid>
  );
};

export default TilesetEditorScreen;
