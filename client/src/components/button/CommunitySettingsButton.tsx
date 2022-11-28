import { Settings } from "@mui/icons-material"
import { Box, Button, DialogActions, DialogContent, DialogTitle, Drawer, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { SnackContext } from "src/context/snack"
import { CommunityContext } from "src/context/social/community"
import UserProfileCard from "../card/UserProfileCard"

const CommunitySettingsButton = () => {
    const comm = useContext(CommunityContext)
    const snack = useContext(SnackContext)
    const [open, setOpen] = useState(false)
    const [name, setName] = useState<string>(comm.currCommunity?.name as string)
    const [desc, setDesc] = useState<string>(comm.currCommunity?.description as string)
    const [vis, setVis] = useState<string>(comm.currCommunity?.visibility as string)

    const handleChange = (event: SelectChangeEvent) => {
        setVis(event.target.value as string)
    }

    const handleTitleChange = (e: any) => {
        setName(e.target.value as string)
    }

    const handleDescChange = (e: any) => {
        setDesc(e.target.value as string)
    }

    const handleDelete = () => {
        /** Show confirm delete modal */
        handleModalClose()
    }

    const handleUpdate = () => {
        comm.updateCurrentCommunity(name, desc, vis, snack)
        handleModalClose()
    }

    const handleModalOpen = () => {
        setName(comm.currCommunity?.name as string)
        setDesc(comm.currCommunity?.description as string)
        setVis(comm.currCommunity?.visibility as string)
        setOpen(true)
    }
    const handleModalClose = () => {
        setOpen(false)
    }

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
    let c = comm.currCommunity
    let moderators: JSX.Element | JSX.Element[] = <Typography>None</Typography>
    if (c) {
        moderators = c.members.map(x =>
            <Grid item xs={12}>
                <UserProfileCard userId={x} />
            </Grid>
        )
    }
    const modal = 
        <Drawer open={open} onClose={handleModalClose} anchor='right'>
            <DialogTitle>Community Settings</DialogTitle>
            <DialogContent>
                <Stack>
                    <TextField value={name} onChange={handleTitleChange} label='Community Name' margin='dense'/>
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