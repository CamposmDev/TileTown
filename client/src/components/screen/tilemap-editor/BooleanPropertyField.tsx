import { SnackContext } from "src/context/snack";
import { TilemapEditContext } from "src/context/tilemapEditor";
import { useContext, useState } from "react";
import { Property } from "src/context/tilemapEditor/TilemapEditTypes";
import { Checkbox, Stack, TextField, Typography } from "@mui/material";

interface BoolPropertyProps {
  name: string;
  type: "bool";
  value: "true" | "false";
  index: number;
}

const BooleanPropertyField = (props: BoolPropertyProps) => {
  return (
    <Stack pl={1} pr={1} spacing={0.5} direction="row" alignItems="center">
      <TextField value={props.name}></TextField>
      <Checkbox defaultChecked={props.value === "true"} />
    </Stack>
  );
};
export default BooleanPropertyField;
