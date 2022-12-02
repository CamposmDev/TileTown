import { Tooltip, Stack, Typography, IconButton } from "@mui/material";
import { TilemapEditContext } from "src/context/tilemapEditor";
import { SnackContext } from "src/context/snack";
import { Delete } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "src/context/auth";

interface CollabProps {
  index: number;
  name: string;
  id: string;
}

const CollaboratorField = (props: CollabProps) => {
  const auth = useContext(AuthContext);
  const edit = useContext(TilemapEditContext);
  const snack = useContext(SnackContext);

  const user = auth ? auth.usr : undefined;
  const id = user ? user.id : undefined;
  return (
    <Stack pl={1} pr={1} direction="row" alignItems="center">
      <Typography>{props.name}</Typography>
      <Tooltip title="Remove Collaborator" arrow>
        <IconButton
          color="error"
          disabled={!edit.canEdit(id) || !edit.isOwner(id)}
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
