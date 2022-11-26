import { Tooltip, Stack, Typography, IconButton } from "@mui/material";
import { TilemapEditContext } from "src/context/tilemapEditor";
import { SnackContext } from "src/context/snack";
import { Delete } from "@mui/icons-material";
import { useContext } from "react";

interface CollabProps {
  index: number;
  name: string;
  id: string;
}

const CollaboratorField = (props: CollabProps) => {
  const edit = useContext(TilemapEditContext);
  const snack = useContext(SnackContext);
  return (
    <Stack pl={1} pr={1} direction="row" alignItems="center">
      <Typography>{props.name}</Typography>
      <Tooltip title="Remove Collaborator" arrow>
        <IconButton
          color="error"
          onClick={() => {
            snack.showSuccessMessage(
              `User ${props.name} was removed as collaborator`
            );
            edit.removeCollaborator(props.id, props.name);
          }}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default CollaboratorField;
