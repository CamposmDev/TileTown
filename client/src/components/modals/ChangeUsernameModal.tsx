import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';



const ChangeUsernameModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => setIsOpen(false);

    let ui = (
        <Dialog 
            open={isOpen} 
            onClose={handleClose}
        >
            <DialogTitle>Really change your username?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Renaming will take a few minutes to complete
                </DialogContentText>
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
            </DialogContent>
            <DialogActions>
                    <Button
                        type="submit"
                        sx={{ mt: 4 }}>
                        Change my username
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

export default ChangeUsernameModal