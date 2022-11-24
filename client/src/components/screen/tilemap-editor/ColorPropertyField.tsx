import { SnackContext } from "src/context/snack";
import { TilemapEditContext } from "src/context/tilemapEditor";
import { useContext, useState } from "react";
import {
  Property,
  Color,
  isColor,
} from "src/context/tilemapEditor/TilemapEditTypes";
import {
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

interface ColorPropertyProps {
  name: string;
  type: "color";
  value: string;
  index: number;
}

const ColorPropertyField = (props: ColorPropertyProps) => {
  const edit = useContext(TilemapEditContext);
  const snack = useContext(SnackContext);

  return (
    <Stack pl={1} pr={1} spacing={0.5} direction="row" alignItems="center">
      <TextField
        value={props.name}
        label="Color Name"
        onChange={(e) => {
          edit.updateProperty(
            { name: e.target.value, ptype: props.type, value: props.value },
            props.index
          );
        }}
      ></TextField>
      <TextField
        value={props.value}
        label="Color Value"
        onChange={(e) => {
          if (!isColor(e.target.value)) {
            snack.showErrorMessage(
              "Please Enter a Color In The Format `#000000` Or `rgb(000, 000, 000)`"
            );
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
export default ColorPropertyField;
