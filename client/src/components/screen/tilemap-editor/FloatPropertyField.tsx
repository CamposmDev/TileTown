import { SnackContext } from "src/context/snack";
import { TilemapEditContext } from "src/context/tilemapEditor";
import { useContext, useState } from "react";
import { Property } from "src/context/tilemapEditor/TilemapEditTypes";
import { Checkbox, Stack, TextField, Typography } from "@mui/material";

interface FloatPropertyProps {
  name: string;
  type: "float";
  value: string;
  index: number;
}

const FloatPropertyField = (props: FloatPropertyProps) => {
  return (
    <Stack pl={1} pr={1} spacing={0.5} direction="row" alignItems="center">
      <TextField value={props.name}></TextField>
      <TextField value={props.value}></TextField>
    </Stack>
  );
};
export default FloatPropertyField;
