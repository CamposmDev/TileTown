import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DialogContent, Drawer, Grid, IconButton } from '@mui/material';
import { useContext, useState } from 'react';
import { Group } from '@mui/icons-material';
import { CommunityContext } from 'src/context/social/community';
import MemberCard from '../card/MemberCard';

const CommunityMembersModal = () => {
    const comm = useContext(CommunityContext)
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => setIsOpen(false);
    let c = comm.currCommunity
    let members: JSX.Element | JSX.Element[] = <div/>
    if (c) {
        members = c.members.map(x =>
            <Grid item key={x} xs={12} mt={1}>
                <MemberCard usrId={x} key={x}/>
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
                <Typography variant="h6">Community Members</Typography>
                <Grid spacing={1}>
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