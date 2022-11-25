import { TilemapEditContext } from "src/context/tilemapEditor";
import { useContext } from "react";
import {
  Add,
  ArrowBack,
  ArrowBackIos,
  ArrowForward,
  ArrowForwardIos,
  Delete,
  Settings,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Grid,
} from "@mui/material";
import LayerSelector from "./LayerSelector";
import TileSelectorCanvas from "./TileSelectorCanvas";
import CollaboratorSettingsSelector from "./CollaboratorSettingsSelector";
import CollaboratorSelector from "./CollaboratorSelector";

const LayerDrawer = () => {
  let numOfCollaborators = 2;

  const edit = useContext(TilemapEditContext);

  return (
    <Drawer
      open={true}
      anchor="right"
      variant="permanent"
      PaperProps={{ sx: { mt: 15, overflow: "auto", height: "700px" } }}
    >
      <LayerSelector></LayerSelector>
      <Stack p={1} spacing={2}></Stack>
      <CollaboratorSelector></CollaboratorSelector>
      <Divider />
      <CollaboratorSettingsSelector></CollaboratorSettingsSelector>
      <Stack pl={1} pr={1} spacing={1} direction="column" alignItems="center">
        <Button variant="contained" sx={{ m: 1, width: 1 / 2 }}>
          Add Tileset
        </Button>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Tooltip title="Previous Tileset" arrow>
            <IconButton
              disabled={edit.state.currentTilesetIndex === 0}
              onClick={() => {
                edit.updateCurrentTileset(edit.state.currentTilesetIndex - 1);
              }}
            >
              <ArrowBackIos></ArrowBackIos>
            </IconButton>
          </Tooltip>
          <TileSelectorCanvas></TileSelectorCanvas>
          <Tooltip title="Next Tileset" arrow>
            <IconButton
              disabled={
                edit.state.currentTilesetIndex ===
                edit.state.Tilesets.length - 1
              }
              onClick={() => {
                edit.updateCurrentTileset(edit.state.currentTilesetIndex + 1);
              }}
            >
              <ArrowForwardIos></ArrowForwardIos>
            </IconButton>
          </Tooltip>
        </Grid>
        {/* <img src="/testTileset.png"></img> */}
      </Stack>
    </Drawer>
  );
};

export default LayerDrawer;
