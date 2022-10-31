import { Publish, Send } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"

interface Props {
    name: string
}

const PublishTileItemButton = (props: Props) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const modal = (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Publish</DialogTitle>
            <DialogContent>
                    <Typography>
                        {'Are you sure you want to publish ' + props.name + '?'}
                    </Typography>
                    {/* <Typography>
                        Warning: Once a Tileset has been published, it cannot be unpublished. Your Tileset will be visible to the TileTown community. Other TileTown users will be able to copy, like, and comment on your tileset at will.
                    </Typography>                     */}
                <DialogActions>
                    <Button  
                        startIcon={<Send />}
                    >
                        Publish
                    </Button>
                    <Button>Cancel</Button>
                </DialogActions>
            </DialogContent>
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