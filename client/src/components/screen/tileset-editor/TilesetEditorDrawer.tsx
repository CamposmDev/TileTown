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

const TilesetEditorDrawer = () => {
  const edit = useContext(TilesetEditContext);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tilesetName, setTilesetName] = useState(edit.state.tileset.name);
  const [columns, setColumns] = useState(edit.state.tileset.columns);
  const [rows, setRows] = useState(edit.state.tileset.rows);
  const [tileHeight, setTileHeight] = useState(edit.state.tileset.tileHeight);
  const [tileWidth, setTileWidth] = useState(edit.state.tileset.tileWidth);
  const [penColor, setPenColor] = useState<Color>(edit.state.penColor);
  const [penSize, setPenSize] = useState(edit.state.penSize);
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
    if (isNaN(text)) {
      setColumns(edit.state.tileset.columns);
      return;
    }
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
    if (isNaN(text)) {
      setRows(edit.state.tileset.rows);
      return;
    }
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
    if (isNaN(text)) {
      setTileHeight(edit.state.tileset.rows);
      return;
    }
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
    if (isNaN(text)) {
      setTileWidth(edit.state.tileset.rows);
      return;
    }
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
    if (isNaN(text)) {
      setPenSize(edit.state.penSize);
      return;
    }
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
      return;
    }
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
    if (isNaN(text) || text < 1) {
      return;
    }
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
        <Stack direction="row" alignItems="center" spacing={1}>
          <TextField
            label="Zoom"
            fullWidth
            size="small"
            onBlur={handleUpdateZoom}
            onKeyPress={handleZoomKeyPress}
            onChange={handleUpdateZoom}
            defaultValue={edit.state.zoom}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">px</InputAdornment>
              ),
            }}
          />
        </Stack>
        <Divider />
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
            fullWidth
            size="small"
          />
          <TextField
            label="Pen Color"
            onBlur={handleUpdatePenColor}
            onKeyPress={handlePenColorKeyPress}
            onChange={handlePenColorUpdateText}
            defaultValue={penColor}
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
