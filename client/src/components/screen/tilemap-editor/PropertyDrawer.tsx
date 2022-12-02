import { Add } from "@mui/icons-material";
import { ModalContext } from "src/context/modal";
import { TilemapEditContext } from "src/context/tilemapEditor";
import { useContext } from "react";
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Checkbox,
} from "@mui/material";
import PropertySelector from "./PropertySelector";
import TilemapPropertySelector from "./TilemapPropertySelector";
import LayerPropertySelector from "./LayerPropertySelector";
import { AuthContext } from "src/context/auth";

const PropertyDrawer = () => {
  const modal = useContext(ModalContext);
  const auth = useContext(AuthContext);
  const edit = useContext(TilemapEditContext);

  const user = auth ? auth.usr : undefined;
  const id = user ? user.id : undefined;

  const currentLayerIndex = edit.state.currentLayerIndex;

  const layerProperties =
    currentLayerIndex !== -1 ? (
      <LayerPropertySelector index={currentLayerIndex}></LayerPropertySelector>
    ) : (
      <div></div>
    );

  return (
    <Drawer
      open={true}
      anchor="left"
      variant="permanent"
      PaperProps={{ sx: { mt: 15 } }}
    >
      <TilemapPropertySelector></TilemapPropertySelector>
      {layerProperties}
      <Stack pl={1} pr={1} direction="row" alignItems="center">
        <Typography flexGrow={1}>Custom Properties</Typography>
        <Tooltip title="Add Property" arrow>
          <IconButton
            color="primary"
            disabled={!edit.canEdit(id)}
            onClick={() => {
              modal.showCreatePropertyModal();
            }}
          >
            <Add />
          </IconButton>
        </Tooltip>
      </Stack>
      <Divider />
      <Stack p={1}>
        <PropertySelector></PropertySelector>
      </Stack>
    </Drawer>
  );
};

export default PropertyDrawer;
