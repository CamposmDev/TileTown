import { Grid } from "@mui/material";
import { useEffect, useRef, useState, useContext } from "react";
import { TilemapEditContext } from "../../../context/tilemapEditor";
import "./default.css";
import {
  Layer,
  Color,
  Property,
} from "src/context/tilemapEditor/TilemapEditTypes";
import { Type } from "./Type";

const TilemapCanvas = () => {
  //tilemap edit store context
  const edit = useContext(TilemapEditContext);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const tileHeight: number = edit.state.Tilemap.tileHeight;
  const tileWidth: number = edit.state.Tilemap.tileWidth;
  const height: number = edit.state.Tilemap.height;
  const width: number = edit.state.Tilemap.width;
  const imageHeight: number = tileHeight * height;
  const imageWidth: number = tileWidth * width;

  const currentTilesetIndex = edit.state.currentTileIndex;
  const currentTileIndex = edit.state.currentTileIndex;
  const currentGlobalTileIDs = edit.state.Tilemap.globalTileIDs;

  const canvasHeight: number = 800;
  const canvasWidth: number = 800;

  /**
   *Draws a layer on the canvas row by row
   *@ctx {CanvasRenderingContext2D} Context for the canvas
   *@layerIndex {number} index of current layer being drawn
   *@scaledTileWidth {number} tileWidth scaled from image to canvas
   *@scaledTileHeight {number} tileHeight scaled from image to canvas
   */
  const drawLayer = (
    ctx: CanvasRenderingContext2D,
    layerIndex: number,
    scaledTileWidth: number,
    scaledTileHeight: number
  ): void => {
    let currentDataIndex = 0;
    for (let i = 0; i < height; i++) {
      drawRow(
        ctx,
        layerIndex,
        currentDataIndex,
        scaledTileWidth,
        scaledTileHeight,
        i * scaledTileHeight
      );
      currentDataIndex += width;
    }
  };
  /**
   *Draws a row tile by tile, taking part of the tileset
   *specified by the global tile id at the current layer
   *data
   *@ctx {CanvasRenderingContext2D} Context for the canvas
   *@layerIndex {number} index of current layer being draw
   *@dataIndex {number} current index of the data in the layer being drawn
   *@scaledTileWidth {number} tileWidth scaled from image to canvas
   *@scaledTileHeight {number} tileHeight scaled from image to canvas
   *@y {number} y coordinate of the top left of the row being drawn
   */
  const drawRow = (
    ctx: CanvasRenderingContext2D,
    layerIndex: number,
    dataIndex: number,
    scaledTileWidth: number,
    scaledTileHeight: number,
    y: number
  ): void => {
    for (let i = 0; i < canvasWidth; i += scaledTileWidth) {
      const currentTileIndex =
        edit.state.Tilemap.layers[layerIndex].data[
          i / scaledTileWidth + dataIndex
        ];
      if (currentTileIndex > 0) {
        let currentGlobalTileID: number = 0;
        let currentTilesetIndex: number = 0;
        for (let i = currentGlobalTileIDs.length - 1; i >= 0; i--) {
          if (currentGlobalTileIDs[i] < currentTileIndex) {
            currentGlobalTileID = currentGlobalTileIDs[i];
            currentTilesetIndex = i;
          }
        }
        const tilesetTileWidth =
          edit.state.Tilesets[currentTilesetIndex].tileWidth;
        const tilesetTileHeight =
          edit.state.Tilesets[currentTilesetIndex].tileHeight;
        const tilesetWidth = edit.state.Tilesets[currentTilesetIndex].columns;

        const image: HTMLImageElement = new Image();
        image.src = edit.state.Tilesets[currentTilesetIndex].image;
        image.onload = () => {
          ctx.drawImage(
            image,
            ((currentTileIndex - currentGlobalTileID) % tilesetWidth) *
              tilesetTileWidth,
            Math.floor(
              (currentTileIndex - currentGlobalTileID) / tilesetWidth
            ) * tilesetTileHeight,
            tilesetTileWidth,
            tilesetTileHeight,
            i,
            y,
            scaledTileWidth,
            scaledTileHeight
          );
        };
      }
    }
  };

  /**
   * draws the Canvas layer by layer
   * @param ctx {CanvasRenderingContext2D} Context for the canvas
   * @scaledTileWidth {number} tileWidth scaled from image to canvas
   * @scaledTileHeight {number} tileHeight scaled from image to canvas
   */
  const drawCanvas = (
    ctx: CanvasRenderingContext2D,
    scaledTileWidth: number,
    scaledTileHeight: number
  ) => {
    for (let i = 0; i < edit.state.Tilemap.layers.length; i++) {
      drawLayer(ctx, i, scaledTileWidth, scaledTileHeight);
    }
  };

  useEffect(() => {
    console.log("render tilemap");
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d", {
        willReadFrequently: true,
      });
      if (ctx) {
        canvas.height = canvasHeight;
        canvas.width = canvasWidth;
        const scaleY = canvasHeight / imageHeight;
        const scaleX = canvasWidth / imageWidth;
        const scaledTileHeight = tileHeight * scaleY;
        const scaledTileWidth = tileWidth * scaleX;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCanvas(ctx, scaledTileWidth, scaledTileHeight);
      }
    }
  }, [drawCanvas]);

  const highlightTile = ({ nativeEvent }: any): void => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const currentCoords = screenToCanvasCoordinates(nativeEvent, canvas);
      const currentTile = calcCurrentTile(currentCoords.x, currentCoords.y);
      edit.updateCurrentSelection([currentTile.x + width * currentTile.y]);
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
    <canvas
      className="tilemap-canvas"
      ref={canvasRef}
      onMouseMove={highlightTile}
    >
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
