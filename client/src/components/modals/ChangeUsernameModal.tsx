import Button from '@mui/material/Button';
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import { AuthContext } from '../../context/auth';
import { SLIDE_DOWN_TRANSITION } from '../util/Constants';
import { SnackContext } from 'src/context/snack';

const ChangeUsernameModal = () => {
    const auth = useContext(AuthContext)
    const snack = useContext(SnackContext)
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => setIsOpen(false);

    const changeUsername = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        let username: string | undefined = formData.get('username')?.toString()
        auth.changeUsername(username, snack)
        handleClose()
    }

    let ui = (
        <Dialog 
            open={isOpen} 
            onClose={handleClose}
            TransitionComponent={SLIDE_DOWN_TRANSITION}
        >
            <DialogTitle>Really change your username?</DialogTitle>
            <Box component={'form'} onSubmit={changeUsername}>
                <DialogContent>
                    <DialogContentText>
                        Renaming may take a few minutes to complete
                    </DialogContentText>
                    <TextField
                        variant='outlined'
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="New Username"
                        name="username"
                        autoFocus
                    />
                </DialogContent>
            </Box>
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