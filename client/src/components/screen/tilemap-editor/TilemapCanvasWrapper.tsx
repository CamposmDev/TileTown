import { Grid } from "@mui/material";
import { useEffect, useRef, useState, useContext } from "react";
import { TilemapEditContext } from "../../../context/tilemapEditor";
import {
  TilemapEditControl,
  Color,
  ColorToDec,
  HexToDec,
} from "src/context/tilemapEditor/TilemapEditTypes";
import "./default.css";
import TilemapCanvas from "./TilemapCanvas";
import CurrentLayerCanvas from "./CurrentLayerCanvas";

const TilemapCanvasWrapper = () => {
  //tilemap edit store context
  const edit = useContext(TilemapEditContext);

  //canvas refs

  const tileHeight = edit.state.Tilemap.tileHeight;
  const tileWidth = edit.state.Tilemap.tileWidth;
  const height = edit.state.Tilemap.height;
  const width = edit.state.Tilemap.width;
  const imageHeight: number = tileHeight * height;
  const imageWidth: number = tileWidth * width;
  const canvasHeight: number = tileHeight * 50;
  const canvasWidth: number = tileWidth * 50;

  return (
    <Grid id="overflow-wrapper">
      <Grid
        id="tilemap-canvas-wrapper"
        sx={{ width: canvasWidth, height: canvasHeight }}
        item
        textAlign="center"
        p={1}
      >
        <TilemapCanvas></TilemapCanvas>
        <CurrentLayerCanvas></CurrentLayerCanvas>
      </Grid>
    </Grid>
  );
};

export default TilemapCanvasWrapper;
