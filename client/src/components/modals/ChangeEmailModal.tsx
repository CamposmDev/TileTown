import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import { AuthContext } from '../../context/auth';
import { SLIDE_DOWN_TRANSITION } from '../util/Constants';


const ChangeEmailModal = () => {
    const auth = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => setIsOpen(false);

    const changeEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        let email: string | undefined = formData.get('email')?.toString()
        auth.changeEmail(email)
        handleClose()
    }

    let ui = (
        <Dialog 
            open={isOpen} 
            onClose={handleClose}
            TransitionComponent={SLIDE_DOWN_TRANSITION}
            >
            <DialogTitle>Really change your email?</DialogTitle>
            <Box component={'form'} onSubmit={changeEmail}>
                <DialogContent>
                    <DialogContentText>
                        Renaming may take a few minutes to complete
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

export default ChangeEmailModal