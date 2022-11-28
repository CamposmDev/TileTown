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
    const comm = useContext(CommunityContext)
    const [isOpen, setIsOpen] = useState(false)
    const cc = useContext(CommunityContext)
    const handleClose = () => setIsOpen(false);
    let c = comm.currCommunity
    let members: JSX.Element | JSX.Element[] = <div/>
    if (c) {
        members = c.members.map(x =>
            <Grid container item>
                <UserProfileCard userId={x} />
            </Grid>
        )
    }
    let ui = (
        <Drawer 
            open={isOpen} 
            onClose={handleClose}
            anchor='right'
        >
            <DialogContent>
            <Box>
                <Typography variant="h6">Members</Typography>
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