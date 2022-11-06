import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import Typography from '@mui/material/Typography';
import { Dialog, Icon, Modal } from '@mui/material';
import { useState } from 'react';


/**
 * @deprecated
 * @returns 
 */
const EmailChangeModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    let ui = (
        <Dialog 
            open={isOpen} 
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box textAlign='center' mt={1} ml={1} mr={1}>
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
                    sx={{ mt: 1, mb: 1 }}>
                    Ok
                </Button>
            </Box>
            
        </Dialog>
    )
    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)}>EmailChangeModal</Button>
            {ui}
        </>
    )
}

export default EmailChangeModal