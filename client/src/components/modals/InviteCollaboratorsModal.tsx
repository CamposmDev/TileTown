import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid, IconButton, InputBase, Modal, Stack } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';


const InviteCollaboratorsModal = () => {
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
                  Choose Collaborators
                </Typography>

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                    placeholder="Search by username"
                    inputProps={{ 'aria-label': 'search uername' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>

      
            <Grid container direction='column' alignItems='center'>
                <Stack direction='row' spacing={1}>
                    <Button
                        variant="contained"
                    >
                        Add
                    </Button>
                    <Button
                            style={{  
                            backgroundColor: "#808080",
                        }} 
                        variant="contained"
                        >
                        Cancel
                    </Button>
                </Stack>
            </Grid>
            </Box>
            
        </Modal>
    )
    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)}>Invite Collaborators Modal</Button>
            {ui}
        </>
    )
}

export default InviteCollaboratorsModal