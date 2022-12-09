import { Grid, snackbarClasses } from "@mui/material";
import { useEffect, useRef, useState, useContext } from "react";
import { TilemapEditContext } from "../../../context/tilemapEditor";
import { TilemapApi } from "src/api";
import "./default.css";
import { SnackContext } from "src/context/snack";
import axios from "axios";

const TilemapCanvas = () => {
  //tilemap edit store context
  const edit = useContext(TilemapEditContext);
  const snack = useContext(SnackContext);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  let currentTileCount = 0;
  const render = edit.state.renderTilemapCanvas;

  const tileHeight: number = edit.state.Tilemap.tileHeight;
  const tileWidth: number = edit.state.Tilemap.tileWidth;
  const height: number = edit.state.Tilemap.height;
  const width: number = edit.state.Tilemap.width;
  const imageHeight: number = tileHeight * height;
  const imageWidth: number = tileWidth * width;

  const currentGlobalTileIDs = edit.state.Tilemap.globalTileIDs;
  const totalTileCount = height * width * edit.state.Tilemap.layers.length;
  console.log(totalTileCount);

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
    canvas: HTMLCanvasElement,
    layerIndex: number,
    scaledTileWidth: number,
    scaledTileHeight: number
  ): void => {
    let currentDataIndex = 0;
    for (let i = 0; i < height; i++) {
      drawRow(
        ctx,
        canvas,
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
    canvas: HTMLCanvasElement,
    layerIndex: number,
    dataIndex: number,
    scaledTileWidth: number,
    scaledTileHeight: number,
    y: number
  ): void => {
    for (let i = 0; i <= canvasWidth; i += scaledTileWidth) {
      const currentTileIndex =
        edit.state.Tilemap.layers[layerIndex].data[
          Math.round(i / scaledTileWidth + dataIndex)
        ];

      if (currentTileIndex > 0) {
        let currentGlobalTileID: number = 0;
        let currentTilesetIndex: number = 0;
        for (let j = currentGlobalTileIDs.length - 1; j >= 0; j--) {
          if (currentGlobalTileIDs[j] <= currentTileIndex) {
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
        image.crossOrigin = "Anonymous";

        image.onload = () => {
          console.log("onload");
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
          currentTileCount++;

          if (currentTileCount === totalTileCount) {
            console.log("tilemap fully rendered");
            console.log(edit.state.Tilemap);
            if (!edit.state.isSaved)
              canvas.toBlob((blob) => {
                console.log("toBlob");
                if (blob) {
                  console.log("hello?");
                  edit.saveTilemap(blob, snack);
                }
              });
          }
        };
      } else {
        currentTileCount++;
        if (currentTileCount === totalTileCount) {
          console.log("tilemap fully rendered");
          if (!edit.state.isSaved)
            canvas.toBlob((blob) => {
              if (blob) {
                console.log("hello?");
                edit.saveTilemap(blob, snack);
              }
            });
        }
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
    canvas: HTMLCanvasElement,
    scaledTileWidth: number,
    scaledTileHeight: number
  ) => {
    console.log("drawCanvas");
    for (let i = edit.state.Tilemap.layers.length - 1; i >= 0; i--) {
      if (edit.state.Tilemap.layers[i].visible)
        drawLayer(ctx, canvas, i, scaledTileWidth, scaledTileHeight);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d", {
        willReadFrequently: true,
      });

      if (ctx) {
        console.log("render tilemap");
        currentTileCount = 0;
        canvas.height = canvasHeight;
        canvas.width = canvasWidth;
        const scaleY = canvasHeight / imageHeight;
        const scaleX = canvasWidth / imageWidth;
        const scaledTileHeight = tileHeight * scaleY;
        const scaledTileWidth = tileWidth * scaleX;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!render) return;
        drawCanvas(ctx, canvas, scaledTileWidth, scaledTileHeight);
      }
    }
  }, [render]);

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

export default TilemapCanvas;
