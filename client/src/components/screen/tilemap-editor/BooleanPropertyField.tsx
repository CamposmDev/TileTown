import { TilemapEditContext } from "src/context/tilemapEditor";
import { useContext } from "react";
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

interface BoolPropertyProps {
  name: string;
  type: "bool";
  value: "true" | "false";
  index: number;
}

const BooleanPropertyField = (props: BoolPropertyProps) => {
  const auth = useContext(AuthContext);
  const edit = useContext(TilemapEditContext);

  const user = auth ? auth.usr : undefined;
  const id = user ? user.id : undefined;

  return (
    <Stack pl={1} pr={1} spacing={0.5} direction="row" alignItems="center">
      <TextField
        value={props.name}
        label="Boolean Name"
        disabled={!edit.canEdit(id)}
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
          disabled={!edit.canEdit(id)}
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
          disabled={!edit.canEdit(id)}
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
