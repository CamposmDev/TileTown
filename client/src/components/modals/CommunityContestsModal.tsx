import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Typography from '@mui/material/Typography';
import { Dialog, DialogContent, Grid, Icon, IconButton, Modal, Stack } from '@mui/material';
import { useState } from 'react';
import ContestCard from '../card/ContestCard';
import { SLIDE_DOWN_TRANSITION } from '../util/Constants';



const CommunityContestsModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => setIsOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        bgcolor: 'background.paper',
        boxShadow: 1,
        p: 4,
        borderRadius: 1

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
                    RPGs Done Right Contests
                </Typography>
                <Avatar sx={{ bgcolor: 'secondary.main', justifyItems: 'center', margin: 'auto'}}>
                    <Icon ><EmojiEventsIcon /></Icon>
                </Avatar>
                <Grid sx={{height: '500px', overflow: 'auto', mt: 1}} spacing={1}>
                    {[1,1,1,1,1,1,1,1,1,1,1,1].map((x,i) => 
                        <Grid item mt={1}>
                            <ContestCard
                                payload={{
                                    contestName: 'A New Contest',
                                    startDate: new Date(2022,10,31),
                                    endDate: new Date(2022,11,5),
                                    owner: 'Camposm',
                                    participates: (Math.random() * 100)
                                }}
                            />    
                        </Grid>)}
                </Grid>                
            </Box>
            </DialogContent>
            
            
        </Dialog>
    )
    return (
        <>
            <IconButton onClick={() => setIsOpen(!isOpen)}><EmojiEventsIcon sx={{color: 'gold'}}/></IconButton>
            {ui}
        </>
    )
}

export default CommunityContestsModal