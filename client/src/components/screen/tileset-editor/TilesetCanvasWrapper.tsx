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
import TilesetCanvas from "./TilesetCanvas";
import GridCanvas from "./GridCanvas";

const TilesetCanvasWrapper = () => {
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
  // const [gridEnabled, setGridEnabled] = useState(edit.state.gridEnabled);

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
  const gridColor = edit.state.gridColor;
  const gridEnabled = edit.state.gridEnabled;
  const gridSize = edit.state.gridSize;

  const tileHeight = edit.state.tileset.tileHeight;
  const tileWidth = edit.state.tileset.tileWidth;
  const columns = edit.state.tileset.columns;
  const rows = edit.state.tileset.rows;
  const imageHeight: number = tileHeight * rows;
  const imageWidth: number = tileWidth * columns;
  const canvasHeight: number = 800;
  const canvasWidth: number = 800;
  const canvasImage: HTMLImageElement = new Image();

  useEffect(() => {}, []);

  return (
    <Grid id="tileset-canvas-wrapper" item textAlign="center" p={1}>
      <TilesetCanvas></TilesetCanvas>
      <GridCanvas></GridCanvas>
    </Grid>
  );
};

export default TilesetCanvasWrapper;
