import { useContext } from "react";
import { TilemapEditContext } from "../../../context/tilemapEditor";
import {
  Button,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Grid,
} from "@mui/material";
import {
  Add,
  ControlPointDuplicate,
  CopyAll,
  Copyright,
  Delete,
  Layers,
  Settings,
  Visibility,
} from "@mui/icons-material";

interface LayerProps {
  name: string;
  index: number;
}

const LayerField = (props: LayerProps) => {
  const edit = useContext(TilemapEditContext);

  return (
    <Stack pl={1} pr={1} spacing={2} direction="row" alignItems="center">
      <TextField label={props.name} size="small" />
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
