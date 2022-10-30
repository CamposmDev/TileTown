import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid, Modal } from '@mui/material';
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
        
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 1,
        p: 4,
        borderRadius: 2

      };

    let ui = (
        <Modal 
            open={isOpen} 
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style} textAlign='center'>

                <Typography id="modal-modal-title" variant="h6">
                 Create Contest
                </Typography>
        
                <TextField
                    variant='outlined'
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                />
                <Grid >
                    <TextField
                        variant='outlined'
                        margin="normal"
                        required
                        fullWidth
                        id="discription"
                        label="Discription"
                        name="discription"
                        autoFocus
                        multiline
                        rows={7}
                    />
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="theme"
                            label="Theme"
                            name="theme"
                            autoComplete="theme"
                            defaultValue="Any"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Stack component="form" noValidate spacing={3}>
                            <TextField
                                id="dueDate"
                                label="Due Date"
                                type="date"
                                defaultValue="2022-12-31"
                                sx={{ width: 220 }}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Stack>
                    </Grid>


                </Grid>

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 4 }}>
                    Create Contest
                </Button>

            </Box>
            
        </Modal>
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