import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ButtonGroup, ClickAwayListener, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, Grow, IconButton, InputLabel, MenuList, Modal, Paper, Popper, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import {  MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import { ArrowDropDown, Create } from '@mui/icons-material';
import { AuthContext } from 'src/context/auth';

// const options = ['Annonymous', 'Your username'];

const CreateForumPostModal = () => {
    const auth = React.useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const [author, setAuthor] = useState('Annonymous')

    const handleChange = (event: SelectChangeEvent) => {
        setAuthor(event.target.value as string)
    }
    const handleClose = () => setIsOpen(false);
    const handlePost = () => {
        throw new Error("Not Yet Implemented")
        handleClose()
    }
    let ui = (
        <Dialog 
            open={isOpen} 
            onClose={handleClose}
        >
            <DialogTitle>Create Post</DialogTitle>
            <DialogContent>
                <Box>
                    <TextField
                        variant='outlined'
                        margin="dense"
                        required
                        fullWidth
                        label="Title"
                        name="forumTitle"
                        autoComplete="forumTitle"
                        autoFocus
                    />
                    <TextField
                        variant='outlined'
                        margin="dense"
                        required
                        fullWidth
                        label="Write your question here"
                        name="question"
                        autoFocus
                        multiline
                        rows={7}
                    />
                    <FormControl margin='dense' fullWidth>
                    <InputLabel>Show my name as</InputLabel>
                        <Select
                            label='Show my name as'
                            value={author}
                            onChange={handleChange}
                        >
                            <MenuItem value={'Annonymous'}>Annonymous</MenuItem>
                            <MenuItem value={'Your username'}>Your username</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handlePost}>Post</Button>
            </DialogActions>
        </Dialog>
    )
    return (
        <>
            <IconButton disabled={auth.isGuest()} onClick={() => setIsOpen(!isOpen)}><Create/></IconButton>
            {ui}
        </>
    )

}

export default CreateForumPostModal