import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Typography from '@mui/material/Typography';
import { Icon, Modal } from '@mui/material';
import { useState } from 'react';



const CommunityMembersModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => setIsOpen(true);
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
      };

    let ui = (
        <Modal 
            open={isOpen} 
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style} textAlign='center'>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    RPGs Done Right Members
                </Typography>
                <Avatar sx={{ bgcolor: 'secondary.main', justifyItems: 'center', margin: 'auto'}}>
                    <Icon ><PeopleAltIcon /></Icon>
                </Avatar>
            </Box>
            
        </Modal>
    )
    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)}>Community Members Modal</Button>
            {ui}
        </>
    )
}

export default CommunityMembersModal