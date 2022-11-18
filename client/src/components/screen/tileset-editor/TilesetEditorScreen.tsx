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
import DeleteTileItemButton from "../../button/DeleteTileItemButton";
import PublishTileItemButton from "../../button/PublishTileItemButton";
import { useContext } from "react";
import { TilesetEditContext } from "../../../context/tilesetEditor";
import { SnackContext } from "src/context/snack";
import {
  TilesetEditControl,
  Color,
} from "src/context/tilesetEditor/TilesetEditTypes";

const TilesetEditorScreen = () => {
  const edit = useContext(TilesetEditContext);
  const snack = useContext(SnackContext);

  //set the color of the selected mode
  const unselectedColor = "#FFFFFF";
  const selectedColor = "#ADD8E6";
  const currentEditControl = edit.state.currentEditControl;
  let drawColor: Color = unselectedColor;
  let eraseColor: Color = unselectedColor;
  let fillColor: Color = unselectedColor;
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
              children={<IconButton color="primary" children={<Undo />} />}
            />
            <Tooltip
              title="Redo"
              arrow
              children={<IconButton color="primary" children={<Redo />} />}
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
              <DeleteTileItemButton name="this tileset" />
              <PublishTileItemButton name="this tileset" />
              {/* <Button startIcon={<Delete />} color="error">
                Delete
              </Button>
              <Button startIcon={<Publish />} color="primary">
                Publish
              </Button> */}
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
      <TilesetCanvasWrapper />
    </Grid>
  );
};

export default TilesetEditorScreen;
