import { Box, Grid } from "@mui/material";
import { useEffect, useRef, useState, useContext } from "react";
import { TilemapEditContext } from "../../../context/tilemapEditor";
import "./default.css";

const CurrentLayerCanvas = () => {
  //Tilemap edit store context
  const edit = useContext(TilemapEditContext);

  const [render, setRender] = useState(true);

  //canvas refs
  const gridCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const tileHeight = edit.state.Tilemap.tileHeight;
  const tileWidth = edit.state.Tilemap.tileWidth;
  const height = edit.state.Tilemap.height;
  const width = edit.state.Tilemap.width;
  const currentSelection = edit.state.currentSelection;
  const currentGlobalTileIDs = edit.state.Tilemap.globalTileIDs;
  const currentLayerIndex = edit.state.currentLayerIndex;
  const currentLayer = edit.state.Tilemap.layers[currentLayerIndex];
  let tilesetImages: HTMLImageElement[] = new Array(edit.state.Tilesets.length);
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

        const image: HTMLImageElement = tilesetImages[currentTilesetIndex];

        ctx.drawImage(
          image,
          ((currentTileIndex - currentGlobalTileID) % tilesetWidth) *
            tilesetTileWidth,
          Math.floor((currentTileIndex - currentGlobalTileID) / tilesetWidth) *
            tilesetTileHeight,
          tilesetTileWidth,
          tilesetTileHeight,
          i,
          y,
          scaledTileWidth,
          scaledTileHeight
        );
      }
    }
  };

  useEffect(() => {
    console.log("rerender current layer canvas");
    if (gridCanvasRef.current) {
      const canvas: HTMLCanvasElement = gridCanvasRef.current;
      canvas.height = canvasHeight;
      canvas.width = canvasWidth;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d", {
        willReadFrequently: true,
      });
      if (ctx) {
        gridContextRef.current = ctx;
        canvas.height = canvasHeight;
        canvas.width = canvasWidth;
        const scaleY = canvasHeight / imageHeight;
        const scaleX = canvasWidth / imageWidth;
        const scaledTileHeight = tileHeight * scaleY;
        const scaledTileWidth = tileWidth * scaleX;
        let imagesLoaded = 0;
        for (let i = 0; i < tilesetImages.length; i++) {
          tilesetImages[i] = new Image();
          tilesetImages[i].src = edit.state.Tilesets[i].image;
          tilesetImages[i].onload = function () {
            imagesLoaded++;
            if (imagesLoaded === tilesetImages.length) {
              drawLayer(
                ctx,
                currentLayerIndex,
                scaledTileWidth,
                scaledTileHeight
              );
            }
          };
        }
      }
    }
  }, [currentLayer]);

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
