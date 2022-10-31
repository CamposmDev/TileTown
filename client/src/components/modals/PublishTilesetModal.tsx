import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Modal } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';



const PublishTilesetModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => setIsOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 1,
        p: 4,
        borderRadius: 2

      };

    let ui = (
        <Modal 
            open={isOpen} 
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style} textAlign='center'>

                <Typography sx={{fontWeight: 'bold'}} id="modal-modal-title" variant="h6" component="h2">
                  Are you sure you would like to publish the Campus Caverns Tileset?
                </Typography>
        
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Warning: Once a Tileset has been published, it cannot be unpublished. Your Tileset will be visible to the TileTown community. Other TileTown users will be able to copy, like, and comment on your tileset at will.
                </Typography>
                
                
        

                <Button  
                    startIcon={<SendIcon />}
                    variant="contained"
                >
                    Publish
                        </Button>
            </Box>
            
        </Modal>
    )
    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)}>Publish Tileset Modal</Button>
            {ui}
        </>
    )
}

export default PublishTilesetModal