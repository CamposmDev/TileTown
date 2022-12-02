import { SnackContext } from "src/context/snack";
import { TilemapEditContext } from "src/context/tilemapEditor";
import { useContext, useState } from "react";
import { Property } from "src/context/tilemapEditor/TilemapEditTypes";
import {
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { AuthContext } from "src/context/auth";

interface FloatPropertyProps {
  name: string;
  type: "float";
  value: string;
  index: number;
}

const FloatPropertyField = (props: FloatPropertyProps) => {
  const auth = useContext(AuthContext);
  const edit = useContext(TilemapEditContext);
  const snack = useContext(SnackContext);

  const user = auth ? auth.usr : undefined;
  const id = user ? user.id : undefined;
  return (
    <Stack pl={1} pr={1} spacing={0.5} direction="row" alignItems="center">
      <TextField
        value={props.name}
        label="Float Name"
        disabled={!edit.canEdit(id)}
        onChange={(e) => {
          edit.updateProperty(
            { name: e.target.value, ptype: props.type, value: props.value },
            props.index
          );
        }}
      ></TextField>
      <TextField
        value={props.value}
        label="Float Value"
        disabled={!edit.canEdit(id)}
        onChange={(e) => {
          if (isNaN(Number(e.target.value))) {
            snack.showErrorMessage("Please Enter A Float Value like 1.5");
            return;
          }
          edit.updateProperty(
            { name: props.name, ptype: props.type, value: e.target.value },
            props.index
          );
        }}
      ></TextField>
      <Tooltip title="Delete Property" arrow>
        <IconButton
          disabled={!edit.canEdit(id)}
          onClick={() => {
            edit.deleteProperty(props.index);
          }}
          color="error"
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
export default FloatPropertyField;
