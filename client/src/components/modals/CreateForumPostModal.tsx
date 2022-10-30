import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ButtonGroup, ClickAwayListener, Grid, Grow, IconButton, MenuList, Modal, Paper, Popper } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import {  MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import { ArrowDropDown, Create } from '@mui/icons-material';

const options = ['Annonymous', 'Your username'];

const CreateForumPostModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

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
                 Create a Post
                </Typography>
        
                <Grid >
                    <TextField
                        variant='outlined'
                        margin="normal"
                        required
                        fullWidth
                        id="forumTitle"
                        label="Title"
                        name="forumTitle"
                        autoComplete="forumTitle"
                        autoFocus
                    />
                    <TextField
                        variant='outlined'
                        margin="normal"
                        required
                        fullWidth
                        id="question"
                        label="Write your question here"
                        name="question"
                        autoFocus
                        multiline
                        rows={7}
                    />
                </Grid>
                <Grid container direction='column' alignItems='center'>
                    <Stack direction='row' alignItems={'center'} spacing={1} mb={1}>
                        <Typography sx={{fontWeight: 'bold'}} id="modal-modal-title" variant="body1">
                            Show my name as
                        </Typography>
                        <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                            <Button onClick={handleClick} sx={{textTransform: 'none'}}>{options[selectedIndex]}</Button>
                                <Button
                                size="small"
                                aria-controls={open ? 'split-button-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-label="select merge strategy"
                                aria-haspopup="menu"
                                onClick={handleToggle}
                                >
                                <ArrowDropDown />
                            </Button>
                        </ButtonGroup>
                        <Popper
                            sx={{
                            zIndex: 1,
                            }}
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            transition
                            disablePortal
                        >
                            {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                <ClickAwayListener onClickAway={handeCloseButton}>
                                    <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                        key={option}
                                        disabled={index === 2}
                                        selected={index === selectedIndex}
                                        onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                        {option}
                                        </MenuItem>
                                    ))}
                                    </MenuList>
                                </ClickAwayListener>
                                </Paper>
                            </Grow>
                            )}
                        </Popper>
                    </Stack>
                </Grid>

                <Grid container direction='column' alignItems='center'>
                    <Stack direction='row' spacing={1}>
                        <Button
                            variant="contained"
                        >
                            Post
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
            <IconButton onClick={() => setIsOpen(!isOpen)}><Create/></IconButton>
            {ui}
        </>
    )

}

export default CreateForumPostModal