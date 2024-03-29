import { Box, Grid } from "@mui/material";
import { useEffect, useRef, useState, useContext } from "react";
import { AuthContext } from "src/context/auth";
import { SnackContext } from "src/context/snack";
import { TilemapEditControl } from "src/context/tilemapEditor/TilemapEditTypes";
import { TilemapEditContext } from "../../../context/tilemapEditor";
import "./default.css";

const CurrentLayerCanvas = () => {
  //Tilemap edit store context
  const auth = useContext(AuthContext);
  const edit = useContext(TilemapEditContext);
  const snack = useContext(SnackContext);

  const user = auth ? auth.usr : undefined;
  const id = user ? user.id : undefined;

  const [mouseDown, setMouseDown] = useState(false);
  const [startingTile, setStartingTile] = useState<{
    x: number;
    y: number;
  } | null>(null);

  //canvas refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const tileHeight = edit.state.Tilemap.tileHeight;
  const tileWidth = edit.state.Tilemap.tileWidth;
  const height = edit.state.Tilemap.height;
  const width = edit.state.Tilemap.width;
  const currentSelection = edit.state.currentSelection;
  const render = edit.state.renderCurrentLayerCanvas;
  const currentGlobalTileIDs = edit.state.Tilemap.globalTileIDs;
  const currentLayerIndex = edit.state.currentLayerIndex;
  const currentTilemap = edit.state.Tilemap;
  const currentTileIndex = edit.state.currentTileIndex;
  const currentLayer = currentTilemap.layers[currentLayerIndex]
    ? currentTilemap.layers[currentLayerIndex].data
    : [];
  let tilesetImages: HTMLImageElement[] = new Array(edit.state.Tilesets.length);
  const imageHeight: number = tileHeight * height;
  const imageWidth: number = tileWidth * width;
  const canvasHeight: number = 800;
  const canvasWidth: number = 800;
  const currentEditControl: TilemapEditControl = edit.state.currentEditControl;
  const visible: boolean =
    currentLayerIndex !== -1
      ? edit.state.Tilemap.layers[currentLayerIndex].visible
      : false;
  const opacity: number =
    currentLayerIndex !== -1
      ? currentTilemap.layers[currentLayerIndex].opacity
      : 1;

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
      if (Math.round(i / scaledTileWidth + dataIndex) === 0)
        console.log(currentTileIndex);

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

        const image: HTMLImageElement = tilesetImages[currentTilesetIndex];
        const imageWidth = image.width;
        const imageHeight = image.height;
        const imageTileWidth =
          imageWidth * (tilesetTileWidth / (tilesetTileWidth * tilesetWidth));
        const imageTileHeight =
          imageHeight *
          (tilesetTileHeight / (tilesetTileHeight * tilesetHeight));

        ctx.globalAlpha = opacity;

        if (Math.round(i / scaledTileWidth + dataIndex) === 0) {
          console.log(currentGlobalTileID);
          console.log(currentTileIndex - currentGlobalTileID);
          console.log((currentTileIndex - currentGlobalTileID) % tilesetWidth);
          console.log({
            x:
              ((currentTileIndex - currentGlobalTileID) % tilesetWidth) *
              imageTileWidth,
            y:
              Math.floor(
                (currentTileIndex - currentGlobalTileID) / tilesetWidth
              ) * imageTileHeight,
          });
        }

        ctx.drawImage(
          image,
          ((currentTileIndex - currentGlobalTileID) % tilesetWidth) *
            imageTileWidth,
          Math.floor((currentTileIndex - currentGlobalTileID) / tilesetWidth) *
            imageTileHeight,
          imageTileWidth,
          imageTileHeight,
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
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      canvas.height = canvasHeight;
      canvas.width = canvasWidth;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d", {
        willReadFrequently: true,
      });
      if (ctx) {
        contextRef.current = ctx;
        canvas.height = canvasHeight;
        canvas.width = canvasWidth;
        const scaleY = canvasHeight / imageHeight;
        const scaleX = canvasWidth / imageWidth;
        const scaledTileHeight = tileHeight * scaleY;
        const scaledTileWidth = tileWidth * scaleX;
        let imagesLoaded = 0;
        if (!visible) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          return;
        }
        const host: string =
          window.location.host === "localhost:3001"
            ? "localhost:3000"
            : window.location.host;

        for (let i = 0; i < tilesetImages.length; i++) {
          tilesetImages[i] = new Image();
          tilesetImages[i].src =
            "http://" + host + "/api/media/" + edit.state.Tilesets[i].image;
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
    edit.renderCurrentLayerRender(false);
  }, [render, currentLayerIndex, visible, opacity]);

  const onMouseDown = ({ nativeEvent }: any): void => {
    if (!visible || !edit.canEdit(id)) {
      return;
    }
    switch (currentEditControl) {
      case TilemapEditControl.draw: {
        edit.updateCurrentLayerData(currentTileIndex);
        break;
      }
      case TilemapEditControl.erase: {
        edit.updateCurrentLayerData(0);
        break;
      }
      case TilemapEditControl.shapeFill: {
        startSpaceFill({ nativeEvent });
        break;
      }
      case TilemapEditControl.fillSelect: {
        startSpaceFill({ nativeEvent });
        break;
      }
      case TilemapEditControl.bucketFill: {
        bucketFill({ nativeEvent });
        break;
      }
      case TilemapEditControl.magicWand: {
        magicWand({ nativeEvent });
        break;
      }
      case TilemapEditControl.sameTileSelect: {
        selectSameTiles({ nativeEvent });
        break;
      }
      default:
        break;
    }
  };
  const onMouseMove = ({ nativeEvent }: any): void => {
    if (!edit.canEdit(id)) {
      snack.showWarningMessage(
        "Another Collaborator Is Currently Editing The Tilemap"
      );
      return;
    }
    if (!visible) {
      if (currentLayerIndex === -1) {
        snack.showWarningMessage("Please Create And/Or Select A Layer To Edit");
        return;
      }
      snack.showWarningMessage("Please Make Current Layer Visible To Edit");
      return;
    }

    switch (currentEditControl) {
      case TilemapEditControl.draw: {
        highlightTile({ nativeEvent });
        break;
      }
      case TilemapEditControl.erase: {
        highlightTile({ nativeEvent });
        break;
      }
      case TilemapEditControl.shapeFill: {
        drawSpaceFill({ nativeEvent });
        break;
      }
      case TilemapEditControl.bucketFill: {
        break;
      }
      case TilemapEditControl.fillSelect: {
        drawSpaceFill({ nativeEvent });
        break;
      }
      case TilemapEditControl.magicWand: {
        break;
      }
      case TilemapEditControl.sameTileSelect: {
        break;
      }
      default:
        break;
    }
  };
  const onMouseUp = ({ nativeEvent }: any): void => {
    if (!visible || !edit.canEdit(id)) {
      return;
    }
    switch (currentEditControl) {
      case TilemapEditControl.draw: {
        break;
      }
      case TilemapEditControl.erase: {
        break;
      }
      case TilemapEditControl.shapeFill: {
        endSpaceFill();
        break;
      }
      case TilemapEditControl.bucketFill: {
        break;
      }
      case TilemapEditControl.fillSelect: {
        setStartingTile(null);
        break;
      }
      case TilemapEditControl.magicWand: {
        break;
      }
      case TilemapEditControl.sameTileSelect: {
        break;
      }
      default:
        break;
    }
  };

  const onMouseOut = ({ nativeEvent }: any): void => {
    if (!visible || !edit.canEdit(id)) {
      return;
    }
    switch (currentEditControl) {
      case TilemapEditControl.draw: {
        edit.updateCurrentSelection([]);
        break;
      }
      case TilemapEditControl.erase: {
        edit.updateCurrentSelection([]);
        break;
      }
      case TilemapEditControl.shapeFill: {
        setStartingTile(null);
        edit.updateCurrentSelection([]);
        break;
      }
      case TilemapEditControl.bucketFill: {
        break;
      }
      case TilemapEditControl.fillSelect: {
        setStartingTile(null);
        break;
      }
      case TilemapEditControl.magicWand: {
        break;
      }
      case TilemapEditControl.sameTileSelect: {
        break;
      }
      default:
        break;
    }
  };

  const highlightTile = ({ nativeEvent }: any): void => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const currentCoords = screenToCanvasCoordinates(nativeEvent, canvas);
      const currentTile = calcCurrentTile(currentCoords.x, currentCoords.y);
      edit.updateCurrentSelection([currentTile.x + width * currentTile.y]);
    }
  };

  const endSpaceFill = (): void => {
    edit.updateCurrentLayerData(currentTileIndex);
    edit.updateCurrentSelection([]);
    edit.renderCurrentLayerRender(true);
    setStartingTile(null);
  };

  const startSpaceFill = ({ nativeEvent }: any): void => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const currentCoords = screenToCanvasCoordinates(nativeEvent, canvas);
      const currentTile = calcCurrentTile(currentCoords.x, currentCoords.y);
      edit.updateCurrentSelection([currentTile.x + width * currentTile.y]);
      setStartingTile(currentTile);
    }
  };

  const drawSpaceFill = ({ nativeEvent }: any): void => {
    const addRowSpaceFill = (x: number, y: number): number[] => {
      let selection: number[] = new Array();
      if (startingTile) {
        if (startingTile.x > x)
          for (let i = x; i <= startingTile.x; i++)
            selection.push(i + width * y);
        else
          for (let i = startingTile.x; i <= x; i++)
            selection.push(i + width * y);
      }
      return selection;
    };
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const currentCoords = screenToCanvasCoordinates(nativeEvent, canvas);
      const currentTile = calcCurrentTile(currentCoords.x, currentCoords.y);

      let selection: number[] = [];
      if (startingTile) {
        if (startingTile.y > currentTile.y)
          for (let i = currentTile.y; i <= startingTile.y; i++)
            selection = selection.concat(addRowSpaceFill(currentTile.x, i));
        else
          for (let i = startingTile.y; i <= currentTile.y; i++)
            selection = selection.concat(addRowSpaceFill(currentTile.x, i));
        edit.updateCurrentSelection(selection);
      }
    }
  };

  const selectSameTiles = ({ nativeEvent }: any): void => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const currentCoords = screenToCanvasCoordinates(nativeEvent, canvas);
      const currentTile = calcCurrentTile(currentCoords.x, currentCoords.y);
      const currentTileData =
        currentLayer[currentTile.x + width * currentTile.y];
      const selection: number[] = [];
      for (let i = 0; i < currentLayer.length; i++) {
        if (currentLayer[i] === currentTileData) selection.push(i);
      }
      edit.updateCurrentSelection(selection);
    }
  };

  const bucketFill = ({ nativeEvent }: any): void => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const currentCoords = screenToCanvasCoordinates(nativeEvent, canvas);
      const currentTile = calcCurrentTile(currentCoords.x, currentCoords.y);
      const startingIndex = currentTile.x + width * currentTile.y;
      if (!currentSelection.includes(startingIndex)) return;
      const currentTileData = currentLayer[startingIndex];
      let selection = new Map<number, number>();
      let startingPoints: number[] = [];
      startingPoints.push(startingIndex);
      let currentIndex = startingIndex;

      const scanLeft = (
        currentIndex: number,
        currentTileData: number
      ): void => {
        if (currentLayer[currentIndex] !== currentTileData) return;
        while (
          currentIndex % width >= 0 &&
          !selection.has(currentIndex) &&
          currentLayer[currentIndex] === currentTileData &&
          currentSelection.includes(currentIndex)
        ) {
          const aboveIndex = currentIndex - width;
          if (
            aboveIndex >= 0 &&
            !selection.has(aboveIndex) &&
            currentLayer[aboveIndex] === currentTileData &&
            currentSelection.includes(aboveIndex)
          ) {
            startingPoints.push(aboveIndex);
          }
          const belowIndex = currentIndex + width;
          if (
            belowIndex < currentLayer.length &&
            !selection.has(belowIndex) &&
            currentLayer[belowIndex] === currentTileData &&
            currentSelection.includes(belowIndex)
          ) {
            startingPoints.push(belowIndex);
          }
          selection.set(currentIndex, currentIndex);
          currentIndex--;
        }
      };

      const scanRight = (
        currentIndex: number,
        currentTileData: number
      ): void => {
        if (currentLayer[currentIndex] !== currentTileData) return;
        while (
          currentIndex % width < width &&
          !selection.has(currentIndex) &&
          currentLayer[currentIndex] === currentTileData &&
          currentSelection.includes(currentIndex)
        ) {
          const aboveIndex = currentIndex - width;
          if (
            aboveIndex >= 0 &&
            !selection.has(aboveIndex) &&
            currentLayer[aboveIndex] === currentTileData &&
            currentSelection.includes(aboveIndex)
          ) {
            startingPoints.push(aboveIndex);
          }
          const belowIndex = currentIndex + width;
          if (
            belowIndex < currentLayer.length &&
            !selection.has(belowIndex) &&
            currentLayer[belowIndex] === currentTileData &&
            currentSelection.includes(belowIndex)
          ) {
            startingPoints.push(belowIndex);
          }
          selection.set(currentIndex, currentIndex);
          currentIndex++;
        }
      };

      // edit.updateCurrentSelection([]);

      for (let i = 0; i < startingPoints.length; i++) {
        scanLeft(startingPoints[i], currentTileData);
        scanRight(startingPoints[i] + 1, currentTileData);
      }
      // edit.updateCurrentSelection([...selection.values()]);
      edit.updateCurrentLayerData(currentTileIndex, [...selection.values()]);
    }
  };

  const magicWand = ({ nativeEvent }: any): void => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const currentCoords = screenToCanvasCoordinates(nativeEvent, canvas);
      const currentTile = calcCurrentTile(currentCoords.x, currentCoords.y);
      const startingIndex = currentTile.x + width * currentTile.y;
      const currentTileData = currentLayer[startingIndex];
      let selection = new Map<number, number>();
      let startingPoints: number[] = [];
      startingPoints.push(startingIndex);
      let currentIndex = startingIndex;

      const scanLeft = (
        currentIndex: number,
        currentTileData: number
      ): void => {
        while (
          currentIndex % width >= 0 &&
          !selection.has(currentIndex) &&
          currentLayer[currentIndex] === currentTileData
        ) {
          const aboveIndex = currentIndex - width;
          if (
            aboveIndex >= 0 &&
            !selection.has(aboveIndex) &&
            currentLayer[aboveIndex] === currentTileData
          ) {
            startingPoints.push(aboveIndex);
          }
          const belowIndex = currentIndex + width;
          if (
            belowIndex < currentLayer.length &&
            !selection.has(belowIndex) &&
            currentLayer[belowIndex] === currentTileData
          ) {
            startingPoints.push(belowIndex);
          }
          selection.set(currentIndex, currentIndex);
          currentIndex--;
        }
      };

      const scanRight = (
        currentIndex: number,
        currentTileData: number
      ): void => {
        while (
          currentIndex % width < width &&
          !selection.has(currentIndex) &&
          currentLayer[currentIndex] === currentTileData
        ) {
          const aboveIndex = currentIndex - width;
          if (
            aboveIndex >= 0 &&
            !selection.has(aboveIndex) &&
            currentLayer[aboveIndex] === currentTileData
          ) {
            startingPoints.push(aboveIndex);
          }
          const belowIndex = currentIndex + width;
          if (
            belowIndex < currentLayer.length &&
            !selection.has(belowIndex) &&
            currentLayer[belowIndex] === currentTileData
          ) {
            startingPoints.push(belowIndex);
          }
          selection.set(currentIndex, currentIndex);
          currentIndex++;
        }
      };
      edit.updateCurrentSelection([]);

      for (let i = 0; i < startingPoints.length; i++) {
        scanLeft(startingPoints[i], currentTileData);
        scanRight(startingPoints[i] + 1, currentTileData);
      }

      edit.updateCurrentSelection([...selection.values()]);
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
   * @returns the 0 indexed column and row of the current tile
   */
  const calcCurrentTile = (x: number, y: number): { x: number; y: number } => {
    const scaleY = canvasHeight / imageHeight;
    const scaleX = canvasWidth / imageWidth;
    const scaledTileHeight = tileHeight * scaleY;
    const scaledTileWidth = tileWidth * scaleX;
    return {
      x: Math.floor(x / scaledTileWidth),
      y: Math.floor(y / scaledTileHeight),
    };
  };
  let root = (
    <div>
      <canvas
        className="tilemap-canvas"
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseOut={onMouseOut}
        ref={canvasRef}
      >
        Please use a browser that supports HTML Canvas
      </canvas>
    </div>
  );

  return <Box>{root};</Box>;
};

export default CurrentLayerCanvas;
