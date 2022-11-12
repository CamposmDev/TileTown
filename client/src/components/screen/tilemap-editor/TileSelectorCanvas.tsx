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
  const currentGlobalTileID =
    edit.state.Tilemap.globalTileIDs[edit.state.currentTilesetIndex];
  const currentTileIndex = edit.state.currentTileIndex;

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
    canvasImage.src = src;
    canvasImage.onload = () => {
      ctx.drawImage(canvasImage, 0, 0, canvasWidth, canvasHeight);
      drawGrid(ctx, canvasHeight, canvasWidth);
      highlightSelectedTile(ctx, canvasWidth, canvasHeight);
    };
  };

  const highlightSelectedTile = (
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    const rectHeight = canvasHeight;
    const rectWidth = canvasWidth;
    const scaleY = rectHeight / imageHeight;
    const scaleX = rectWidth / imageWidth;
    const scaledTileHeight = tileHeight * scaleY;
    const scaledTileWidth = tileWidth * scaleX;
    //works with shapes but not with images
    ctx.fillStyle = "rgba(25, 255, 255, 0.3)";
    ctx.fillRect(
      ((currentTileIndex - currentGlobalTileID) % columns) * scaledTileWidth,
      Math.floor((currentTileIndex - currentGlobalTileID) / columns) *
        scaledTileHeight,
      scaledTileWidth,
      scaledTileHeight
    );
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
      }
    }
  }, []);

  const selectCurrentTile = ({ nativeEvent }: any): void => {
    if (gridCanvasRef.current && gridContextRef.current) {
      const canvas: HTMLCanvasElement = gridCanvasRef.current;
      const ctx: CanvasRenderingContext2D = gridContextRef.current;
      const currentCoords = screenToCanvasCoordinates(nativeEvent, canvas);
      const currentTile = calcCurrentTile(currentCoords.x, currentCoords.y);
      edit.updateCurrentTile(
        currentTile.x + columns * currentTile.y + currentGlobalTileID
      );
      highlightSelectedTile(ctx, canvasWidth, canvasHeight);
    }
  };
  const screenToCanvasCoordinates = (
    nativeEvent: any,
    canvas: HTMLCanvasElement
  ): { x: number; y: number } => {
    const rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width, // relationship bitmap vs. element for x
      scaleY = canvas.height / rect.height;
    return {
      x: (nativeEvent.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
      y: (nativeEvent.clientY - rect.top) * scaleY, // been adjusted to be relative to element
    };
  };

  /**
   *
   * @param x current x Position of mouse relative to Canvas
   * @param y current y Position of mouse relative to Canvas
   * @returns the 0 indexed column and row of the current tile
   */
  const calcCurrentTile = (x: number, y: number): { x: number; y: number } => {
    const scaleY = canvasHeight / imageHeight;
    const scaleX = canvasWidth / imageWidth;
    const scaledTileHeight = tileHeight * scaleY;
    const scaledTileWidth = tileWidth * scaleX;
    return {
      x: Math.floor(x / scaledTileWidth),
      y: Math.floor(y / scaledTileHeight),
    };
  };

  let root = (
    <div>
      <canvas
        className="tilemap-canvas"
        ref={gridCanvasRef}
        onMouseDown={selectCurrentTile}
      >
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
