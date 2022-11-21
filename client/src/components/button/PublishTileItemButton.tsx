import { Publish, Send } from "@mui/icons-material"
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { SLIDE_DOWN_TRANSITION } from "../util/Constants"

interface Props {
    name: string
}

const PublishTileItemButton = (props: Props) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const publish = () => {
        console.log('publishing...')
        handleClose()
    }

    const modal = (
        <Dialog open={open} onClose={handleClose} TransitionComponent={SLIDE_DOWN_TRANSITION}>
            <DialogTitle>Publish</DialogTitle>
            <DialogContent>
                    <Typography>
                        {'Are you sure you want to publish ' + props.name + '?'}
                    </Typography>
            </DialogContent>
            <DialogActions>
                    <Button onClick={publish} startIcon={<Send />}>Publish</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
        </Dialog>
    )
    return (
        <div>
            <Button startIcon={<Publish />} onClick={handleOpen} color="primary">
                Publish
              </Button>
              {modal}
        </div>
    )
}

export default PublishTileItemButton