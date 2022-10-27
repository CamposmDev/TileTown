import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import Typography from '@mui/material/Typography';
import { Icon, Modal } from '@mui/material';
import { useState } from 'react';



const EmailChangeModal = () => {
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
                <Avatar sx={{ bgcolor: 'secondary.main', justifyItems: 'center', margin: 'auto'}}>
                    <Icon ><MarkEmailReadIcon /></Icon>
                </Avatar>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                   Email Change Successful
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Thank you Michael Campos! 
                </Typography>
                <Typography id="modal-modal-description">We successfully changed your email for your account</Typography>

                <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    sx={{ mt: 4 }}>
                    Got it
                </Button>
            </Box>
            
        </Modal>
    )
    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)}>EmailChangeModal</Button>
            {ui}
        </>
    )
}

export default EmailChangeModal