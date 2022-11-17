import { Upload } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import React, { useContext, useState, useRef } from "react";
import { useForm, UseFormRegister, FieldValues } from "react-hook-form";
import { ModalContext } from "src/context/modal";
import { TilesetEditContext } from "src/context/tilesetEditor";
import { TilesetApi } from "../../api";

type imageForm = {
  image: File;
};

const UploadTilesetModal = () => {
  const modal = useContext(ModalContext);
  const edit = useContext(TilesetEditContext);
  const { register, handleSubmit } = useForm();
  const [tileset, setTileset] = useState({
    name: "",
    width: "",
    height: "",
    row: "",
    column: "",
    source: "",
  });
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTileset({
      name: e.target.value,
      width: tileset.width,
      height: tileset.height,
      row: tileset.row,
      column: tileset.height,
      source: tileset.source,
    });
    console.log(tileset);
  };
  const changeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTileset({
      name: tileset.name,
      width: e.target.value,
      height: tileset.height,
      row: tileset.row,
      column: tileset.height,
      source: tileset.source,
    });
    console.log(tileset);
  };
  const changeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTileset({
      name: tileset.name,
      width: tileset.width,
      height: e.target.value,
      row: tileset.row,
      column: tileset.height,
      source: tileset.source,
    });
    console.log(tileset);
  };
  const changeRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTileset({
      name: tileset.name,
      width: tileset.width,
      height: tileset.height,
      row: e.target.value,
      column: tileset.height,
      source: tileset.source,
    });
    console.log(tileset);
  };
  const changeColumn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTileset({
      name: tileset.name,
      width: tileset.width,
      height: tileset.height,
      row: tileset.row,
      column: e.target.value,
      source: tileset.source,
    });
    console.log(tileset);
  };
  const changeSource = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTileset({
      name: tileset.name,
      width: tileset.width,
      height: tileset.height,
      row: tileset.row,
      column: tileset.column,
      source: e.target.value,
    });
  };
  const handleClose = () => {
    setTileset({
      name: "",
      width: "",
      height: "",
      row: "",
      column: "",
      source: "",
    });
    modal.close();
  };
  const handleUpload = () => {
    console.log(tileset);
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target[0].files[0]);
    console.log(e.target);
    let f = new FormData(e.target);
    for (let key of f.keys()) {
      console.log(key);
    }
    f.append(
      "tileset",
      JSON.stringify({
        name: tileset.name,
        rows: parseInt(tileset.row),
        columns: parseInt(tileset.column),
        tileWidth: parseInt(tileset.width),
        tileHeight: parseInt(tileset.height),
        imageWidth: parseInt(tileset.column) * parseInt(tileset.width),
        imageHeight: parseInt(tileset.row) * parseInt(tileset.height),
      })
    );
    console.log(f.get("tileset"));
    edit.createTileset(f);
    // TilesetApi.createTileset(f);
  };
  let ui = (
    <Dialog
      open={modal.getModal().showUploadTilesetModal}
      onClose={handleClose}
    >
      <DialogTitle>Upload Tileset</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the following information
        </DialogContentText>
        <Grid container mr={2} ml={2}>
          <TextField
            margin="dense"
            required
            fullWidth
            label="Tileset Name"
            name="Tileset Name"
            onChange={changeName}
            autoFocus
          />
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                required
                fullWidth
                label="Tile Width"
                name="width"
                onChange={changeWidth}
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">pixels</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                required
                fullWidth
                label="Tile Height"
                name="height"
                onChange={changeHeight}
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">pixels</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                required
                fullWidth
                label="Row"
                name="row"
                onChange={changeRow}
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">tiles</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                required
                fullWidth
                label="Column"
                name="column"
                onChange={changeColumn}
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">tiles</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container>
            {/* <TextField
              margin="dense"
              required
              fullWidth
              label="Source"
              name="source"
              onChange={changeSource}
              autoFocus
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Button onClick={handleBrowse}>
                      Browse
                      <input type="file" hidden />
                    </Button>
                  </InputAdornment>
                ),
              }}
            /> */}
            <form onSubmit={onSubmit}>
              <input
                {...register("search")}
                type="file"
                name="image"
                accept=".png,jpg"
              ></input>
              <button>Upload</button>
              {/* <Button startIcon={<Upload />}>Upload</Button> */}
            </form>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
  return <div>{ui}</div>;
};

export default UploadTilesetModal;
