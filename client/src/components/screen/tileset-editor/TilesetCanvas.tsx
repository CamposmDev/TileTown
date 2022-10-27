import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import "./default.css";

const TilesetCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(0.8);
  const imageHeight: number = 400;
  const imageWidth: number = 400;
  const tileHeight: number = 100;
  const tileWidth: number = 100;
  const canvasHeight: number = 300;
  const canvasWidth: number = 300;

  useEffect(() => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      canvas.height = canvasHeight * (1 / zoom);
      canvas.width = canvasWidth * (1 / zoom);
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (ctx) {
        const rectHeight = canvas.height;
        const rectWidth = canvas.width;
        const scaleY = rectHeight / imageHeight;
        const scaleX = rectWidth / imageWidth;
        const scaledTileHeight = tileHeight * scaleY * zoom;
        const scaledTileWidth = tileWidth * scaleX * zoom;
        contextRef.current = ctx;

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

        // ctx.scale(10,10)
        ctx.beginPath(); // Note the Non Null Assertion
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
        // ctx.scale(zoom, zoom);
      }
    }
  }, []);

  const startDrawing = ({ nativeEvent }: any) => {
    if (contextRef.current && canvasRef.current) {
      const context: CanvasRenderingContext2D = contextRef.current;
      const canvas: HTMLCanvasElement | null = canvasRef.current;
      const canvasCoords: { x: number; y: number } = screenToCanvasCoordinates(
        nativeEvent,
        canvas
      );
      context.beginPath();
      context.moveTo(canvasCoords.x, canvasCoords.y);
      context.lineTo(canvasCoords.x, canvasCoords.y);
      setIsDrawing(true);
    }
  };

  const finishDrawing = () => {
    if (contextRef.current) {
      const context: CanvasRenderingContext2D = contextRef.current;
      context.closePath();
    }
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: any) => {
    if (isDrawing) {
      if (contextRef.current && canvasRef.current) {
        const canvas: HTMLCanvasElement = canvasRef.current;
        const canvasCoords: { x: number; y: number } =
          screenToCanvasCoordinates(nativeEvent, canvas);
        const context: CanvasRenderingContext2D = contextRef.current;
        context.lineTo(canvasCoords.x, canvasCoords.y);
        context.stroke();
      }
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

  let root = (
    <canvas
      id="tileset-canvas"
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    >
      You're browser sucks!
    </canvas>
  );
  return (
    <Grid item textAlign="center" p={1}>
      {root}
    </Grid>
  );
};

export default TilesetCanvas;
