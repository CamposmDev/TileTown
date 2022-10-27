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
} from "@mui/icons-material";
import { FaEraser } from "react-icons/fa";
import PropertyDrawer from "./PropertyDrawer";
import LayerDrawer from "./LayerDrawer";
import TilemapCanvas from "./TilemapCanvas";

const TilemapEditorScreen = () => {
  let timeLeft = "1:24";
  let tilesLeft = 5;
  let nextCollaboratorName = "PeteyLumpkins";
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
                  onDoubleClick={() => console.log("double clicked")}
                  children={<Edit />}
                />
              }
            />
            <Tooltip
              title="Eraser"
              arrow
              children={
                <IconButton color="primary">
                  <FaEraser></FaEraser>
                </IconButton>
              }
            />
            <Tooltip
              title="What is this Andrew?"
              arrow
              children={<IconButton color="primary" children={<Square />} />}
            />
            <Tooltip
              title="What is this Andrew?"
              arrow
              children={<IconButton color="primary" children={<SelectAll />} />}
            />
            <Tooltip
              title="Magic Wand"
              arrow
              children={
                <IconButton color="primary" children={<AutoFixHigh />} />
              }
            />
            <Tooltip
              title="What is this Andrew?"
              arrow
              children={<IconButton color="primary" children={<Schema />} />}
            />
          </Grid>
          <Grid item>
            <Stack direction={"row"} spacing={1}>
              <Button startIcon={<Delete />} color="error">
                Delete
              </Button>
              <Button startIcon={<Publish />} color="primary">
                Publish
              </Button>
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
      <TilemapCanvas />
    </Grid>
  );
};

export default TilemapEditorScreen;
