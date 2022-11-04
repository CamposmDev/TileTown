import { Grid } from "@mui/material";
import { useEffect, useRef, useState, useContext } from "react";
import { TilesetEditContext } from "../../../context/tilesetEditor";
import {
  TilesetEditControl,
  Color,
  ColorToDec,
  HexToDec,
} from "src/context/tilesetEditor/TilesetEditTypes";
import "./default.css";

const TilesetCanvas = () => {
  /**color data of all the pixels of an image
   * https://stackoverflow.com/questions/2106995/how-can-i-perform-flood-fill-with-html-canvas/56221940#56221940
   */
  type PixelData = {
    /**width of the image */
    width: number;
    /**height of the image */
    height: number;
    /**Array of all the pixel data of the image*/
    data: Uint32Array;
  };

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
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d", {
        willReadFrequently: true,
      });
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
    if (contextRef.current && canvasRef.current) {
      const context: CanvasRenderingContext2D = contextRef.current;
      const canvas: HTMLCanvasElement | null = canvasRef.current;
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
          floodFill(context, canvas, { nativeEvent }, ColorToDec(penColor));
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

  /**Get color of pixel
   * https://stackoverflow.com/questions/2106995/how-can-i-perform-flood-fill-with-html-canvas/56221940#56221940
   */
  const getPixel = (pixelData: PixelData, x: number, y: number): number => {
    if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) {
      return -1; // impossible color
    } else {
      // console.log(pixelData.data[y * pixelData.width + x].toString(16));
      return pixelData.data[y * pixelData.width + x];
    }
  };

  /**flood fill method, fills adjacent tiles of the same color with the current pen color
   * https://stackoverflow.com/questions/2106995/how-can-i-perform-flood-fill-with-html-canvas/56221940#56221940
   */
  const floodFill = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    { nativeEvent }: any,
    fillColor: number
  ): void => {
    const canvasCoords: { x: number; y: number } = screenToCanvasCoordinates(
      nativeEvent,
      canvas
    );
    const x = Math.floor(canvasCoords.x);
    const y = Math.floor(canvasCoords.y);
    // read the pixels in the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // make a Uint32Array view on the pixels so we can manipulate pixels
    // one 32bit value at a time instead of as 4 bytes per pixel
    const pixelData: PixelData = {
      width: imageData.width,
      height: imageData.height,
      data: new Uint32Array(imageData.data.buffer),
    };

    // get the color we're filling
    const targetColor = getPixel(pixelData, x, y);

    // check we are actually filling a different color
    if (targetColor !== fillColor) {
      const spansToCheck: {
        left: number;
        right: number;
        y: number;
        direction: number;
      }[] = [];

      function addSpan(
        left: number,
        right: number,
        y: number,
        direction: number
      ) {
        spansToCheck.push({ left, right, y, direction });
      }

      function checkSpan(
        left: number,
        right: number,
        y: number,
        direction: number
      ) {
        let inSpan = false;
        let start: number | undefined;
        let x;
        for (x = left; x < right; ++x) {
          const color = getPixel(pixelData, x, y);
          if (color === targetColor) {
            if (!inSpan) {
              inSpan = true;
              start = x;
            }
          } else {
            if (inSpan) {
              inSpan = false;
              if (start) addSpan(start, x - 1, y, direction);
            }
          }
        }
        if (inSpan) {
          inSpan = false;
          if (start) addSpan(start, x - 1, y, direction);
        }
      }

      addSpan(x, x, y, 0);

      while (spansToCheck.length > 0) {
        const span = spansToCheck.pop();

        let left: number | undefined;
        let right: number | undefined;
        let y: number | undefined;
        let direction: number | undefined;
        let l: number | undefined;
        if (span) {
          left = span.left;
          right = span.right;
          y = span.y;
          direction = span.direction;
        }
        // do left until we hit something, while we do this check above and below and add
        if (
          left !== undefined &&
          y !== undefined &&
          direction !== undefined &&
          right !== undefined
        ) {
          l = left;
          for (;;) {
            --l;
            const color = getPixel(pixelData, l, y);
            if (color !== targetColor) {
              break;
            }
          }
          ++l;

          let r = right;
          for (;;) {
            ++r;
            const color = getPixel(pixelData, r, y);
            if (color !== targetColor) {
              break;
            }
          }

          const lineOffset = y * pixelData.width;
          pixelData.data.fill(fillColor, lineOffset + l, lineOffset + r);

          if (direction <= 0) {
            checkSpan(l, r, y - 1, -1);
          } else {
            checkSpan(l, left, y - 1, -1);
            checkSpan(right, r, y - 1, -1);
          }

          if (direction >= 0) {
            checkSpan(l, r, y + 1, +1);
          } else {
            checkSpan(l, left, y + 1, +1);
            checkSpan(right, r, y + 1, +1);
          }
        }
      }
      // put the data back
      ctx.putImageData(imageData, 0, 0);
    }
    console.log(currentTile);
    setCurrentTile({ x: null, y: null });
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
