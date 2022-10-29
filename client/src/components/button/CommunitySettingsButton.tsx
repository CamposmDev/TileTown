import { Edit, Settings } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import UserProfileCard from "../card/UserProfileCard"

interface Props {
    title: string,
    desc: string,
    members: {firstName: string, lastName: string, username: string}[]
    visibility: string
}

const CommunitySettingsButton = (props: Props) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [title, setTitle] = useState(props.title)
    const [vis, setVis] = useState(props.visibility);
    const [desc, setDesc] = useState(props.desc)

    const handleChange = (event: SelectChangeEvent) => {
        setVis(event.target.value as string)
    }

    const handleTitleChange = (e: any) => {
        setTitle(e.target.value as string)
    }

    const handleDescChange = (e: any) => {
        setDesc(e.target.value as string)
    }

    const handleModalOpen = () => setModalOpen(true)
    const handleModalClose = () => setModalOpen(false)

    const visSelector = 
        <FormControl fullWidth>
            <InputLabel>Visibility</InputLabel>
                <Select
                    value={vis}
                    label="Visibility"
                    onChange={handleChange}
                >
                <MenuItem value={'Public'}>Public</MenuItem>
                <MenuItem value={'Private'}>Private</MenuItem>
            </Select>
        </FormControl>

    const modal = 
        <Dialog open={modalOpen} onClose={handleModalClose}>
            <DialogTitle>Community Settings</DialogTitle>
            <Grid p={1}>
                <Grid item mt={1}>
                    <TextField fullWidth value={title} onChange={handleTitleChange} label='Community Name'/>
                </Grid>
                <Grid item mt={1}>
                    <TextField fullWidth value={desc} onChange={handleDescChange} label='Description'/>
                </Grid>
                <Grid item mt={1}>
                    <Typography>Moderators</Typography> 
                    <Grid sx={{height: 200, overflow: 'auto'}}>
                        {props.members.map((x,i) => 
                            <Grid key={x.username + i} mt={0.5}><UserProfileCard
                                firstName={x.firstName} 
                                lastName={x.lastName}
                                username={x.username}
                            /></Grid>)}
                    </Grid>
                </Grid>
                <Grid item mt={2}>{visSelector}</Grid>
                <Grid item mt={1}>
                    <Stack>
                        <Button variant='contained' color='error'>Delete Community</Button>
                    </Stack>
                </Grid>
            </Grid>
            <DialogContent>
                <DialogActions> 
                    <Stack direction='row' spacing={1}>
                    <Button variant='contained' onClick={handleModalClose} color='error'>Discard Changes</Button>
                    <Button variant='contained'>Save Changes</Button>
                    </Stack>
                    
                </DialogActions>
            </DialogContent>
        </Dialog>

    return (
        <div>
            <IconButton onClick={handleModalOpen} children={<Settings/>}/>
            {modal}
        </div>
    )
}

export default CommunitySettingsButton