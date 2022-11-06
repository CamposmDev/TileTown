import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import {  MenuItem } from '@mui/material';
import { SLIDE_DOWN_TRANSITION } from '../util/Constants';


const CreateCommunityModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => {
        setComm({name: '', desc: ''})
        setIsOpen(false)
    }
    const [comm, setComm] = useState({
        name: '',
        desc: ''
    })
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComm({
            name: e.target.value,
            desc: comm.desc
        })
    }
    const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComm({
            name: comm.name,
            desc: e.target.value
        })
    }
    const handleCreate = () => {
        throw new Error('Not Yet Implemented')
    }

    let btDisabled = true
    if (comm.name && comm.desc) {
        btDisabled = false
    }

    let ui = (
        <Dialog 
            open={isOpen} 
            onClose={handleClose}
            TransitionComponent={SLIDE_DOWN_TRANSITION}
        >
            <DialogTitle>Create Community</DialogTitle>
            <DialogContent>
                <DialogContentText></DialogContentText>
                <TextField
                    required
                    fullWidth
                    label="Name"
                    autoFocus
                    margin='dense'
                    onChange={handleNameChange}
                />
                <TextField
                    required
                    fullWidth
                    label="Description"
                    multiline
                    rows={5}
                    margin='dense'
                    onChange={handleDescChange}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCreate}
                    disabled={btDisabled}
                    type="submit"
                    sx={{ mt: 4 }}>
                    Create Community
                </Button>
            </DialogActions>
        </Dialog>
    )
    return (
        <>
            <MenuItem onClick={() => setIsOpen(true)}>Create Community</MenuItem>
            {ui}
        </>
    )

}

export default CreateCommunityModal