import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import "./default.css";
import {
  Layer,
  Color,
  Property,
} from "src/context/tilemapEditor/TilemapEditTypes";
import { Type } from "./Type";

const TilemapCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const tileHeight: number = 30;
  const tileWidth: number = 32;
  const columns: number = 30;
  const rows: number = 13;
  const imageHeight: number = tileHeight * rows;
  const imageWidth: number = tileWidth * columns;
  const canvasHeight: number = 400;
  const canvasWidth: number = 400;

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
  }, []);

  let root = (
    <canvas className="tilemap-canvas" ref={canvasRef}>
      Please use a browser that supports canvas
    </canvas>
  );
  return (
    <Grid item textAlign="center" p={1}>
      {root}
    </Grid>
  );
};

export default TilemapCanvas;
