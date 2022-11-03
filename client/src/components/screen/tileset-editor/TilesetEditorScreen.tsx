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
import TilesetCanvas from "./TilesetCanvas";
import DeleteTileItemButton from "../../button/DeleteTileItemButton";
import PublishTileItemButton from "../../button/PublishTileItemButton";
import { useContext } from "react";
import { TilesetEditorStoreContextProvider } from "../../../context/tilesetEditor";
import { TilesetEditorStoreContext } from "../../../context/tilesetEditor";

const TilesetEditorScreen = () => {
  const edit = useContext(TilesetEditorStoreContext);
  return (
    <Grid alignItems="center">
      <Toolbar sx={{ boxShadow: 1 }} variant="dense">
        <Grid container direction="row" alignItems="center">
          <TilesetEditorDrawer />
          <Grid item flexGrow={1}>
            <Tooltip
              title="Save"
              arrow
              children={<IconButton color="primary" children={<Save />} />}
            />
            <Tooltip
              title="Download"
              arrow
              children={<IconButton color="primary" children={<Download />} />}
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
                  onDoubleClick={() => console.log("double clicked")}
                  children={<Edit />}
                />
              }
            />
            <Tooltip
              title="Eraser"
              arrow
              children={
                <IconButton color="primary">
                  <FaEraser></FaEraser>
                </IconButton>
              }
            />
            <Tooltip
              title="Fill"
              arrow
              children={
                <IconButton color="primary" children={<FormatColorFill />} />
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
      <TilesetCanvas />
    </Grid>
  );
};

export default TilesetEditorScreen;
