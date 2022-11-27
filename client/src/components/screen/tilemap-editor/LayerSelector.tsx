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

const LayerSelector = () => {
  const edit = useContext(TilemapEditContext);
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
            onClick={() => {
              edit.createNewLayer();
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
