import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Modal, Stack } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import {  MenuItem } from '@mui/material';





const CreateCommunityModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => setIsOpen(false);

    let ui = (
        <Dialog 
            open={isOpen} 
            onClose={handleClose}
        >
            <DialogTitle>Create Community</DialogTitle>
            <DialogContent>
                <DialogContentText></DialogContentText>
                <TextField
                    required
                    fullWidth
                    label="Name"
                    autoFocus
                />
                <TextField
                    required
                    fullWidth
                    label="Description"
                    multiline
                    rows={5}
                />
            </DialogContent>
            <DialogActions>
            <Button
                    type="submit"
                    sx={{ mt: 4 }}>
                    Create Community
                </Button>
            </DialogActions>
        </Dialog>
    )
    return (
        <>
            <MenuItem onClick={() => setIsOpen(!isOpen)}>Create Comunity</MenuItem>
            {ui}
        </>
    )

}

export default CreateCommunityModal