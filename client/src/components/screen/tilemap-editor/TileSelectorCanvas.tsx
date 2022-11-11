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

const TileSelectorCanvas = () => {
  //tilemap edit store context
  const edit = useContext(TilemapEditContext);

  //canvas refs
  const gridCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const tileHeight =
    edit.state.Tilesets[edit.state.currentTilesetIndex].tileHeight;
  const tileWidth =
    edit.state.Tilesets[edit.state.currentTilesetIndex].tileWidth;
  const rows = edit.state.Tilesets[edit.state.currentTilesetIndex].rows;
  const columns = edit.state.Tilesets[edit.state.currentTilesetIndex].columns;
  const image = edit.state.Tilesets[edit.state.currentTilesetIndex].image;

  const imageHeight: number = tileHeight * rows;
  const imageWidth: number = tileWidth * columns;
  const canvasHeight: number = (imageHeight / imageWidth) * 100;
  const canvasWidth: number = (imageWidth / imageHeight) * 100;
  const canvasImage: HTMLImageElement = new Image();

  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    canvasHeight: number,
    canvasWidth: number
  ) => {
    const rectHeight = canvasHeight;
    const rectWidth = canvasWidth;
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
    ctx.closePath();
  };

  const drawImage = (
    ctx: CanvasRenderingContext2D,
    canvasImage: HTMLImageElement,
    src: string,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    canvasImage.src = image;
    canvasImage.onload = () => {
      ctx.drawImage(canvasImage, 0, 0, canvasWidth, canvasHeight);
    };
  };

  useEffect(() => {
    if (gridCanvasRef.current) {
      const canvas: HTMLCanvasElement = gridCanvasRef.current;
      canvas.height = canvasHeight;
      canvas.width = canvasWidth;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d", {
        willReadFrequently: true,
      });
      if (ctx) {
        gridContextRef.current = ctx;
        drawImage(ctx, canvasImage, image, canvasWidth, canvasHeight);
        drawGrid(ctx, canvasHeight, canvasWidth);
      }
    }
  }, [drawGrid, drawImage]);

  let root = (
    <div>
      <canvas className="tilemap-canvas" ref={gridCanvasRef}>
        Please user a browser that supports HTML Canvas
      </canvas>
    </div>
  );

  return (
    <Grid
      id="tilemap-canvas-wrapper"
      sx={{ width: canvasWidth, height: canvasHeight }}
      item
      textAlign="center"
      p={1}
    >
      {root}
    </Grid>
  );
};

export default TileSelectorCanvas;
