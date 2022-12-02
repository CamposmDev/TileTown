import { TilemapEditContext } from "src/context/tilemapEditor";
import { SnackContext } from "src/context/snack";
import { ModalContext } from "src/context/modal";
import { useContext } from "react";
import { Stack, Button, Grid, Tooltip, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import TileSelectorCanvas from "./TileSelectorCanvas";
import { AuthContext } from "src/context/auth";

const TilesetSelector = () => {
  const auth = useContext(AuthContext);
  const edit = useContext(TilemapEditContext);
  const modal = useContext(ModalContext);

  const user = auth ? auth.usr : undefined;
  const id = user ? user.id : undefined;

  return (
    <Stack pl={1} pr={1} spacing={1} direction="column" alignItems="center">
      <Button
        variant="contained"
        sx={{ m: 1, width: 1 / 2 }}
        disabled={!edit.canEdit(id) || !edit.isOwner(id)}
        onClick={() => {
          modal.showAddTilesetModal();
        }}
      >
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
            disabled={edit.state.currentTilesetIndex === 0 || !edit.canEdit(id)}
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
              edit.state.currentTilesetIndex >=
                edit.state.Tilesets.length - 1 || !edit.canEdit(id)
            }
            onClick={() => {
              edit.updateCurrentTileset(edit.state.currentTilesetIndex + 1);
            }}
          >
            <ArrowForwardIos></ArrowForwardIos>
          </IconButton>
        </Tooltip>
      </Grid>
    </Stack>
  );
};

export default TilesetSelector;
