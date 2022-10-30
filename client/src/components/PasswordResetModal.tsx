import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import { Icon, Link, Modal } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';



const PasswordResetModal = () => {
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
                <Avatar sx={{ bgcolor: 'secondary.main', justifyItems: 'center', margin: 'auto'}}>
                    <Icon ><LockIcon /></Icon>
                </Avatar>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Password Reset
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Enter your email for a password reset!
                </Typography>
                <TextField
                    variant='outlined'
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    sx={{ mt: 4 }}>
                    Get New Password
                </Button>
            </Box>
            
        </Modal>
    )
    return (
        <>
            <Link href='#' variant='body2' onClick={() => setIsOpen(!isOpen)}>Forgot your password?</Link>
            {ui}
        </>
    )
}

export default PasswordResetModal