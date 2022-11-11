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
    if (canvas) {
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (ctx) {
        const rectHeight = canvas.height;
        const rectWidth = canvas.width;
        const scaleY = rectHeight / imageHeight;
        const scaleX = rectWidth / imageWidth;
        const scaledTileHeight = tileHeight * scaleY;
        const scaledTileWidth = tileWidth * scaleX;

        //draw vertical lines of grid
        for (let i = scaledTileHeight; i < rectHeight; i += scaledTileHeight) {
          ctx.moveTo(0, i);
          ctx.lineTo(rectWidth, i);
        }
        //draw horizontal lines of grid
        for (let i = scaledTileWidth; i < rectWidth; i += scaledTileWidth) {
          ctx.moveTo(i, 0);
          ctx.lineTo(i, rectHeight);
        }
        ctx.strokeStyle = "#000000";
        ctx.stroke();
      }
    }
  }, []);

  let root = (
    <div id="tilemap-canvas-wrapper">
      <canvas className="tilemap-canvas" ref={canvasRef}>
        Please use a browser that supports canvas
      </canvas>
    </div>
  );
  return (
    <Grid item textAlign="center" p={1}>
      {root}
    </Grid>
  );
};

export default TilemapCanvas;
