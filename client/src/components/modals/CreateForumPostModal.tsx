import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, Select, SelectChangeEvent, Tooltip } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import {  MenuItem } from '@mui/material';
import * as React from 'react';
import { Create } from '@mui/icons-material';
import { AuthContext } from '../../context/auth';
import { ForumApi } from '../../api';
import axios, { Axios } from 'axios';
import { SnackContext } from 'src/context/snack';

const CreateForumPostModal = () => {
    const auth = React.useContext(AuthContext)
    const snack = React.useContext(SnackContext)
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [question, setQuestion] = useState('')
    // const [author, setAuthor] = useState('Annonymous')

    // const handleChange = (event: SelectChangeEvent) => {
    //     setAuthor(event.target.value as string)
    // }
    const handleClose = () => {
        setTitle('')
        setQuestion('')
        setIsOpen(false)
    }
    const handlePost = async () => {
        let res = ForumApi.createForum({forumPost: {title: title, body: question}})
        res.then((res) => {
            if (res.status === 201) {
                snack.showSuccessMessage(res.data.message)
                handleClose()
            }
        }).catch((e) => {
            if (axios.isAxiosError(e)) {
                if (e.response) snack.showErrorMessage(e.response.data.message)
            }
        })
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
                        onChange={(e) => setTitle(e.target.value)}
                        label="Title"
                        name="forumTitle"
                        autoFocus
                    />
                    <TextField
                        variant='outlined'
                        margin="dense"
                        required
                        fullWidth
                        onChange={(e) => setQuestion(e.target.value)}
                        label="Write your question here"
                        name="question"
                        autoFocus
                        multiline
                        rows={7}
                    />
                    {/* <FormControl margin='dense' fullWidth>
                    <InputLabel>Show my name as</InputLabel>
                        <Select
                            label='Show my name as'
                            value={author}
                            onChange={handleChange}
                        >
                            <MenuItem value={'Annonymous'}>Annonymous</MenuItem>
                            <MenuItem value={'Your username'}>Your username</MenuItem>
                        </Select>
                    </FormControl> */}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handlePost}>Post</Button>
            </DialogActions>
        </Dialog>
    )
    return (
        <>
            <Tooltip title={'Create Post'}>
             <IconButton disabled={auth.isGuest()} onClick={() => setIsOpen(!isOpen)}><Create/></IconButton>
            </Tooltip>
            {ui}
        </>
    )

}

export default CreateForumPostModal