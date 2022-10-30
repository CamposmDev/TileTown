import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {GoMailRead} from 'react-icons/go';
import Typography from '@mui/material/Typography';
import { Icon, Modal } from '@mui/material';
import { useState } from 'react';


const VerifyEmailModal = () => {
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
                    <Icon ><GoMailRead /></Icon>
                </Avatar>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Verify your account
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Thank you Michael Campos!
                </Typography>
                <Typography id="modal-modal-description">We just sent a verification link to your email. Click on it and get started on using TitleTown</Typography>
                <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    sx={{ mt: 4 }}>
                    Resend Email
                </Button>
            </Box>
            
        </Modal>
    )
    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)}>VerifyEmail</Button>
            {ui}
        </>
    )
}

export default VerifyEmailModal