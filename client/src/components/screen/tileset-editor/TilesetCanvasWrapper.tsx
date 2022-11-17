import { Grid } from "@mui/material";
import { useEffect, useRef, useState, useContext } from "react";
import { TilesetEditContext } from "../../../context/tilesetEditor";
import {
  TilesetEditControl,
  Color,
  ColorToDec,
  HexToDec,
} from "src/context/tilesetEditor/TilesetEditTypes";
import "./default.css";
import TilesetCanvas from "./TilesetCanvas";
import GridCanvas from "./GridCanvas";

const TilesetCanvasWrapper = () => {
  //tileset edit store context
  const edit = useContext(TilesetEditContext);

  //canvas refs

  const tileHeight = edit.state.tileset.tileHeight;
  const tileWidth = edit.state.tileset.tileWidth;
  const columns = edit.state.tileset.columns;
  const rows = edit.state.tileset.rows;
  const imageHeight: number = tileHeight * rows;
  const imageWidth: number = tileWidth * columns;
  const zoom: number = edit.state.zoom;
  const canvasHeight: number = tileHeight * 50 * zoom;
  const canvasWidth: number = tileWidth * 50 * zoom;

  return (
    <Grid id="overflow-wrapper">
      <Grid
        id="tileset-canvas-wrapper"
        sx={{ width: canvasWidth, height: canvasHeight }}
        item
        textAlign="center"
        p={1}
      >
        <TilesetCanvas></TilesetCanvas>
        <GridCanvas></GridCanvas>
      </Grid>
    </Grid>
  );
};

export default TilesetCanvasWrapper;
