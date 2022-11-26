import { Divider, Drawer, Stack } from "@mui/material";
import LayerSelector from "./LayerSelector";
import CollaboratorSettingsSelector from "./CollaboratorSettingsSelector";
import CollaboratorSelector from "./CollaboratorSelector";
import TilesetSelector from "./TilesetSelector";

const LayerDrawer = () => {
  return (
    <Drawer
      open={true}
      anchor="right"
      variant="permanent"
      PaperProps={{ sx: { mt: 15, overflow: "auto", height: "700px" } }}
    >
      <LayerSelector></LayerSelector>
      <Stack p={1} spacing={2}></Stack>
      <CollaboratorSelector></CollaboratorSelector>
      <Divider />
      <CollaboratorSettingsSelector></CollaboratorSettingsSelector>,
      <TilesetSelector></TilesetSelector>
    </Drawer>
  );
};

export default LayerDrawer;
