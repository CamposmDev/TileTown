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
      <Stack pl={1} pr={1} direction="row" alignItems="center">
        <Typography flexGrow={1}>
          Collaborators&ensp;({numOfCollaborators})
        </Typography>
        <Tooltip title="Add Collaborator" arrow>
          <IconButton color="primary">
            <Add />
          </IconButton>
        </Tooltip>
      </Stack>
      <Divider />
      <Stack>
        <Stack pl={1} pr={1} direction="row" alignItems="center">
          <Typography>Camposm</Typography>
          <Tooltip title="Remove Collaborator" arrow>
            <IconButton color="error">
              <Delete />
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack pl={1} pr={1} direction="row" alignItems="center">
          <Typography>PeteyLumkin</Typography>
          <Tooltip title="Remove Collaborator" arrow>
            <IconButton color="error">
              <Delete />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <Stack pl={1} pr={1} direction="row" alignItems="center">
        <Typography flexGrow={1}>Collaborator Settings</Typography>
        {/* <Tooltip arrow> */}
        <IconButton color="primary">
          <Settings />
        </IconButton>
        {/* </Tooltip> */}
      </Stack>
      <Divider />
      <Stack pl={1} pr={1} spacing={1} direction="column" alignItems="center">
        <FormControl>
          <RadioGroup row={true}>
            <FormControlLabel
              labelPlacement="start"
              value="free-edit"
              control={<Radio />}
              label="Free Edit"
            />
            <FormControlLabel
              labelPlacement="start"
              value="queue"
              control={<Radio />}
              label="Queue"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Time Limit"
          fullWidth
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">minutes</InputAdornment>
            ),
          }}
        />
        <TextField
          label="Tile Limit"
          fullWidth
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">tiles</InputAdornment>
            ),
          }}
        />
      </Stack>
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
