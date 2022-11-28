import { Delete } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "src/context/auth";
import { SnackContext } from "src/context/snack";
import { SocialContext } from "src/context/social";
import { SLIDE_DOWN_TRANSITION } from "../util/Constants";

export default function DeleteTilemapButton(props: {id: string, name: string}) {
    const auth = useContext(AuthContext);
    const social = useContext(SocialContext);
    const snack = useContext(SnackContext)
    const nav = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = () => {
        social.deleteTilemapById(props.id, snack).then(() => {
        auth.refreshUser().then(() => {
            nav(`/profile/${auth.usr?.id}`);
        })
        });
        handleClose();
    };

    let modal = (
        <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={SLIDE_DOWN_TRANSITION}
        >
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
            <DialogContentText>{`Are you sure you want to delete ${props.name}`}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color="error" onClick={handleDelete}>
            Delete
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
        </Dialog>
    );
    return (
        <Box>
            <Button startIcon={<Delete />} color="error" onClick={handleOpen}>
                Delete
            </Button>
            {modal}
        </Box>
    )
}