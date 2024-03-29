import { TilesetEditContext } from "src/context/tilesetEditor";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Box } from "@mui/system";
import { ExitToApp } from "@mui/icons-material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { SLIDE_DOWN_TRANSITION } from "../util/Constants";

const ExitTilesetButton = (props: { id: string; name: string }) => {
  const edit = useContext(TilesetEditContext);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (!isSaved) setOpen(true);
    else exit();
  };
  const handleClose = () => setOpen(false);
  const exit = () => {
    nav(`/home`);
  };
  const saveAndExit = () => {
    edit.saveTileset().then(() => {
      exit();
    });
  };

  const isSaved = edit.state.isSaved;

  const modal = (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={SLIDE_DOWN_TRANSITION}
    >
      <DialogTitle>Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>{`Would you like to save ${props.name} before exiting`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={saveAndExit}>Save and Exit</Button>
        <Button color="error" onClick={exit}>
          Exit Without Saving
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
  return (
    <Box>
      <Button startIcon={<ExitToApp />} color="primary" onClick={handleOpen}>
        Exit
      </Button>
      {modal}
    </Box>
  );
};

export default ExitTilesetButton;
