import { Box, Grid } from "@mui/material";
import { useEffect, useRef, useState, useContext } from "react";
import { TilemapEditControl } from "src/context/tilemapEditor/TilemapEditTypes";
import { TilemapEditContext } from "../../../context/tilemapEditor";
import "./default.css";

const CurrentLayerCanvas = () => {
  //Tilemap edit store context
  const edit = useContext(TilemapEditContext);

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
  const currentLayer = currentTilemap.layers[currentLayerIndex].data;
  let tilesetImages: HTMLImageElement[] = new Array(edit.state.Tilesets.length);
  const imageHeight: number = tileHeight * height;
  const imageWidth: number = tileWidth * width;
  const canvasHeight: number = 800;
  const canvasWidth: number = 800;
  const currentEditControl: TilemapEditControl = edit.state.currentEditControl;

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
    edit.renderCurrentLayerRender(false);
  }, [render]);

  const onMouseDown = ({ nativeEvent }: any): void => {
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
      case TilemapEditControl.magicWand: {
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

  // const updateCurrentTile = (): void => {
  //   if (canvasRef.current && contextRef.current) {
  //     const canvas: HTMLCanvasElement = canvasRef.current;
  //     const ctx: CanvasRenderingContext2D = contextRef.current;
  //     canvas.height = canvasHeight;
  //     canvas.width = canvasWidth;
  //     const scaleY = canvasHeight / imageHeight;
  //     const scaleX = canvasWidth / imageWidth;
  //     const scaledTileHeight = tileHeight * scaleY;
  //     const scaledTileWidth = tileWidth * scaleX;
  //     let currentGlobalTileID: number = 0;
  //     let currentTilesetIndex: number = 0;
  //     for (let i = currentGlobalTileIDs.length - 1; i >= 0; i--) {
  //       if (currentGlobalTileIDs[i] < currentTileIndex) {
  //         currentGlobalTileID = currentGlobalTileIDs[i];
  //         currentTilesetIndex = i;
  //       }
  //     }
  //     const tilesetTileWidth =
  //       edit.state.Tilesets[currentTilesetIndex].tileWidth;
  //     const tilesetTileHeight =
  //       edit.state.Tilesets[currentTilesetIndex].tileHeight;
  //     const tilesetWidth = edit.state.Tilesets[currentTilesetIndex].columns;

  //     const image: HTMLImageElement = tilesetImages[currentTilesetIndex];
  //     image.src = edit.state.Tilesets[currentTilesetIndex].image;
  //     image.onload = function () {
  //       ctx.drawImage(
  //         image,
  //         ((currentTileIndex - currentGlobalTileID) % tilesetWidth) *
  //           tilesetTileWidth,
  //         Math.floor((currentTileIndex - currentGlobalTileID) / tilesetWidth) *
  //           tilesetTileHeight,
  //         tilesetTileWidth,
  //         tilesetTileHeight,
  //         (currentTileIndex % width) * scaledTileWidth,
  //         Math.floor(currentTileIndex / width) * scaledTileHeight,
  //         scaledTileWidth,
  //         scaledTileHeight
  //       );
  //     };
  //   }
  //   edit.updateCurrentLayerData();
  // };

  // const updateSelectedTiles = (): void => {
  //   if (canvasRef.current && contextRef.current) {
  //     const canvas: HTMLCanvasElement = canvasRef.current;
  //     const ctx: CanvasRenderingContext2D = contextRef.current;
  //     canvas.height = canvasHeight;
  //     canvas.width = canvasWidth;
  //     const scaleY = canvasHeight / imageHeight;
  //     const scaleX = canvasWidth / imageWidth;
  //     const scaledTileHeight = tileHeight * scaleY;
  //     const scaledTileWidth = tileWidth * scaleX;
  //     let imagesLoaded = 0;
  //     for (let i = 0; i < tilesetImages.length; i++) {
  //       tilesetImages[i] = new Image();
  //       tilesetImages[i].src = edit.state.Tilesets[i].image;
  //       tilesetImages[i].onload = function () {
  //         imagesLoaded++;
  //         if (imagesLoaded === tilesetImages.length) {
  //           for (let i = 0; i < currentSelection.length; i++) {
  //             let currentGlobalTileID: number = 0;
  //             let currentTilesetIndex: number = 0;
  //             for (let i = currentGlobalTileIDs.length - 1; i >= 0; i--) {
  //               if (currentGlobalTileIDs[i] < currentTileIndex) {
  //                 currentGlobalTileID = currentGlobalTileIDs[i];
  //                 currentTilesetIndex = i;
  //               }
  //             }
  //             const tilesetTileWidth =
  //               edit.state.Tilesets[currentTilesetIndex].tileWidth;
  //             const tilesetTileHeight =
  //               edit.state.Tilesets[currentTilesetIndex].tileHeight;
  //             const tilesetWidth =
  //               edit.state.Tilesets[currentTilesetIndex].columns;

  //             const image: HTMLImageElement =
  //               tilesetImages[currentTilesetIndex];

  //             ctx.drawImage(
  //               image,
  //               ((currentTileIndex - currentGlobalTileID) % tilesetWidth) *
  //                 tilesetTileWidth,
  //               Math.floor(
  //                 (currentTileIndex - currentGlobalTileID) / tilesetWidth
  //               ) * tilesetTileHeight,
  //               tilesetTileWidth,
  //               tilesetTileHeight,
  //               (currentSelection[i] % width) * scaledTileWidth,
  //               Math.floor(currentSelection[i] / width) * scaledTileHeight,
  //               scaledTileWidth,
  //               scaledTileHeight
  //             );
  //           }
  //         }
  //       };
  //     }

  //     edit.updateCurrentLayerData();
  //   }
  // };

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

  const addRowSpaceFill = (x: number, y: number): number[] => {
    let selection: number[] = new Array();
    if (startingTile) {
      if (startingTile.x > x)
        for (let i = x; i <= startingTile.x; i++) selection.push(i + width * y);
      else
        for (let i = startingTile.x; i <= x; i++) selection.push(i + width * y);
    }
    return selection;
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
        Please user a browser that supports HTML Canvas
      </canvas>
    </div>
  );

  return <Box>{root};</Box>;
};

export default CurrentLayerCanvas;
