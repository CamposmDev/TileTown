import { Delete } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import { useState } from "react"

interface Props {
    name: string
}

const DeleteTileItemButton = (props: Props) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const modal = (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <Typography>{'Are you sure you want to delete ' + props.name + '?'}</Typography>
                
                <DialogActions>
                    <Button>Yes</Button>
                    <Button onClick={handleClose}>No</Button>
                </DialogActions>
            </DialogContent>
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