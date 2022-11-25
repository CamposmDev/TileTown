import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { SLIDE_DOWN_TRANSITION } from "../util/Constants";

export default function DeleteTilesetButton(props: {
    id: string,
    name: string
}) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleDelete = () => {

    }

    let modal = (
        <Dialog open={open} onClose={handleClose} TransitionComponent={SLIDE_DOWN_TRANSITION}>
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>{`Are you sure you want to delete ${props.name}`}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    )

    return (
        <Box>
            <Button onClick={handleOpen}>Delete</Button>
        </Box>
    )
}