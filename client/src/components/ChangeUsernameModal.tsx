import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Modal } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';



const ChangeUsernameModal = () => {
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

                <Typography id="modal-modal-title" variant="h6">
                  Really change your username?
                </Typography>
           
                <Typography id="modal-modal-title" variant="body1">
                  We will create redirects for your tile maps and sets.
                </Typography>

                <Typography id="modal-modal-title" variant="body1">
                  Renaming will take a few minutes to complete.
                </Typography>
                
                <TextField
                    variant='outlined'
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="New Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                />
        

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 4 }}>
                    Change my username
                </Button>
            </Box>
            
        </Modal>
    )
    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)}>Change</Button>
            {ui}
        </>
    )
}

export default ChangeUsernameModal