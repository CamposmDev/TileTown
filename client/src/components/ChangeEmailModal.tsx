import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon, Modal } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';



const ChangeEmailModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => setIsOpen(true);
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
                  Really change your email?
                </Typography>
        
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Rename will take a few minutes to complete
                </Typography>
                
                <TextField
                    variant='outlined'
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="New Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
        

                <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    sx={{ mt: 4 }}>
                    Change my email
                </Button>
            </Box>
            
        </Modal>
    )
    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)}>Change Email Modal</Button>
            {ui}
        </>
    )
}

export default ChangeEmailModal