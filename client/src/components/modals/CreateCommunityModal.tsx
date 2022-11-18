import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { SLIDE_DOWN_TRANSITION } from '../util/Constants';
import { SnackContext } from 'src/context/snack';
import { SocialContext } from 'src/context/social';
import { ModalContext } from 'src/context/modal';
import { AuthContext } from 'src/context/auth';

const CreateCommunityModal = () => {
    const auth = React.useContext(AuthContext)
    const modal = React.useContext(ModalContext)
    const snack = React.useContext(SnackContext)
    const social = React.useContext(SocialContext)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [vis, setVis] = useState('public')

    const handleClose = () => {
        setName('')
        setDescription('')
        setVis('public')
        modal.close()
    }
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }
    const handleChangeVisiblity = (e: any) => {
        setVis(e.target.value)
    }
    const handleCreate = () => {
        social.createCommunity(name, description, vis, auth, snack)
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
                    margin='dense'
                    onChange={handleDescChange}
                />
                <FormControl margin='dense' fullWidth>
                    <InputLabel>Visibility</InputLabel>
                        <Select
                            margin='dense'
                            label='Visibility'
                            value={vis}
                            onChange={handleChangeVisiblity}
                        >
                            <MenuItem value={'public'}>Public</MenuItem>
                            <MenuItem value={'private'}>Private</MenuItem>
                        </Select>
                    </FormControl>
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
    )

}

export default CreateCommunityModal