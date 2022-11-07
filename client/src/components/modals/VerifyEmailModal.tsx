import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {GoMailRead} from 'react-icons/go';
import Typography from '@mui/material/Typography';
import { Dialog, Icon } from '@mui/material';
import { useState } from 'react';
import { SLIDE_DOWN_TRANSITION } from '../util/Constants';


const VerifyEmailModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    let ui = (
        <Dialog 
            open={isOpen} 
            onClose={handleClose}
            TransitionComponent={SLIDE_DOWN_TRANSITION}
        >
            <Box textAlign='center' mt={2} mr={2} ml={2}>
                <Avatar sx={{ bgcolor: 'secondary.main', justifyItems: 'center', margin: 'auto'}}>
                    <Icon><GoMailRead/></Icon>
                </Avatar>
                <Typography variant="h6" component="h2">
                    Verify your account
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Thank you Michael Campos!
                </Typography>
                <Typography>We just sent a verification link to your email. Click on</Typography>
                <Typography>it and get started on using TitleTown</Typography>
            </Box>
            <Box textAlign={'center'} mb={1}>
                <Button
                    sx={{ mt: 1 }}>
                    Resend Email
                </Button>
            </Box>
        </Dialog>
    )
    return (
        <div>
            <Button onClick={() => setIsOpen(!isOpen)}>VerifyEmail</Button>
            {ui}
        </div>
    )
}

export default VerifyEmailModal