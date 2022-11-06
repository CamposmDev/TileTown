import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ButtonGroup, ClickAwayListener, Dialog, DialogActions, DialogTitle, Grid, Grow, InputAdornment, MenuList, Modal, Paper, Popper } from '@mui/material';
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

    let ui = (
        <Dialog 
            open={isOpen} 
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <DialogTitle>Upload Tilemap</DialogTitle>
            <Box textAlign='center'>
                <Grid mr={2} ml={2}>
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        label="Tilemap Name"
                        name="Tilemap Name"
                        autoFocus
                    />
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        label="Width"
                        name="width"
                        autoComplete="width"
                        autoFocus
                    />
                    <TextField
                        variant='outlined'
                        margin="dense"
                        required
                        fullWidth
                        label="Height"
                        name="height"
                        autoComplete="height"
                        autoFocus
                    />
                    <Stack direction='row' alignItems={"center"} spacing={1}>
                        <TextField
                            margin="dense"
                            required
                            fullWidth
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
            </Box>
            <DialogActions>
                <Button startIcon={<UploadIcon />}>Upload</Button>
            </DialogActions>
        </Dialog>
    )
    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)}>Upload Tilemap Modal</Button>
            {ui}
        </>
    )

}

export default UploadTilemapModal