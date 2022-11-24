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

interface BoolPropertyProps {
  name: string;
  type: "bool";
  value: "true" | "false";
  index: number;
}

const BooleanPropertyField = (props: BoolPropertyProps) => {
  const edit = useContext(TilemapEditContext);
  const snack = useContext(SnackContext);

  return (
    <Stack pl={1} pr={1} spacing={0.5} direction="row" alignItems="center">
      <TextField
        value={props.name}
        label="Boolean Name"
        onChange={(e) => {
          edit.updateProperty(
            { name: e.target.value, ptype: props.type, value: props.value },
            props.index
          );
        }}
      ></TextField>
      <Tooltip title={props.value} arrow>
        <Checkbox
          defaultChecked={props.value === "true"}
          onChange={() => {
            const value = props.value === "true" ? "false" : "true";
            edit.updateProperty(
              { name: props.name, ptype: props.type, value },
              props.index
            );
          }}
        />
      </Tooltip>
      <Tooltip title="Delete Property" arrow>
        <IconButton
          color="error"
          onClick={() => {
            edit.deleteProperty(props.index);
          }}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
export default BooleanPropertyField;
