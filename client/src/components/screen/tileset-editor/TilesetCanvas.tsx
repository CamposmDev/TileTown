import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import "./default.css";

const TilesetCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const gridContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [restrictToGrid, setRestrictToGrd] = useState<boolean>(true);
  const [currentTile, setCurrentTile] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const imageHeight: number = 800;
  const imageWidth: number = 800;
  const tileHeight: number = 100;
  const tileWidth: number = 100;
  const canvasHeight: number = 400;
  const canvasWidth: number = 400;

  useEffect(() => {
    if (gridCanvasRef.current) {
      const canvas: HTMLCanvasElement = gridCanvasRef.current;
      canvas.height = canvasHeight;
      canvas.width = canvasWidth;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (ctx) {
        const rectHeight = canvas.height;
        const rectWidth = canvas.width;
        const scaleY = rectHeight / imageHeight;
        const scaleX = rectWidth / imageWidth;
        const scaledTileHeight = tileHeight * scaleY;
        const scaledTileWidth = tileWidth * scaleX;
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
      }
    }
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      canvas.height = canvasHeight;
      canvas.width = canvasWidth;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (ctx) {
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
      let updateTile = calcCurrentTile(canvasCoords.x, canvasCoords.y);
      setCurrentTile((currentTile) => ({
        ...currentTile,
        x: updateTile.x,
        y: updateTile.y,
      }));
    }
  };

  const finishDrawing = () => {
    if (contextRef.current) {
      const context: CanvasRenderingContext2D = contextRef.current;
      context.closePath();
    }
    setIsDrawing(false);
    setCurrentTile({ x: null, y: null });
  };

  const draw = ({ nativeEvent }: any) => {
    if (isDrawing) {
      if (contextRef.current && canvasRef.current) {
        const canvas: HTMLCanvasElement = canvasRef.current;
        const canvasCoords: { x: number; y: number } =
          screenToCanvasCoordinates(nativeEvent, canvas);
        if (withinCurrentTile(canvasCoords.x, canvasCoords.y)) {
          const context: CanvasRenderingContext2D = contextRef.current;
          context.lineTo(canvasCoords.x, canvasCoords.y);
          context.stroke();
        }
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

  /**
   *
   * @param x current x Position of mouse relative to Canvas
   * @param y current y Position of mouse relative to Canvas
   * @returns top left point of current tile being edited
   */
  const calcCurrentTile = (
    x: number,
    y: number
  ): { x: number | null; y: number | null } => {
    if (restrictToGrid) {
      const scaleY = canvasHeight / imageHeight;
      const scaleX = canvasWidth / imageWidth;
      const scaledTileHeight = tileHeight * scaleY;
      const scaledTileWidth = tileWidth * scaleX;
      return {
        x: Math.floor(x / scaledTileWidth) * scaledTileWidth,
        y: Math.floor(y / scaledTileHeight) * scaledTileHeight,
      };
    }
    return { x: null, y: null };
  };

  /**
   *
   * @param x current x Position of mouse relative to Canvas
   * @param y current y Position of mouse relative to Canvas
   * @returns returns false if mouse is outside of current tile
   *          true if it is or if there is no current tile
   */
  const withinCurrentTile = (x: number, y: number): boolean => {
    if (currentTile.x !== null && currentTile.y !== null) {
      const scaleY = canvasHeight / imageHeight;
      const scaleX = canvasWidth / imageWidth;
      const scaledTileHeight = tileHeight * scaleY;
      const scaledTileWidth = tileWidth * scaleX;
      const endX = currentTile.x + scaledTileWidth;
      const endY = currentTile.y + scaledTileHeight;
      return x < endX && y < endY && x > currentTile.x && y > currentTile.y;
    }
    return true;
  };

  let root = (
    <div>
      <canvas className="tileset-canvas" ref={gridCanvasRef}>
        Your browser sucks!
      </canvas>
      <canvas
        className="tileset-canvas"
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      >
        Your browser sucks!
      </canvas>
    </div>
  );

  return (
    <Grid item textAlign="center" p={1}>
      {root}
    </Grid>
  );
};

export default TilesetCanvas;
