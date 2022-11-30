import { Grid } from "@mui/material";
import { useEffect, useRef, useState, useContext } from "react";
import { TilemapEditContext } from "../../../context/tilemapEditor";
import "./default.css";

const BottomLayerCanvas = () => {
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
  const currentLayerIndex: number = edit.state.currentLayerIndex;
  const visibilityChange: number = edit.state.Tilemap.layers.reduce<number>(
    (acc, layer): number => {
      return acc + Number(layer.visible);
    },
    0
  );
  const currentSwapIndex: number = edit.state.currentSwapIndex;

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
          Math.round(i / scaledTileWidth + dataIndex)
        ];
      if (currentTileIndex > 0) {
        let currentGlobalTileID: number = 0;
        let currentTilesetIndex: number = 0;
        for (let j = currentGlobalTileIDs.length - 1; j >= 0; j--) {
          if (currentGlobalTileIDs[j] < currentTileIndex) {
            currentGlobalTileID = currentGlobalTileIDs[j];
            currentTilesetIndex = j;
            break;
          }
        }
        const tilesetTileWidth =
          edit.state.Tilesets[currentTilesetIndex].tileWidth;
        const tilesetTileHeight =
          edit.state.Tilesets[currentTilesetIndex].tileHeight;
        const tilesetWidth = edit.state.Tilesets[currentTilesetIndex].columns;
        const tilesetHeight = edit.state.Tilesets[currentTilesetIndex].rows;

        const image: HTMLImageElement = new Image();
        const host: string =
          window.location.host === "localhost:3001"
            ? "localhost:3000"
            : window.location.host;
        image.src =
          "http://" +
          host +
          "/api/media/" +
          edit.state.Tilesets[currentTilesetIndex].image;

        image.onload = () => {
          const imageWidth = image.width;
          const imageHeight = image.height;
          const imageTileWidth =
            imageWidth * (tilesetTileWidth / (tilesetTileWidth * tilesetWidth));
          const imageTileHeight =
            imageHeight *
            (tilesetTileHeight / (tilesetTileHeight * tilesetHeight));
          ctx.globalAlpha = edit.state.Tilemap.layers[layerIndex].opacity;
          ctx.drawImage(
            image,
            ((currentTileIndex - currentGlobalTileID) % tilesetWidth) *
              imageTileWidth,
            Math.floor(
              (currentTileIndex - currentGlobalTileID) / tilesetWidth
            ) * imageTileHeight,
            imageTileWidth,
            imageTileHeight,
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
    for (
      let i = edit.state.Tilemap.layers.length - 1;
      i > currentLayerIndex;
      i--
    ) {
      if (i !== currentLayerIndex && edit.state.Tilemap.layers[i].visible)
        drawLayer(ctx, i, scaledTileWidth, scaledTileHeight);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d", {
        willReadFrequently: true,
      });
      if (ctx) {
        console.log("render bottom layer tilemap");
        canvas.height = canvasHeight;
        canvas.width = canvasWidth;
        const scaleY = canvasHeight / imageHeight;
        const scaleX = canvasWidth / imageWidth;
        const scaledTileHeight = tileHeight * scaleY;
        const scaledTileWidth = tileWidth * scaleX;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (currentLayerIndex !== -1)
          drawCanvas(ctx, scaledTileWidth, scaledTileHeight);
        // edit.preventTilemapRender();
      }
    }
  }, [currentLayerIndex, visibilityChange, currentSwapIndex]);

  let root = (
    <canvas className="tilemap-canvas--no-input" ref={canvasRef}>
      Please use a browser that supports canvas
    </canvas>
  );
  return (
    <Grid item textAlign="center" p={1}>
      {root}
    </Grid>
  );
};

export default BottomLayerCanvas;
