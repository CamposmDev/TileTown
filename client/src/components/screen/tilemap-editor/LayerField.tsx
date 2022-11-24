import { useContext, useEffect } from "react";
import { TilemapEditContext } from "../../../context/tilemapEditor";
import { IconButton, Stack, TextField, Tooltip, Checkbox } from "@mui/material";
import {
  Delete,
  Layers,
  Visibility,
  VisibilityOff,
  SwapCalls,
} from "@mui/icons-material";
import { Color } from "src/context/tilemapEditor/TilemapEditTypes";

interface LayerProps {
  name: string;
  index: number;
  visible: boolean;
}

const LayerField = (props: LayerProps) => {
  console.log(props.name);
  const edit = useContext(TilemapEditContext);

  useEffect(() => {}, [props.name, props.visible, props.index]);

  const updateLayerName = (event: any): void => {
    edit.updateLayerInfo(props.index, event.target.value);
  };

  const toggleLayerVisibility = (): void => {
    edit.updateLayerInfo(props.index, props.name, !props.visible);
  };

  const toggleSelectLayer = (): void => {
    const index =
      edit.state.currentLayerIndex === props.index ? -1 : props.index;
    edit.updateCurrentLayer(index);
  };

  const duplicateLayer = (): void => {
    edit.createNewLayer(
      props.name,
      edit.state.Tilemap.layers[props.index].data
    );
  };

  const deleteLayer = (): void => {
    edit.deleteLayer(props.index);
  };

  const handleSwap = (): void => {
    if (edit.state.currentSwapIndex === -1) {
      edit.updateSwapIndex(props.index);
      return;
    }
    if (edit.state.currentSwapIndex === props.index) {
      edit.updateSwapIndex(-1);
      return;
    }
    edit.swapLayers(props.index);
  };

  const visibilityIcon = props.visible ? (
    <Visibility></Visibility>
  ) : (
    <VisibilityOff></VisibilityOff>
  );

  const swapColor: Color =
    props.index === edit.state.currentSwapIndex ? "#ADD8E6" : "#FFFFFF";

  return (
    <Stack pl={1} pr={1} spacing={2} direction="row" alignItems="center">
      <TextField
        label="Name"
        defaultValue={props.name}
        value={props.name}
        size="small"
        onBlur={updateLayerName}
        onChange={updateLayerName}
      />
      <Tooltip title="Select/Unselect Layer" arrow>
        <Checkbox
          checked={edit.state.currentLayerIndex === props.index}
          onChange={toggleSelectLayer}
        ></Checkbox>
      </Tooltip>
      <Tooltip title="Hide/Show Layer" arrow>
        <IconButton onClick={toggleLayerVisibility}>
          {visibilityIcon}
        </IconButton>
      </Tooltip>
      <Tooltip title="Duplicate Layer" arrow>
        <IconButton color="primary" onClick={duplicateLayer}>
          <Layers />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Layer" arrow>
        <IconButton color="error" onClick={deleteLayer}>
          <Delete />
        </IconButton>
      </Tooltip>
      <Tooltip title="Swap Layer" arrow>
        <IconButton
          color="primary"
          onClick={handleSwap}
          sx={{ bgcolor: swapColor }}
        >
          <SwapCalls />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
export default LayerField;
