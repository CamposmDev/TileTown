import { Box, Grid } from "@mui/material";
import { useEffect, useRef, useState, useContext } from "react";
import { TilemapEditContext } from "../../../context/tilemapEditor";
import "./default.css";
const CurrentSelectionCanvas = () => {
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
  const highlightTile = (
    ctx: CanvasRenderingContext2D,
    scaledTileHeight: number,
    scaledTileWidth: number,
    tileIndex: number
  ) => {
    //works with shapes but not with images
    ctx.fillStyle = "rgba(25, 255, 255, 0.3)";
    ctx.fillRect(
      (tileIndex % width) * scaledTileWidth,
      Math.floor(tileIndex / width) * scaledTileHeight,
      scaledTileWidth,
      scaledTileHeight
    );
  };
  const highlightSelectedTiles = (
    ctx: CanvasRenderingContext2D,
    scaledTileHeight: number,
    scaledTileWidth: number
  ) => {
    for (let i = 0; i < currentSelection.length; i++) {
      highlightTile(
        ctx,
        scaledTileHeight,
        scaledTileWidth,
        currentSelection[i]
      );
    }
  };
  useEffect(() => {
    console.log("rerender current selection canvas");
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
        highlightSelectedTiles(ctx, scaledTileHeight, scaledTileWidth);
      }
    }
  }, [currentSelection]);
  let root = (
    <div>
      <canvas className="tilemap-canvas--no-input" ref={gridCanvasRef}>
        Please user a browser that supports HTML Canvas
      </canvas>
    </div>
  );

  return <Box>{root};</Box>;
};

export default CurrentSelectionCanvas;
