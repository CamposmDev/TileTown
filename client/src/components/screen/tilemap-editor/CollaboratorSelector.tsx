import { Add, Delete } from "@mui/icons-material";
import {
  Divider,
  Stack,
  Tooltip,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { useContext } from "react";
import { TilemapEditContext } from "src/context/tilemapEditor";
import { SnackContext } from "src/context/snack";
import { ModalContext } from "src/context/modal";
import CollaboratorField from "./CollaboratorField";

const CollaboratorSelector = () => {
  const edit = useContext(TilemapEditContext);
  const snack = useContext(SnackContext);
  const modal = useContext(ModalContext);

  const collaborators = edit.state.Tilemap.collaborators;
  const collaboratorNames = edit.state.Tilemap.collaboratorNames;

  return (
    <Box>
      <Stack pl={1} pr={1} direction="row" alignItems="center">
        <Typography flexGrow={1}>
          Collaborators&ensp;({edit.state.Tilemap.collaborators.length})
        </Typography>
        <Tooltip title="Add Collaborator" arrow>
          <IconButton
            color="primary"
            onClick={() => {
              modal.showAddCollaboratorModal();
            }}
          >
            <Add />
          </IconButton>
        </Tooltip>
      </Stack>
      <Divider />
      {collaborators.map((collaborator, index) => (
        <CollaboratorField
          name={collaboratorNames[index]}
          index={index}
          id={collaborator}
          key={"Unique Id: " + index}
        ></CollaboratorField>
      ))}
    </Box>
  );
};

export default CollaboratorSelector;
