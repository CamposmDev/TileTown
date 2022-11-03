import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Modal } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import {  MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';



interface Props {
    callback?: Function
}

const CreateContestModal = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => setIsOpen(false);

    let ui = (
        <Dialog 
            open={isOpen} 
            onClose={handleClose}
        >
            <DialogTitle>Create Contest</DialogTitle>
                <DialogContent>
                <TextField
                    variant='outlined'
                    margin='dense'
                    required
                    fullWidth
                    label="Name"
                    autoFocus
                />
                <TextField
                    variant='outlined'
                    margin='dense'
                    required
                    fullWidth
                    label="Description"
                    multiline
                    rows={7}
                />
                <Grid container spacing={1} margin='dense'>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            margin='normal'
                            fullWidth
                            label="Theme"
                            defaultValue="Any"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Stack component="form" noValidate spacing={3}>
                            <TextField
                                required
                                margin='normal'
                                label="Due Date"
                                type="date"
                                defaultValue="2022-12-31"
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Stack>
                    </Grid>


                </Grid>
                </DialogContent>
            <DialogActions>
                <Button
                    type="submit">
                    Create Contest
                </Button>
            </DialogActions>
        </Dialog>
    )
    return (
        <>
            <MenuItem onClick={() => {
                setIsOpen(!isOpen)
            }}
            >Create Contest</MenuItem>
            {ui}
        </>
    )

}

export default CreateContestModal