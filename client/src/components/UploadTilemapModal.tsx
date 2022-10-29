import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ButtonGroup, ClickAwayListener, Grid, Grow, InputAdornment, MenuList, Modal, Paper, Popper } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import {  MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import { ArrowDropDown } from '@mui/icons-material';
import UploadIcon from '@mui/icons-material/Upload';

const UploadTilemapModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handeCloseButton = (event: Event) => {
        if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
        ) {
        return;
        }

        setOpen(false);
    };
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
                <Typography id="modal-modal-title" variant="h6" component="h2">
                 Upload Tilemap
                </Typography>

                <Grid>
                    <TextField
                        variant='outlined'
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Tilemap Name"
                        name="Tilemap Name"
                        autoFocus
                    />
                    <TextField
                        variant='outlined'
                        margin="normal"
                        required
                        fullWidth
                        id="width"
                        label="Width"
                        name="width"
                        autoComplete="width"
                        autoFocus
                    />
                    <TextField
                        variant='outlined'
                        margin="normal"
                        required
                        fullWidth
                        id="height"
                        label="Height"
                        name="height"
                        autoComplete="height"
                        autoFocus
                    />
                    <Stack direction='row' alignItems={"center"} spacing={1}>
                        <TextField
                            variant='outlined'
                            margin="normal"
                            required
                            fullWidth
                            id="source"
                            label="Source"
                            name="source"
                            autoComplete="source"
                            autoFocus
                            disabled
                            InputProps={{
                                endAdornment: <InputAdornment position="start">JSON</InputAdornment>
                            }}
                        />
                        <Button variant="contained">Browser</Button>
                    </Stack>
                </Grid>
                
                <Grid container direction='column' alignItems='center' mt={1}>
                    <Stack direction='row' spacing={1}>
                        <Button  
                            startIcon={<UploadIcon />}
                            variant="contained"
                        >
                            Upload
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
            <Button onClick={() => setIsOpen(!isOpen)}>Upload Tilemap Modal</Button>
            {ui}
        </>
    )

}

export default UploadTilemapModal