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

interface StringPropertyProps {
  name: string;
  type: "string";
  value: string;
  index: number;
}

const StringPropertyField = (props: StringPropertyProps) => {
  const edit = useContext(TilemapEditContext);
  const snack = useContext(SnackContext);
  return (
    <Stack pl={1} pr={1} spacing={0.5} direction="row" alignItems="center">
      <TextField
        value={props.name}
        label="String Name"
        onChange={(e) => {
          edit.updateProperty(
            { name: e.target.value, ptype: props.type, value: props.value },
            props.index
          );
        }}
      ></TextField>
      <TextField
        value={props.value}
        label="String Value"
        onChange={(e) => {
          edit.updateProperty(
            { name: props.name, ptype: props.type, value: e.target.value },
            props.index
          );
        }}
      ></TextField>
      <Tooltip
        title="Delete Property"
        onClick={() => {
          edit.deleteProperty(props.index);
        }}
        arrow
      >
        <IconButton color="error">
          <Delete />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
export default StringPropertyField;
