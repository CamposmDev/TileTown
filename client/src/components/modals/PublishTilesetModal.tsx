import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Dialog, DialogActions, Modal } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';


/**
 * @deprecated
 * @returns 
 */
const PublishTilesetModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => setIsOpen(false);

    let ui = (
        <Dialog 
            open={isOpen} 
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box textAlign='center'>

                <Typography sx={{fontWeight: 'bold'}} id="modal-modal-title" variant="h6" component="h2">
                  Are you sure you would like to publish the Campus Caverns Tileset?
                </Typography>
        
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Warning: Once a Tileset has been published, it cannot be unpublished. Your Tileset will be visible to the TileTown community. Other TileTown users will be able to copy, like, and comment on your tileset at will.
                </Typography>
            </Box>
            <DialogActions>
                <Button startIcon={<SendIcon />} variant="contained">Publish</Button>
            </DialogActions>
        </Dialog>
    )
    return (
        <Box>
            <Button onClick={() => setIsOpen(!isOpen)}>Publish Tileset Modal</Button>
            {ui}
        </Box>
    )
}

export default PublishTilesetModal