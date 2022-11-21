import {
  Grid,
  Toolbar,
  Tooltip,
  IconButton,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import {
  Save,
  Download,
  Undo,
  Redo,
  Edit,
  AutoFixHigh,
  Rectangle,
  HighlightAlt,
  Delete,
  Publish,
  Square,
  SquareOutlined,
  SelectAll,
  Schema,
  FormatColorFill,
} from "@mui/icons-material";
import { FaEraser } from "react-icons/fa";
import PropertyDrawer from "./PropertyDrawer";
import LayerDrawer from "./LayerDrawer";
import TilemapCanvas from "./TilemapCanvas";
import DeleteTileItemButton from "../../button/DeleteTileItemButton";
import PublishTilesetModal from "../../modals/PublishTilesetModal";
import PublishTileItemButton from "../../button/PublishTileItemButton";
import {
  Color,
  TilemapEditControl,
} from "src/context/tilemapEditor/TilemapEditTypes";
import { useContext, useEffect } from "react";
import { TilemapEditContext } from "src/context/tilemapEditor";

const TilemapToolbar = () => {
  let timeLeft = "1:24";
  let tilesLeft = 5;
  let nextCollaboratorName = "PeteyLumpkins";

  const edit = useContext(TilemapEditContext);

  //set the color of the selected mode
  const unselectedColor = "#FFFFFF";
  const selectedColor = "#ADD8E6";
  const currentEditControl = edit.state.currentEditControl;
  let drawColor: Color = unselectedColor;
  let eraseColor: Color = unselectedColor;
  let fillColor: Color = unselectedColor;
  let bucketColor: Color = unselectedColor;
  let selectColor: Color = unselectedColor;
  let magicColor: Color = unselectedColor;
  let sameColor: Color = unselectedColor;

  switch (currentEditControl) {
    case TilemapEditControl.draw: {
      drawColor = selectedColor;
      break;
    }
    case TilemapEditControl.erase: {
      eraseColor = selectedColor;
      break;
    }
    case TilemapEditControl.shapeFill: {
      fillColor = selectedColor;
      break;
    }
    case TilemapEditControl.bucketFill: {
      bucketColor = selectedColor;
      break;
    }
    case TilemapEditControl.fillSelect: {
      selectColor = selectedColor;
      break;
    }
    case TilemapEditControl.magicWand: {
      magicColor = selectedColor;
      break;
    }
    case TilemapEditControl.sameTileSelect: {
      sameColor = selectedColor;
      break;
    }
    default:
      break;
  }

  const setEditControl = (editControl: TilemapEditControl) => {
    edit.updateEditControl(editControl);
  };
  return (
    <Grid alignItems="center">
      <Toolbar sx={{ boxShadow: 1 }} variant="dense">
        <Grid container direction="row" alignItems="center">
          <PropertyDrawer />
          <LayerDrawer />
          <Grid item flexGrow={1}>
            <Tooltip
              title="Save"
              arrow
              children={<IconButton color="primary" children={<Save />} />}
            />
            <Tooltip
              title="Download"
              arrow
              children={<IconButton color="primary" children={<Download />} />}
            />
            <Tooltip
              title="Undo"
              arrow
              children={<IconButton color="primary" children={<Undo />} />}
            />
            <Tooltip
              title="Redo"
              arrow
              children={<IconButton color="primary" children={<Redo />} />}
            />
            <Tooltip
              title="Draw"
              arrow
              children={
                <IconButton
                  color="primary"
                  sx={{ bgcolor: drawColor }}
                  onClick={() => setEditControl(TilemapEditControl.draw)}
                  children={<Edit />}
                />
              }
            />
            <Tooltip
              title="Eraser"
              arrow
              children={
                <IconButton
                  color="primary"
                  sx={{ bgcolor: eraseColor }}
                  onClick={() => setEditControl(TilemapEditControl.erase)}
                >
                  <FaEraser></FaEraser>
                </IconButton>
              }
            />
            <Tooltip
              title="Space Fill"
              arrow
              children={
                <IconButton
                  color="primary"
                  sx={{ bgcolor: fillColor }}
                  onClick={() => setEditControl(TilemapEditControl.shapeFill)}
                  children={<Square />}
                />
              }
            />
            <Tooltip
              title="Bucket Fill"
              arrow
              children={
                <IconButton
                  color="primary"
                  sx={{ bgcolor: bucketColor }}
                  onClick={() => setEditControl(TilemapEditControl.bucketFill)}
                  children={<FormatColorFill />}
                />
              }
            />
            <Tooltip
              title="Space Select"
              arrow
              children={
                <IconButton
                  color="primary"
                  sx={{ bgcolor: selectColor }}
                  onClick={() =>
                    edit.updateEditControl(TilemapEditControl.fillSelect)
                  }
                  children={<SelectAll />}
                />
              }
            />
            <Tooltip
              title="Magic Wand"
              arrow
              children={
                <IconButton
                  color="primary"
                  sx={{ bgcolor: magicColor }}
                  onClick={() => setEditControl(TilemapEditControl.magicWand)}
                  children={<AutoFixHigh />}
                />
              }
            />
            <Tooltip
              title="Same Tile Selector"
              arrow
              children={
                <IconButton
                  color="primary"
                  sx={{ bgcolor: sameColor }}
                  onClick={() =>
                    setEditControl(TilemapEditControl.sameTileSelect)
                  }
                  children={<Schema />}
                />
              }
            />
          </Grid>
          <Grid item>
            <Stack direction={"row"} spacing={1}>
              <DeleteTileItemButton name={edit.state.Tilemap.name} callback={() => {}}/>
              <PublishTileItemButton name={edit.state.Tilemap.name}  callback={() => {}}/>
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
      <Toolbar sx={{ boxShadow: 1 }} variant="dense">
        <Grid container direction="column" alignContent="center">
          <Stack direction="row" spacing={4}>
            <Typography>Time Left:&ensp;{timeLeft}</Typography>
            <Typography>Tiles Left:&ensp;{tilesLeft}</Typography>
            <Typography>Next:&ensp;{nextCollaboratorName}</Typography>
          </Stack>
        </Grid>
      </Toolbar>
    </Grid>
  );
};
export default TilemapToolbar;
