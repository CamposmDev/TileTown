import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid, Modal } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import {  MenuItem } from '@mui/material';





const CreateCommunityModal = () => {
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

                <Typography sx={{fontWeight: 'bold'}} id="modal-modal-title" variant="h6" component="h2">
                 Create Community
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

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 4 }}>
                    Create Community
                </Button>


            </Box>
            
        </Modal>
    )
    return (
        <>
            <MenuItem onClick={() => setIsOpen(!isOpen)}>Create Comunity</MenuItem>
            {ui}
        </>
    )

}

export default CreateCommunityModal