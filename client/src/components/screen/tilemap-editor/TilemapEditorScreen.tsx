import { Grid } from "@mui/material";
import TilemapCanvasWrapper from "./TilemapCanvasWrapper";
import TilemapToolbar from "./TilemapToolbar";

const TilemapEditorScreen = () => {
  return (
    <Grid alignItems="center">
      <TilemapToolbar />
      <TilemapCanvasWrapper />
    </Grid>
  );
};

export default TilemapEditorScreen;
