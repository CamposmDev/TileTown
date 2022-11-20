import { Settings } from "@mui/icons-material"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { CommunityContext } from "src/context/social/community"
import UserProfileCard from "../card/UserProfileCard"

const CommunitySettingsButton = () => {
    const comm = useContext(CommunityContext)
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState(comm.getCurrentCommunity()?.name)
    const [vis, setVis] = useState(comm.getCurrentCommunity()?.visibility);
    const [desc, setDesc] = useState(comm.getCurrentCommunity()?.description)

    const handleChange = (event: SelectChangeEvent) => {
        setVis(event.target.value as string)
    }

    const handleTitleChange = (e: any) => {
        setTitle(e.target.value as string)
    }

    const handleDescChange = (e: any) => {
        setDesc(e.target.value as string)
    }

    const handleDelete = () => {
        handleModalClose()
    }

    const handleUpdate = () => {
        handleModalClose()
    }

    const handleModalOpen = () => setOpen(true)
    const handleModalClose = () => setOpen(false)

    let visSelector = 
        <FormControl margin="dense">
            <InputLabel>Visibility</InputLabel>
                <Select
                    value={vis}
                    label="Visibility"
                    onChange={handleChange}
                >
                    <MenuItem value={'public'}>Public</MenuItem>
                    <MenuItem value={'private'}>Private</MenuItem>
                </Select>
        </FormControl>
    let c = comm.getCurrentCommunity()
    let moderators: JSX.Element | JSX.Element[] = <Typography>None</Typography>
    if (c) {
        moderators = c.members.map(x =>
            <Grid item xs={12}>
                <UserProfileCard userId={x} firstName='' lastName='' username='' />
            </Grid>
        )
    }
    const modal = 
        <Drawer open={open} onClose={handleModalClose} anchor='right'>
            <DialogTitle>Community Settings</DialogTitle>
            <DialogContent>
                <Stack>
                    <TextField value={title} onChange={handleTitleChange} label='Community Name' margin='dense'/>
                    <TextField value={desc} onChange={handleDescChange} label='Description' margin='dense'/>
                    {visSelector}
                </Stack>
                <Typography>Moderators</Typography> 
                <Grid container sx={{height: '300px', overflow: 'auto'}}>
                    {moderators}
                </Grid>
            </DialogContent>
            <DialogActions> 
                <Button color='error' onClick={handleDelete}>Delete Community</Button>
                <Button onClick={handleUpdate}>Save Changes</Button>
            </DialogActions>
        </Drawer>

    return (
        <Box>
            <IconButton onClick={handleModalOpen} children={<Settings/>}/>
            {modal}
        </Box>
    )
}

export default CommunitySettingsButton