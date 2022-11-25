import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Typography from '@mui/material/Typography';
import { Dialog, DialogContent, Drawer, Grid, Icon, IconButton, Modal } from '@mui/material';
import { useContext, useState } from 'react';
import { Group } from '@mui/icons-material';
import UserProfileCard from '../card/UserProfileCard';
import { SLIDE_DOWN_TRANSITION } from '../util/Constants';
import { CommunityContext } from 'src/context/social/community';



const CommunityMembersModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const cc = useContext(CommunityContext)
    const handleClose = () => setIsOpen(false);
    let comm = cc.getCurrentCommunity()
    let members: JSX.Element[] | undefined = undefined
    if (comm)
        members = comm.members.map(x => <Grid item><UserProfileCard userId={x} /></Grid>)
    let ui = (
        <Drawer 
            open={isOpen} 
            onClose={handleClose}
            anchor={'right'}
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
                    {members}
                </Grid>        
            </Box>
            </DialogContent>
            
        </Drawer>
    )
    return (
        <>
            <IconButton onClick={() => setIsOpen(!isOpen)}><Group/></IconButton>
            {ui}
        </>
    )
}

export default CommunityMembersModal