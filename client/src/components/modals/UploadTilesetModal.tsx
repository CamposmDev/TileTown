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
import { useNavigate } from "react-router-dom";
import { useForm, UseFormRegister, FieldValues } from "react-hook-form";
import { ModalContext } from "src/context/modal";
import { SnackContext } from "src/context/snack";
import { TilesetEditContext } from "src/context/tilesetEditor";
import { TilesetApi } from "../../api";
import { Tileset } from "@types";

type imageForm = {
  image: File;
};

const UploadTilesetModal = () => {
  const modal = useContext(ModalContext);
  const snack = useContext(SnackContext);
  const nav = useNavigate();
  const edit = useContext(TilesetEditContext);
  const { register, handleSubmit } = useForm();
  const [tileset, setTileset] = useState({
    name: "",
    width: "",
    height: "",
    row: "",
    column: "",
    source: "",
    error: true,
  });
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTileset({
      name: e.target.value,
      width: tileset.width,
      height: tileset.height,
      row: tileset.row,
      column: tileset.column,
      source: tileset.source,
      error: e.target.value === "",
    });
  };
  const changeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTileset({
      name: tileset.name,
      width: e.target.value,
      height: tileset.height,
      row: tileset.row,
      column: tileset.column,
      source: tileset.source,
      error: isNaN(Number(e.target.value)),
    });
  };
  const changeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTileset({
      name: tileset.name,
      width: tileset.width,
      height: e.target.value,
      row: tileset.row,
      column: tileset.column,
      source: tileset.source,
      error: isNaN(Number(e.target.value)),
    });
  };
  const changeRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTileset({
      name: tileset.name,
      width: tileset.width,
      height: tileset.height,
      row: e.target.value,
      column: tileset.column,
      source: tileset.source,
      error: isNaN(Number(e.target.value)),
    });
  };
  const changeColumn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTileset({
      name: tileset.name,
      width: tileset.width,
      height: tileset.height,
      row: tileset.row,
      column: e.target.value,
      source: tileset.source,
      error: isNaN(Number(e.target.value)),
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
      error: false,
    });
    modal.close();
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    let f = new FormData(e.target);
    f.append(
      "tileset",
      JSON.stringify({
        name: tileset.name,
        rows: Number(tileset.row),
        columns: Number(tileset.column),
        tileWidth: Number(tileset.width),
        tileHeight: Number(tileset.height),
        imageWidth: Number(tileset.column) * Number(tileset.width),
        imageHeight: Number(tileset.row) * Number(tileset.height),
      })
    );
    TilesetApi.createTileset(f).then((res) => {
      if (res.status === 201) {
        const id = res.data.tileset.id;
        snack?.showSuccessMessage(res.data.message);
        modal?.close();
        nav(`/create/tileset/${id}`);
      }
    });
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
            error={tileset.name === ""}
            helperText={tileset.name === "" ? "Please Enter A Name" : ""}
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
                error={isNaN(Number(tileset.width))}
                helperText={
                  isNaN(Number(tileset.width)) ? "Please Enter A Number" : ""
                }
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
                error={isNaN(Number(tileset.height))}
                helperText={
                  isNaN(Number(tileset.height)) ? "Please Enter A Number" : ""
                }
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
                error={isNaN(Number(tileset.row))}
                helperText={
                  isNaN(Number(tileset.row)) ? "Please Enter A Number" : ""
                }
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
                error={isNaN(Number(tileset.column))}
                helperText={
                  isNaN(Number(tileset.column)) ? "Please Enter A Number" : ""
                }
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
            <form onSubmit={onSubmit}>
              <input
                {...register("search")}
                type="file"
                name="image"
                accept=".png,jpg"
              ></input>
              <button disabled={tileset.error}>Upload</button>
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
