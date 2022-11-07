import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Dialog, DialogContent, DialogTitle, Grid, Icon, IconButton, InputBase, Modal, Stack } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Book } from '@mui/icons-material';


const InviteCollaboratorsModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => setIsOpen(false);

    let ui = (
        <Dialog 
            open={isOpen} 
            onClose={handleClose}
        >
            <Box textAlign='center' mt={1} mb={1} ml={2} mr={2}>
                <Avatar sx={{ bgcolor: 'secondary.main', justifyItems: 'center', margin: 'auto'}}>
                    <Icon><Book/></Icon>
                </Avatar>
                <Typography sx={{fontWeight: 'bold'}} variant="h6" component="h2">
                  Invite a Collaborator
                </Typography>
                <TextField
                    sx={{width: 352}}
                    margin='normal'
                    fullWidth
                    label='Search by username or email'
                />
            </Box>
            <Box textAlign={'center'}>
                <Button>
                    Invite
                </Button>
            </Box>
        </Dialog>
    )
    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)}>Invite Collaborators Modal</Button>
            {ui}
        </>
    )
}

export default InviteCollaboratorsModal