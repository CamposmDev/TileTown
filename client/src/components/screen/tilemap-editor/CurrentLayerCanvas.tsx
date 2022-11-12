import { Box, Grid } from "@mui/material";
import { useEffect, useRef, useState, useContext } from "react";
import { TilemapEditContext } from "../../../context/tilemapEditor";
import "./default.css";

const CurrentLayerCanvas = () => {
  //Tilemap edit store context
  const edit = useContext(TilemapEditContext);

  //canvas refs
  const gridCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const tileHeight = edit.state.Tilemap.tileHeight;
  const tileWidth = edit.state.Tilemap.tileWidth;
  const height = edit.state.Tilemap.height;
  const width = edit.state.Tilemap.width;
  const imageHeight: number = tileHeight * height;
  const imageWidth: number = tileWidth * width;
  const canvasHeight: number = 800;
  const canvasWidth: number = 800;

  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    canvasHeight: number,
    canvasWidth: number
  ) => {
    const rectHeight = canvasHeight;
    const rectWidth = canvasWidth;
    console.log(rectWidth);
    const scaleY = rectHeight / imageHeight;
    const scaleX = rectWidth / imageWidth;
    const scaledTileHeight = tileHeight * scaleY;
    const scaledTileWidth = tileWidth * scaleX;
    console.log(scaledTileWidth);
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
    ctx.closePath();
  };

  useEffect(() => {
    console.log("rerender grid canvas");
    if (gridCanvasRef.current) {
      const canvas: HTMLCanvasElement = gridCanvasRef.current;
      canvas.height = canvasHeight;
      canvas.width = canvasWidth;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d", {
        willReadFrequently: true,
      });
      if (ctx) {
        gridContextRef.current = ctx;
        drawGrid(ctx, canvasHeight, canvasWidth);
      }
    }
  }, [drawGrid]);

  let root = (
    <div>
      <canvas className="tilemap-canvas--no-input" ref={gridCanvasRef}>
        Please user a browser that supports HTML Canvas
      </canvas>
    </div>
  );

  return <Box>{root};</Box>;
};

export default CurrentLayerCanvas;
