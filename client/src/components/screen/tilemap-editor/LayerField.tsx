import { useContext } from "react";
import { TilemapEditContext } from "../../../context/tilemapEditor";
import { IconButton, Stack, TextField, Tooltip, Checkbox } from "@mui/material";
import { Delete, Layers, Visibility } from "@mui/icons-material";

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

  const updateLayerVisibility = (): void => {
    edit.updateLayerInfo(props.index, props.name, !props.visible);
  };

  const toggleSelectLayer = (): void => {
    const index =
      edit.state.currentLayerIndex === props.index ? -1 : props.index;
    edit.updateCurrentLayer(index);
  };

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
        <IconButton>
          <Visibility></Visibility>
        </IconButton>
      </Tooltip>
      <Tooltip title="Duplicate Layer" arrow>
        <IconButton color="primary">
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
