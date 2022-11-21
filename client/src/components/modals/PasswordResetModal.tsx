import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import { Dialog, Icon, Link, Modal } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { SLIDE_DOWN_TRANSITION } from '../util/Constants';

import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import AxiosApi from "../../api/axios/AxiosApi"



const PasswordResetModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const { auth } = useContext(AuthContext);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        AxiosApi.post(`/user/reset/password`, { email: auth.usr?.email });
    };

    let ui = (
        <Dialog 
            open={isOpen} 
            onClose={handleClose}
            TransitionComponent={SLIDE_DOWN_TRANSITION}
        >
            <Box component={'form'} textAlign='center' mt={2} ml={2} mr={2} onSubmit={handleSubmit}>   
                <Avatar sx={{ bgcolor: 'secondary.main', justifyItems: 'center', margin: 'auto'}}>
                    <Icon><LockIcon/></Icon>
                </Avatar>
                <Typography variant="h6" component="h2">
                    Password Reset
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    Enter your email for a password reset
                </Typography>
                <TextField
                    margin="dense"
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <Button sx={{ mt: 1, mb: 1 }}>Get New Password</Button>
            </Box>
        </Dialog>
    )
    return (
        <div>
            <Link href='\\' variant='body2' onClick={() => setIsOpen(!isOpen)}>Forgot your password?</Link>
            {ui}
        </div>
    )
}

export default PasswordResetModal