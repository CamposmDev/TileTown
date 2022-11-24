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

interface FloatPropertyProps {
  name: string;
  type: "float";
  value: string;
  index: number;
}

const FloatPropertyField = (props: FloatPropertyProps) => {
  const edit = useContext(TilemapEditContext);
  const snack = useContext(SnackContext);
  return (
    <Stack pl={1} pr={1} spacing={0.5} direction="row" alignItems="center">
      <TextField
        value={props.name}
        label="Float Name"
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
export default FloatPropertyField;
