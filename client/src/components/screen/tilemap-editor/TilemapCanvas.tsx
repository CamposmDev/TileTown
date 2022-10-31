import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import "./default.css";
import Layer from "./Layer";
import Property from "./Property";
import { Color } from "./Color";
import { Type } from "./Type";
import LayerCanvas from "./LayerCanvas";

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
  let testLayer1: Partial<Layer> = {
    data: [
      1, 1, 1, 1, 0, 1, 1, 1, 2, 1, 2, 3, 4, 5, 1, 2, 3, 10, 10, 10, 1, 2, 3, 4,
      1, 2, 3, 4, 1, 10, 1, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2,
      3, 3, 3, 3, 0, 1, 0, 0, 3, 1, 3, 4, 5, 6, 7, 5,
    ],
  };
  let testLayer2: Partial<Layer> = {
    data: [
      4, 4, 14, 14, 14, 14, 3, 3, 3, 12, 12, 13, 14, 15, 11, 12, 13, 0, 0, 0, 0,
      0, 0, 0, 1, 2, 0, 4, 1, 0, 1, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 0,
      0, 0, 3, 3, 10, 0, 0, 0, 0, 0, 3, 1, 3, 4, 8, 8, 8, 8,
    ],
  };
  let testLayer3: Partial<Layer> = {
    data: [
      0, 0, 4, 0, 14, 14, 0, 0, 0, 1, 2, 0, 1, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 2, 0, 4, 1, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
  };
  const testLayers: Partial<Layer>[] = [testLayer1, testLayer2, testLayer3];

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
      {testLayers.map((layers, index) => (
        <LayerCanvas layerIndex={index}></LayerCanvas>
      ))}
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
