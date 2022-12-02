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

interface IntPropertyProps {
  name: string;
  type: "int";
  value: string;
  index: number;
}

const IntegerPropertyField = (props: IntPropertyProps) => {
  const auth = useContext(AuthContext);
  const edit = useContext(TilemapEditContext);
  const snack = useContext(SnackContext);

  const user = auth ? auth.usr : undefined;
  const id = user ? user.id : undefined;
  return (
    <Stack pl={1} pr={1} spacing={0.5} direction="row" alignItems="center">
      <TextField
        value={props.name}
        label="Integer Name"
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
        label="Integer Value"
        disabled={!edit.canEdit(id)}
        onChange={(e) => {
          if (isNaN(Number(e.target.value))) {
            snack.showErrorMessage("Please Enter An Integer Value");
            return;
          }
          edit.updateProperty(
            {
              name: props.name,
              ptype: props.type,
              value: Math.floor(Number(e.target.value)).toString(),
            },
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
export default IntegerPropertyField;
