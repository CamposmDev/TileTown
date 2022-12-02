import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  ButtonGroup,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Grow,
  InputAdornment,
  MenuList,
  Modal,
  Paper,
  Popper,
} from "@mui/material";
import { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { Add, ArrowDropDown, Close } from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";
import { ModalContext } from "src/context/modal";
import { SnackContext } from "src/context/snack";
import { Tilemap } from "src/context/tilemapEditor/TilemapEditTypes";
import { TilemapApi } from "src/api";
import { useNavigate } from "react-router-dom";

const UploadTilemapModal = () => {
  const modal = useContext(ModalContext);
  const snack = useContext(SnackContext);
  const nav = useNavigate();

  const [tilemap, setTilemap] = useState({
    name: "",
    width: 12,
    height: 12,
    tileHeight: 10,
    tileWidth: 10,
  });

  const [error, setError] = useState(true);

  const handleClose = () => {
    setTilemap({
      name: "",
      width: 12,
      height: 12,
      tileHeight: 10,
      tileWidth: 10,
    });
    modal.close();
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTilemap({ ...tilemap, name: e.target.value });
    setError(e.target.value === "");
  };

  const changeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      isNaN(Number(e.target.value)) ||
      Number(e.target.value) < 1 ||
      Number(e.target.value) > 64
    ) {
      snack.showErrorMessage("Please Enter An Integer Value Between 1 and 64");
      return;
    }
    setTilemap({ ...tilemap, width: Number(e.target.value) });
  };

  const changeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      isNaN(Number(e.target.value)) ||
      Number(e.target.value) < 1 ||
      Number(e.target.value) > 64
    ) {
      snack.showErrorMessage("Please Enter An Integer Value Between 1 and 64");
      return;
    }
    setTilemap({ ...tilemap, height: Number(e.target.value) });
  };

  const changeTileWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      isNaN(Number(e.target.value)) ||
      Number(e.target.value) < 1 ||
      Number(e.target.value) > 100
    ) {
      snack.showErrorMessage("Please Enter An Integer Value Between 1 and 100");
      return;
    }
    setTilemap({ ...tilemap, tileWidth: Number(e.target.value) });
  };

  const changeTileHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      isNaN(Number(e.target.value)) ||
      Number(e.target.value) < 1 ||
      Number(e.target.value) > 100
    ) {
      snack.showErrorMessage("Please Enter An Integer Value Between 1 and 100");
      return;
    }
    setTilemap({ ...tilemap, tileHeight: Number(e.target.value) });
  };

  const createTilemap = () => {
    if (tilemap.name)
      TilemapApi.createTilemap({ tilemap }).then((res) => {
        if (res.status === 201 && res.data.tilemap) {
          const id = res.data.tilemap.id;
          snack?.showSuccessMessage(res.data.message);
          modal?.close();
          nav(`/create/tilemap/${id}`);
        }
      });
  };

  let ui = (
    <Dialog
      open={modal.getModal().showUploadTilemapModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle>Upload Tilemap</DialogTitle>
      <Box textAlign="center">
        <Grid mr={2} ml={2}>
          <TextField
            margin="dense"
            value={tilemap.name}
            onChange={changeName}
            required
            fullWidth
            label="Tilemap Name"
            name="Tilemap Name"
            autoFocus
          />
          <TextField
            margin="dense"
            value={tilemap.width}
            onChange={changeWidth}
            required
            fullWidth
            label="Width"
            name="width"
            autoComplete="width"
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">Tiles</InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            margin="dense"
            value={tilemap.height}
            onChange={changeHeight}
            required
            fullWidth
            label="Height"
            name="height"
            autoComplete="height"
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">Tiles</InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            value={tilemap.tileWidth}
            onChange={changeTileWidth}
            required
            fullWidth
            label="TileWidth"
            name="TileWidth"
            autoComplete="TileWidth"
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">Px</InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            value={tilemap.tileHeight}
            onChange={changeTileHeight}
            margin="dense"
            required
            fullWidth
            label="TileHeight"
            name="TileHeight"
            autoComplete="TileHeight"
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">Px</InputAdornment>
              ),
            }}
          />
          <Stack direction="row" alignItems={"center"} spacing={1}>
            <TextField
              margin="dense"
              required
              fullWidth
              label="Source"
              name="source"
              autoComplete="source"
              autoFocus
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">JSON</InputAdornment>
                ),
              }}
            />
            <Button variant="contained">Browser</Button>
          </Stack>
        </Grid>
      </Box>
      <DialogActions>
        <Button startIcon={<UploadIcon />}>Upload</Button>
        <Button onClick={createTilemap} disabled={error} startIcon={<Add />}>
          Create
        </Button>
        <Button onClick={handleClose} startIcon={<Close />}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
  return <div>{ui}</div>;
};

export default UploadTilemapModal;
