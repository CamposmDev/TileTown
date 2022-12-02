import { TilemapEditContext } from "src/context/tilemapEditor";
import { SnackContext } from "src/context/snack";
import { useContext, useState } from "react";
import {
  Box,
  Divider,
  Typography,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import { AuthContext } from "src/context/auth";

const LayerPropertySelector = (props: { index: number }) => {
  const auth = useContext(AuthContext);
  const edit = useContext(TilemapEditContext);
  const snack = useContext(SnackContext);

  const user = auth ? auth.usr : undefined;
  const id = user ? user.id : undefined;

  const [opacity, setOpacity] = useState<string>(
    edit.state.Tilemap.layers[props.index].opacity.toString()
  );

  const handleUpdateName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    edit.updateLayerInfo(props.index, event.target.value);
  };

  const handleUpdateOpacity = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (event.target.value === "0.")
      edit.updateLayerInfo(
        props.index,
        edit.state.Tilemap.layers[props.index].name,
        edit.state.Tilemap.layers[props.index].visible,
        0
      );

    if (
      isNaN(Number(event.target.value)) ||
      Number(event.target.value) < 0 ||
      Number(event.target.value) > 1
    ) {
      snack.showErrorMessage("Please Enter A Number Between 1 and 0");
      if (
        event.target.value === "" ||
        event.target.value === "0." ||
        event.target.value === "1." ||
        !isNaN(Number(event.target.value))
      )
        setOpacity(event.target.value);
      return;
    }
    edit.updateLayerInfo(
      props.index,
      edit.state.Tilemap.layers[props.index].name,
      edit.state.Tilemap.layers[props.index].visible,
      Number(event.target.value)
    );
    setOpacity(event.target.value);
  };

  return (
    <Box>
      <Typography pl={1}>Layer Properties</Typography>
      <Divider />
      <Stack p={1} spacing={2}>
        <TextField
          label="Layer Name"
          size="small"
          value={edit.state.Tilemap.layers[props.index].name}
          disabled={!edit.canEdit(id)}
          onChange={handleUpdateName}
        />
        <TextField
          label="Opacity"
          value={opacity}
          disabled={!edit.canEdit(id)}
          onChange={handleUpdateOpacity}
          fullWidth
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">float</InputAdornment>
            ),
          }}
        />
      </Stack>
    </Box>
  );
};

export default LayerPropertySelector;
