import { useContext, useEffect } from "react";
import { TilemapEditContext } from "../../../context/tilemapEditor";
import {
  Stack,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import LayerField from "./LayerField";
import { Layer } from "src/context/tilemapEditor/TilemapEditTypes";
import { SnackContext } from "src/context/snack";

const LayerSelector = () => {
  const edit = useContext(TilemapEditContext);
  const snack = useContext(SnackContext);
  const layers = edit.state.Tilemap.layers;

  const layerFields = layers.map((layer: Layer, index: number) => (
    <LayerField
      name={layer.name}
      visible={layer.visible}
      index={index}
      key={"uniqueKeyID" + index}
    ></LayerField>
  ));

  return (
    <Box>
      <Stack pl={1} pr={1} direction="row" alignItems="center">
        <Typography flexGrow={1}>Layer</Typography>
        <Tooltip title="Add Layer" arrow>
          <IconButton
            color="primary"
            // disabled={edit.state.Tilesets.length < 1}
            onMouseMove={() => {
              if (edit.state.Tilesets.length < 1)
                snack.showWarningMessage(
                  "Please Add A Tileset Before Adding A Layer"
                );
            }}
            onClick={() => {
              if (edit.state.Tilesets.length >= 1) edit.createNewLayer();
            }}
          >
            <Add />
          </IconButton>
        </Tooltip>
      </Stack>
      <Divider />
      {layerFields}
    </Box>
  );
};

export default LayerSelector;
