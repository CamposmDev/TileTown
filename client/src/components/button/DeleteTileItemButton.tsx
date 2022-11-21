import { Delete } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import { useState } from "react"
import { SLIDE_DOWN_TRANSITION } from "../util/Constants"

interface Props {
    name: string
    callback: Function
}

const DeleteTileItemButton = (props: Props) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const modal = (
        <Dialog open={open} onClose={handleClose} TransitionComponent={SLIDE_DOWN_TRANSITION}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <Typography>{'Are you sure you want to delete ' + props.name + '?'}</Typography>
            </DialogContent>
            <DialogActions>
                <Button>Yes</Button>
                <Button onClick={handleClose}>No</Button>
            </DialogActions>
        </Dialog>
    )
    return (
        <div>
            <Button startIcon={<Delete />} onClick={handleOpen} color="error">
                Delete
              </Button>
            {modal}
        </div>
    )
}

export default DeleteTileItemButton