import { NavigateBefore, Tune } from "@mui/icons-material";
import {
  IconButton,
  Drawer,
  Grid,
  Divider,
  Typography,
  TextField,
  Stack,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useContext } from "react";
import { TilesetEditContext } from "../../../context/tilesetEditor";
import {
  TilesetEditControl,
  Color,
  isHex,
  isColor,
} from "src/context/tilesetEditor/TilesetEditTypes";
import { useState } from "react";
import console from "console";
import { SnackContext } from "src/context/snack";

const TilesetEditorDrawer = () => {
  const edit = useContext(TilesetEditContext);
  const snack = useContext(SnackContext);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tilesetName, setTilesetName] = useState(edit.state.tileset.name);

  const [columns, setColumns] = useState(edit.state.tileset.columns);
  const [rows, setRows] = useState(edit.state.tileset.rows);
  const [tileHeight, setTileHeight] = useState(edit.state.tileset.tileHeight);
  const [tileWidth, setTileWidth] = useState(edit.state.tileset.tileWidth);
  const [penColor, setPenColor] = useState<Color>(edit.state.penColor);
  const [penSize, setPenSize] = useState(edit.state.penSize);

  const [rowError, setRowError] = useState<boolean>(false);
  const [columnError, setColumnError] = useState<boolean>(false);
  const [tileHeightError, setTileHeightError] = useState<boolean>(false);
  const [tileWidthError, setTileWidthError] = useState<boolean>(false);
  const [penColorError, setPenColorError] = useState<boolean>(false);
  const [penSizeError, setPenSizeError] = useState<boolean>(false);
  const [zoomError, setZoomError] = useState<boolean>(false);
  const zoom = edit.state.zoom;

  const handleMenuOpen = () => setIsDrawerOpen(true);

  const handleMenuClose = () => setIsDrawerOpen(false);

  const handleNameKeyPress = (event: any): void => {
    if (event.code === "Enter") {
      handleUpdateTilesetName(event);
    }
  };

  const handleUpdateTilesetName = (event: any): void => {
    let text = event.target.value;
    edit.updateTileset({ name: text });
  };

  const handleNameUpdateText = (event: any): void => {
    setTilesetName(event.target.value);
  };

  const handleColumnsKeyPress = (event: any): void => {
    if (event.code === "Enter") {
      handleUpdateColumns(event);
    }
  };

  const handleUpdateColumns = (event: any): void => {
    let text = event.target.value;
    if (isNaN(text) || text < 1 || text > 64) {
      setColumns(edit.state.tileset.columns);
      setColumnError(true);
      snack.showErrorMessage("Please Enter A Number Between 1 and 64");
      return;
    }
    setColumnError(false);
    edit.updateTileset({
      columns: Math.floor(text),
      imageWidth: Math.floor(text) * tileWidth,
    });
  };

  const handleColumnsUpdateText = (event: any): void => {
    setColumns(event.target.value);
  };

  const handleUpdateRows = (event: any): void => {
    let text = event.target.value;
    if (isNaN(text) || text < 1 || text > 64) {
      setRows(edit.state.tileset.rows);
      setRowError(true);
      snack.showErrorMessage("Please Enter A Number Between 1 and 64");
      return;
    }
    setRowError(false);
    edit.updateTileset({
      rows: Math.floor(text),
      imageHeight: Math.floor(text) * tileHeight,
    });
  };

  const handleRowsKeyPress = (event: any): void => {
    if (event.code === "Enter") {
      handleUpdateRows(event);
    }
  };
  const handleRowsUpdateText = (event: any): void => {
    setRows(event.target.value);
  };

  const handleTileHeightKeyPress = (event: any): void => {
    if (event.code === "Enter") {
      handleUpdateTileHeight(event);
    }
  };

  const handleUpdateTileHeight = (event: any): void => {
    let text = event.target.value;
    if (isNaN(text) || text < 1 || text > 100) {
      setTileHeight(edit.state.tileset.tileHeight);
      setTileHeightError(true);
      snack.showErrorMessage("Please Enter A Number Between 1 and 100");
      return;
    }
    setTileHeightError(false);
    edit.updateTileset({
      tileHeight: Math.floor(text),
      imageHeight: rows * Math.floor(text),
    });
  };

  const handleTileHeightUpdateText = (event: any): void => {
    setTileHeight(event.target.value);
  };

  const handleTileWidthKeyPress = (event: any): void => {
    if (event.code === "Enter") {
      handleUpdateTileWidth(event);
    }
  };

  const handleUpdateTileWidth = (event: any): void => {
    let text = event.target.value;
    if (isNaN(text) || text < 1 || text > 100) {
      setTileWidth(edit.state.tileset.rows);
      setTileWidthError(true);
      snack.showErrorMessage("Please Enter A Number Between 1 and 100");
      return;
    }
    setTileWidthError(false);
    edit.updateTileset({
      tileWidth: Math.floor(text),
      imageWidth: columns * Math.floor(text),
    });
  };

  const handleTileWidthUpdateText = (event: any): void => {
    setTileWidth(event.target.value);
  };

  const handlePenSizeKeyPress = (event: any): void => {
    if (event.code === "Enter") {
      handleUpdatePenSize(event);
    }
  };

  const handleUpdatePenSize = (event: any): void => {
    let text = event.target.value;
    if (isNaN(text) || text < 1 || text > 10) {
      setPenSize(edit.state.penSize);
      setPenSizeError(true);
      snack.showErrorMessage("Please Enter A Number Between 1 and 10");
      return;
    }
    setPenSizeError(false);
    edit.updatePen(Math.floor(text), penColor);
  };

  const handlePenSizeUpdateText = (event: any): void => {
    setPenSize(event.target.value);
  };

  const handlePenColorKeyPress = (event: any): void => {
    if (event.code === "Enter") {
      handleUpdatePenColor(event);
    }
  };

  const handleUpdatePenColor = (event: any): void => {
    let text = event.target.value;
    if (!isColor(text)) {
      setPenColor(edit.state.penColor);
      setPenColorError(true);
      snack.showErrorMessage(
        "Please Enter a Color In The Format `#000000` Or `rgb(000, 000, 000)`"
      );
      return;
    }
    setPenColorError(false);
    edit.updatePen(penSize, text as Color);
  };

  const handlePenColorUpdateText = (event: any): void => {
    setPenColor(event.target.value);
  };

  const handleZoomKeyPress = (event: any): void => {
    if (event.code === "Enter") {
      handleUpdateZoom(event);
    }
  };

  const handleUpdateZoom = (event: any): void => {
    let text = event.target.value;
    if (isNaN(text) || text < 1 || text > 20) {
      setZoomError(true);
      snack.showErrorMessage("Please Enter A Number Between 1 And 20");
      return;
    }
    setZoomError(false);
    edit.updateZoom(text);
  };

  const drawer = (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={handleMenuClose}
      PaperProps={{ sx: { mt: 15 } }}
      BackdropProps={{ invisible: true }}
    >
      <Stack
        spacing={1}
        width="300px"
        role="presentation"
        textAlign="start"
        p={1}
      >
        <Grid container alignItems="center">
          <IconButton onClick={handleMenuClose} children={<NavigateBefore />} />
          <Typography>Properties</Typography>
        </Grid>
        <Divider />
        <Stack direction="row" alignItems="center" spacing={1}>
          <TextField
            label="Tileset Name"
            fullWidth
            size="small"
            onBlur={handleUpdateTilesetName}
            onKeyPress={handleNameKeyPress}
            onChange={handleNameUpdateText}
            defaultValue={tilesetName}
          />
        </Stack>
        <Grid container alignItems="center" pt={2}>
          <Typography>Tileset Size</Typography>
        </Grid>
        <Divider />
        <Stack direction="row" alignItems="center" spacing={1}>
          <TextField
            label="Columns"
            fullWidth
            size="small"
            onBlur={handleUpdateColumns}
            onKeyPress={handleColumnsKeyPress}
            onChange={handleColumnsUpdateText}
            defaultValue={columns}
            error={columnError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">tiles</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Rows"
            fullWidth
            size="small"
            onBlur={handleUpdateRows}
            onKeyPress={handleRowsKeyPress}
            onChange={handleRowsUpdateText}
            defaultValue={rows}
            error={rowError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">tiles</InputAdornment>
              ),
            }}
          />
        </Stack>
        <Grid container alignItems="center" pt={2}>
          <Typography>Tile Size</Typography>
        </Grid>
        <Divider />
        <Stack direction="row" alignItems="center" spacing={1}>
          <TextField
            label="Width"
            fullWidth
            size="small"
            onBlur={handleUpdateTileWidth}
            onKeyPress={handleTileWidthKeyPress}
            onChange={handleTileWidthUpdateText}
            defaultValue={tileWidth}
            error={tileWidthError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">px</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Height"
            fullWidth
            size="small"
            onBlur={handleUpdateTileHeight}
            onKeyPress={handleTileHeightKeyPress}
            onChange={handleTileHeightUpdateText}
            defaultValue={tileHeight}
            error={tileHeightError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">px</InputAdornment>
              ),
            }}
          />
        </Stack>
        <Grid container alignItems="center" pt={2}>
          <Typography>Zoom</Typography>
        </Grid>
        <Divider />
        <Stack direction="row" alignItems="center" spacing={1}>
          <TextField
            label="Zoom"
            fullWidth
            size="small"
            onBlur={handleUpdateZoom}
            onKeyPress={handleZoomKeyPress}
            onChange={handleUpdateZoom}
            defaultValue={edit.state.zoom}
            error={zoomError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">px</InputAdornment>
              ),
            }}
          />
        </Stack>

        <Grid container alignItems="center" pt={2}>
          <Typography>Grid</Typography>
        </Grid>
        <Divider />
        <Stack direction="column" alignItems="flex-start" spacing={1}>
          <Stack direction="row" alignItems="flex-start" spacing={1}>
            <FormControlLabel
              control={
                <Checkbox
                  onClick={() => {
                    edit.toggleGrid();
                  }}
                  checked={edit.state.gridEnabled}
                />
              }
              labelPlacement="start"
              label="Enabled"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onClick={() => {
                    edit.toggleRestrictToTile();
                  }}
                  checked={edit.state.restrictToTile}
                />
              }
              labelPlacement="start"
              label="Restrict To Tile"
            />
          </Stack>
          <Grid container alignItems="center" pt={2}>
            <Typography>Pen</Typography>
          </Grid>
          <Divider />
          <TextField
            label="Pen Size"
            onBlur={handleUpdatePenSize}
            onKeyPress={handlePenSizeKeyPress}
            onChange={handlePenSizeUpdateText}
            defaultValue={penSize}
            error={penSizeError}
            fullWidth
            size="small"
          />
          <TextField
            label="Pen Color"
            onBlur={handleUpdatePenColor}
            onKeyPress={handlePenColorKeyPress}
            onChange={handlePenColorUpdateText}
            defaultValue={penColor}
            error={penColorError}
            fullWidth
            size="small"
          />
        </Stack>
      </Stack>
    </Drawer>
  );

  return (
    <Grid item>
      <IconButton
        onClick={handleMenuOpen}
        color="primary"
        children={<Tune />}
      />
      {drawer}
    </Grid>
  );
};

export default TilesetEditorDrawer;
