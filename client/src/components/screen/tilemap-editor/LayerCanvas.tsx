import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import "./default.css";

// interface LayerProps {
//   data: number[];
//   layerIndex: number;
//   currentTileGID: number;
//   globalTileIDS: number[];
//   tilesetURLs: string[];
//   tileHeight: number;
//   tileWidth: number;
//   tilesetHeigh: number[];
//   tilesetWidth: number[];
//   tilemapHeight: number;
//   tilemapWidth: number;
//   opacity: number;
// }

const LayerCanvas = (props: { layerIndex: number }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas) {
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (ctx) {
        contextRef.current = ctx;

        // ctx.scale(10,10)
        ctx.beginPath(); // Note the Non Null Assertio
        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, 16, 8);
        // ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fillRect(16, 0, 16, 8);
        // ctx.stroke();
        ctx.closePath();
        ctx.lineCap = "square";
        ctx.lineWidth = 1;
        ctx.strokeStyle = "blue";
      }
    }
  }, []);

  const startDrawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    console.log(offsetX);
    console.log(offsetY);
    if (contextRef) {
      const context: any = contextRef.current;
      if (context) {
        context.beginPath();
        context.moveTo(offsetX, offsetY);
        setIsDrawing(true);
      }
    }
  };

  const finishDrawing = () => {
    if (contextRef) {
      const context: any = contextRef.current;
      context.closePath();
    }
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: any) => {
    if (isDrawing) {
      const { offsetX, offsetY } = nativeEvent;
      if (contextRef.current) {
        const context: any = contextRef.current;
        context.lineTo(offsetX, offsetY);
        context.stroke();
      }
    }
  };

  let root = (
    <canvas className="tilemap-canvas" ref={canvasRef}>
      Please use a browser that supports Canvas
    </canvas>
  );
  return (
    <Grid item textAlign="center" p={1}>
      {root}
    </Grid>
  );
};

export default LayerCanvas;
