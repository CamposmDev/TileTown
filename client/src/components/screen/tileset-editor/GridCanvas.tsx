import { Box, Grid } from "@mui/material";
import { useEffect, useRef, useState, useContext } from "react";
import { TilesetEditContext } from "../../../context/tilesetEditor";
import {
  TilesetEditControl,
  Color,
  ColorToDec,
  HexToDec,
} from "src/context/tilesetEditor/TilesetEditTypes";
import "./default.css";

const GridCanvas = () => {
  /**color data of all the pixels of an image
   * https://stackoverflow.com/questions/2106995/how-can-i-perform-flood-fill-with-html-canvas/56221940#56221940
   */
  type PixelData = {
    /**width of the image */
    width: number;
    /**height of the image */
    height: number;
    /**Array of all the pixel data of the image*/
    data: Uint32Array;
  };

  //tileset edit store context
  const edit = useContext(TilesetEditContext);

  //canvas refs
  const gridCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const gridColor = edit.state.gridColor;
  const gridEnabled = edit.state.gridEnabled;
  const gridSize = edit.state.gridSize;

  const tileHeight = edit.state.tileset.tileHeight;
  const tileWidth = edit.state.tileset.tileWidth;
  const columns = edit.state.tileset.columns;
  const rows = edit.state.tileset.rows;
  const imageHeight: number = tileHeight * rows;
  const imageWidth: number = tileWidth * columns;
  const canvasHeight: number = 800;
  const canvasWidth: number = 800;
  const canvasImage: HTMLImageElement = new Image();

  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    canvasHeight: number,
    canvasWidth: number,
    gridEnabled: boolean
  ) => {
    const rectHeight = canvasHeight;
    const rectWidth = canvasWidth;
    const scaleY = rectHeight / imageHeight;
    const scaleX = rectWidth / imageWidth;
    const scaledTileHeight = tileHeight * scaleY;
    const scaledTileWidth = tileWidth * scaleX;
    //draw vertical lines of grid
    if (gridEnabled) {
      for (let i = scaledTileHeight; i < rectHeight; i += scaledTileHeight) {
        ctx.moveTo(0, i);
        ctx.lineTo(rectWidth, i);
      }
      //draw horizontal lines of grid
      for (let i = scaledTileWidth; i < rectWidth; i += scaledTileWidth) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, rectHeight);
      }
      ctx.strokeStyle = gridColor;
      ctx.stroke();
      ctx.closePath();
    }
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
        drawGrid(ctx, canvasHeight, canvasWidth, gridEnabled);
      }
    }
  }, [drawGrid]);

  let root = (
    <div>
      <canvas className="tileset-canvas--no-input" ref={gridCanvasRef}>
        Please user a browser that supports HTML Canvas
      </canvas>
    </div>
  );

  return <Box>{root};</Box>;
};

export default GridCanvas;
