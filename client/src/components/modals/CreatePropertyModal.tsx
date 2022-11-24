import { ModalContext } from "src/context/modal";
import { SnackContext } from "src/context/snack";
import { TilemapEditContext } from "src/context/tilemapEditor";
import { useState, useContext } from "react";
import { Type } from "src/context/tilemapEditor/TilemapEditTypes";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Radio,
  Box,
  Stack,
  Button,
  TextField,
} from "@mui/material";

const CreatePropertyModal = () => {
  const edit = useContext(TilemapEditContext);
  const snack = useContext(SnackContext);
  const modal = useContext(ModalContext);

  const [type, setType] = useState<Type>("bool");
  const [name, setName] = useState<string>("");

  const handleKeyPress = (event: any) => {
    if (event.code === "Enter") {
      createProperty();
    }
  };

  const createProperty = () => {
    switch (type) {
      case "bool": {
        edit.createProperty({ name, ptype: type, value: "true" });
        break;
      }
      case "int": {
        edit.createProperty({ name, ptype: type, value: "0" });
        break;
      }
      case "float": {
        edit.createProperty({ name, ptype: type, value: "0.0" });
        break;
      }
      case "string": {
        edit.createProperty({ name, ptype: type, value: "" });
        break;
      }
      // Objects to not be implemented now since we are not implementing object layers
      case "color": {
        edit.createProperty({ name, ptype: type, value: "#000000" });
        break;
      }
    }
    modal.close();
  };

  let ui = (
    <Dialog
      open={modal.getModal().showCreatePropertyModal}
      onClose={() => {
        modal.close();
      }}
    >
      <Stack display="flex" alignItems="center" justifyContent="center">
        <DialogTitle>Create Property</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter Name Of Property</DialogContentText>
        </DialogContent>
        <TextField
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onBlur={(e) => {
            setName(e.target.value);
          }}
          onKeyPress={handleKeyPress}
        ></TextField>
        <DialogContent>
          <DialogContentText>Please Select A Type</DialogContentText>
        </DialogContent>
        <Grid
          container
          rowSpacing={0.5}
          p={1}
          // columnSpacing={{ xs: 1, sm: 2, md: 0 }}
        >
          <Grid
            container
            item
            spacing={3}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={3}>
              <Radio
                checked={type === "bool"}
                onChange={() => {
                  setType("bool");
                }}
              ></Radio>
              Boolean
            </Grid>
            <Grid item xs={3}>
              <Radio
                checked={type === "int"}
                onChange={() => {
                  setType("int");
                }}
              ></Radio>
              Integer
            </Grid>
            <Grid item xs={3}>
              <Radio
                checked={type === "float"}
                onChange={() => {
                  setType("float");
                }}
              ></Radio>
              Float
            </Grid>
          </Grid>
          <Grid
            container
            item
            spacing={3}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={3}>
              <Radio
                checked={type === "string"}
                onChange={() => {
                  setType("string");
                }}
              ></Radio>
              String
            </Grid>
            <Grid item xs={3}>
              <Radio
                checked={type === "color"}
                onChange={() => {
                  setType("color");
                }}
              ></Radio>
              Color
            </Grid>
            <Grid
              container
              item
              spacing={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant="contained"
                sx={{ m: 1 }}
                onClick={createProperty}
              >
                Create
              </Button>
              <Button
                variant="contained"
                sx={{ m: 1 }}
                onClick={() => {
                  modal.close();
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <DialogActions></DialogActions>
      </Stack>
    </Dialog>
  );
  return <div>{ui}</div>;
};

export default CreatePropertyModal;
