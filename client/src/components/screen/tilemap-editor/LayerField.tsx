import { useContext } from "react";
import { TilemapEditContext } from "../../../context/tilemapEditor";
import { IconButton, Stack, TextField, Tooltip, Checkbox } from "@mui/material";
import { Delete, Layers, Visibility, VisibilityOff } from "@mui/icons-material";

interface LayerProps {
  name: string;
  index: number;
  visible: boolean;
}

const LayerField = (props: LayerProps) => {
  const edit = useContext(TilemapEditContext);

  const updateLayerName = (event: any): void => {
    edit.updateLayerInfo(props.index, event.target.value);
  };

  const toggleLayerVisibility = (): void => {
    console.log("toggle visibility");
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

  const visibilityIcon = props.visible ? (
    <Visibility></Visibility>
  ) : (
    <VisibilityOff></VisibilityOff>
  );

  return (
    <Stack pl={1} pr={1} spacing={2} direction="row" alignItems="center">
      <TextField
        label="Name"
        defaultValue={props.name}
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
        <IconButton color="error">
          <Delete />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
export default LayerField;
