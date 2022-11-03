import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';



const ChangeEmailModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => setIsOpen(false);

    let ui = (
        <Dialog 
            open={isOpen} 
            onClose={handleClose}
            >
            <DialogTitle>Really change your email?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Renaming will take a few minutes to complete
                </DialogContentText>
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
                
            </DialogContent>
            <DialogActions>
                <Button
                    type="submit">
                    Change my email
                </Button>
            </DialogActions>
        </Dialog>
    )
    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)}>Change</Button>
            {ui}
        </>
    )
}

export default ChangeEmailModal