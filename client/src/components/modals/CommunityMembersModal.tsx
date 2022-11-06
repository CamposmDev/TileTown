import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Typography from '@mui/material/Typography';
import { Dialog, DialogContent, Grid, Icon, IconButton, Modal } from '@mui/material';
import { useState } from 'react';
import { Group } from '@mui/icons-material';
import UserProfileCard from '../card/UserProfileCard';
import { SLIDE_DOWN_TRANSITION } from '../util/Constants';



const CommunityMembersModal = () => {
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
        <Dialog 
            open={isOpen} 
            onClose={handleClose}
            TransitionComponent={SLIDE_DOWN_TRANSITION}
            >
            <DialogContent>
            <Box>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    RPGs Done Right Members
                </Typography>
                <Avatar sx={{ bgcolor: 'secondary.main', justifyItems: 'center', margin: 'auto'}}>
                    <Icon ><PeopleAltIcon /></Icon>
                </Avatar>
                <Grid sx={{height: '500px', overflow: 'auto', mt: 1}} spacing={1}>
                {[1,1,1,1,,1,1,1,1,1,1,1].map((x,i) => 
                    <Grid item mt={1}>
                        <UserProfileCard
                        firstName='Michael'
                        lastName="Campos"
                        username="Camposm"
                    />
                    </Grid>
                )}
                </Grid>        
            </Box>
            </DialogContent>
            
        </Dialog>
    )
    return (
        <>
            <IconButton onClick={() => setIsOpen(!isOpen)}><Group/></IconButton>
            {ui}
        </>
    )
}

export default CommunityMembersModal