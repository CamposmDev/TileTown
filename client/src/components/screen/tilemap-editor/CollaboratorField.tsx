import { Tooltip, Stack, Typography, IconButton } from "@mui/material";
import { TilemapEditContext } from "src/context/tilemapEditor";
import { Delete } from "@mui/icons-material";

interface CollabProps {
  index: number;
  name: string;
  id: string;
}

const CollaboratorField = (props: CollabProps) => {
  return (
    <Stack pl={1} pr={1} direction="row" alignItems="center">
      <Typography>{props.name}</Typography>
      <Tooltip title="Remove Collaborator" arrow>
        <IconButton color="error">
          <Delete />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default CollaboratorField;
