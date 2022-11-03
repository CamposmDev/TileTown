import { Grid } from "@mui/material";
import { useEffect, useRef, useState, useContext } from "react";
import { TilesetEditContext } from "../../../context/tilesetEditor";
import {
  TilesetEditControl,
  Color,
} from "src/context/tilesetEditor/TilesetEditTypes";
import "./default.css";

const TilesetCanvas = () => {
  //tileset edit store context
  const edit = useContext(TilesetEditContext);

  //canvas refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const gridContextRef = useRef<CanvasRenderingContext2D | null>(null);

  //canvas state variables
  // const [restrictToTile, setRestrictToTile] = useState<boolean>(true);
  const [currentTile, setCurrentTile] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const currentEditControl = edit.state.currentEditControl;
  const penColor = edit.state.penColor;
  const penSize = edit.state.penSize;
  const restrictToTile = edit.state.restrictToTile;
  const gridEnabled = edit.state.gridEnabled;
  const gridColor = edit.state.gridColor;
  const gridSize = edit.state.gridSize;

  const tileHeight: number = 32;
  const tileWidth: number = 32;
  const columns: number = 17;
  const rows: number = 6;
  const imageHeight: number = tileHeight * rows;
  const imageWidth: number = tileWidth * columns;
  const canvasHeight: number = 800;
  const canvasWidth: number = 800;

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
        gridContextRef.current = ctx;

        //draw vertical lines of grid
        if (gridEnabled) {
          for (
            let i = scaledTileHeight;
            i < rectHeight;
            i += scaledTileHeight
          ) {
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
      }
    }
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      canvas.height = canvasHeight;
      canvas.width = canvasWidth;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (ctx) {
        const rectHeight = canvas.height;
        const rectWidth = canvas.width;
        const scaleY = rectHeight / imageHeight;
        const scaleX = rectWidth / imageWidth;
        contextRef.current = ctx;
        let tilesetImage: HTMLImageElement = new Image();
        tilesetImage.src = "/leve1and2tileset.png";
        tilesetImage.onload = () => {
          ctx.drawImage(tilesetImage, 0, 0, canvas.width, canvas.height);
        };
      }
    }
  }, []);

  const onMouseDown = ({ nativeEvent }: any) => {
    if (contextRef.current) {
      const context: CanvasRenderingContext2D = contextRef.current;
      switch (currentEditControl) {
        case TilesetEditControl.draw: {
          context.globalCompositeOperation = "source-over";
          startDrawing({ nativeEvent });
          break;
        }
        case TilesetEditControl.erase: {
          context.globalCompositeOperation = "destination-out";
          startDrawing({ nativeEvent });
          break;
        }
        case TilesetEditControl.fill: {
          break;
        }
        default:
          break;
      }
    }
  };

  const onMouseMove = ({ nativeEvent }: any) => {
    switch (currentEditControl) {
      case TilesetEditControl.draw: {
        draw({ nativeEvent });
        break;
      }
      case TilesetEditControl.erase: {
        draw({ nativeEvent });
        break;
      }
      case TilesetEditControl.fill: {
        break;
      }
      default:
        break;
    }
  };

  const onMouseUp = ({ nativeEvent }: any) => {
    switch (currentEditControl) {
      case TilesetEditControl.draw: {
        finishDrawing();
        break;
      }
      case TilesetEditControl.erase: {
        finishDrawing();
        break;
      }
      case TilesetEditControl.fill: {
        break;
      }
      default:
        break;
    }
  };

  const startDrawing = ({ nativeEvent }: any) => {
    if (contextRef.current && canvasRef.current) {
      const context: CanvasRenderingContext2D = contextRef.current;
      const canvas: HTMLCanvasElement | null = canvasRef.current;
      const canvasCoords: { x: number; y: number } = screenToCanvasCoordinates(
        nativeEvent,
        canvas
      );
      context.beginPath();
      context.strokeStyle = penColor;
      context.lineWidth = penSize;
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
    if (contextRef.current && canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const context: CanvasRenderingContext2D = contextRef.current;
      const canvasCoords: { x: number; y: number } = screenToCanvasCoordinates(
        nativeEvent,
        canvas
      );
      if (isDrawing) {
        if (withinCurrentTile(canvasCoords.x, canvasCoords.y)) {
          context.lineTo(canvasCoords.x, canvasCoords.y);
          context.stroke();
          return;
        }
        setIsDrawing(false);
        context.closePath();
        return;
      }
      if (withinCurrentTile(canvasCoords.x, canvasCoords.y) && restrictToTile) {
        context.beginPath();
        context.moveTo(canvasCoords.x, canvasCoords.y);
        context.lineTo(canvasCoords.x, canvasCoords.y);
        context.stroke();
        setIsDrawing(true);
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
    if (restrictToTile) {
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
    if (!restrictToTile) return true;
    if (currentTile.x !== null && currentTile.y !== null) {
      const scaleY = canvasHeight / imageHeight;
      const scaleX = canvasWidth / imageWidth;
      const scaledTileHeight = tileHeight * scaleY;
      const scaledTileWidth = tileWidth * scaleX;
      const endX = currentTile.x + scaledTileWidth;
      const endY = currentTile.y + scaledTileHeight;
      return x < endX && y < endY && x > currentTile.x && y > currentTile.y;
    }
    return false;
  };

  let root = (
    <div>
      <canvas
        className="tileset-canvas"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        ref={canvasRef}
      ></canvas>
      <canvas className="tileset-canvas--no-input" ref={gridCanvasRef}>
        Please user a browser that supports HTML Canvas
      </canvas>
    </div>
  );

  return (
    <Grid id="tileset-canvas-wrapper" item textAlign="center" p={1}>
      {root}
    </Grid>
  );
};

export default TilesetCanvas;
