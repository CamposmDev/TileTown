import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItemProps } from '@mui/material';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import {  MenuItem } from '@mui/material';
import { SLIDE_DOWN_TRANSITION } from '../util/Constants';
import { SnackContext } from 'src/context/snack';
import { SocialContext } from 'src/context/social';
import { ModalContext } from 'src/context/modal';

const CreateCommunityModal = () => {
    const modal = React.useContext(ModalContext)
    const snack = React.useContext(SnackContext)
    const social = React.useContext(SocialContext)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    // const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        setName('')
        setDescription('')
        modal.close()
        // setIsOpen(false)
    }
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }
    const handleCreate = () => {
        social.createCommunity(name, description, snack)
        modal.close()
    }

    let btDisabled = true
    if (name && description) {
        btDisabled = false
    }

    let ui = (
        <Dialog 
            open={modal.getModal().showCreateCommunityModal} 
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
        <div>
            {ui}
        </div>
        // <>
        //     <MenuItem onClick={(e) => {
        //         if (props.onClick) props.onClick(e)
        //         // setIsOpen(true)
        //         modal.showCreateCommunityModal()
        //     }}>Create Community</MenuItem>
        //     {ui}
        // </>
    )

}

export default CreateCommunityModal