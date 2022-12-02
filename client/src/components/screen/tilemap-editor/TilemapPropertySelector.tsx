import { TilemapEditContext } from "src/context/tilemapEditor";
import { SnackContext } from "src/context/snack";
import { useContext } from "react";
import {
  Box,
  Divider,
  Typography,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import { AuthContext } from "src/context/auth";

const TilemapPropertySelector = () => {
  const auth = useContext(AuthContext);
  const edit = useContext(TilemapEditContext);
  const snack = useContext(SnackContext);

  const user = auth ? auth.usr : undefined;
  const id = user ? user.id : undefined;

  const handleUpdateName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    edit.updateTilemap({ name: event.target.value });
  };

  const handleUpdateTileWidth = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (
      isNaN(Number(event.target.value)) ||
      Number(event.target.value) < 1 ||
      Number(event.target.value) > 100
    ) {
      snack.showErrorMessage("Please Enter An Integer Value Between 1 and 100");
      return;
    }
    edit.updateTilemap({ tileWidth: Math.floor(Number(event.target.value)) });
  };

  const handleUpdateTileHeight = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (
      isNaN(Number(event.target.value)) ||
      Number(event.target.value) < 1 ||
      Number(event.target.value) > 100
    ) {
      snack.showErrorMessage("Please Enter An Integer Value Between 1 and 100");
      return;
    }
    edit.updateTilemap({ tileHeight: Math.floor(Number(event.target.value)) });
  };

  return (
    <Box>
      <Typography pl={1}>Properties</Typography>
      <Divider />
      <Stack p={1} spacing={2}>
        <TextField
          label="Tilemap Name"
          size="small"
          value={edit.state.Tilemap.name}
          disabled={!edit.canEdit(id)}
          onChange={handleUpdateName}
        />
        <TextField
          label="Tile Width"
          value={edit.state.Tilemap.tileWidth}
          disabled={!edit.canEdit(id)}
          onChange={handleUpdateTileWidth}
          fullWidth
          size="small"
          InputProps={{
            endAdornment: <InputAdornment position="start">px</InputAdornment>,
          }}
        />
        <TextField
          label="Tile Height"
          value={edit.state.Tilemap.tileHeight}
          disabled={!edit.canEdit(id)}
          onChange={handleUpdateTileHeight}
          fullWidth
          size="small"
          InputProps={{
            endAdornment: <InputAdornment position="start">px</InputAdornment>,
          }}
        />
      </Stack>
    </Box>
  );
};

export default TilemapPropertySelector;
