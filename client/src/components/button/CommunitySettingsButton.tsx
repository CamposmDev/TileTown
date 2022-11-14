import { Settings } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { useState } from "react"
import UserProfileCard from "../card/UserProfileCard"
import { SLIDE_DOWN_TRANSITION } from "../util/Constants"

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
        <FormControl fullWidth margin="dense">
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
        <Dialog open={modalOpen} onClose={handleModalClose} TransitionComponent={SLIDE_DOWN_TRANSITION}>
            <DialogTitle>Community Settings</DialogTitle>
            <DialogContent>
                <Grid container alignItems={'center'}>
                    <Grid mr={1} width={256}>
                        <Grid>
                            <TextField fullWidth value={title} onChange={handleTitleChange} label='Community Name' margin='dense'/>
                        </Grid>
                        <Grid>
                            <TextField fullWidth value={desc} onChange={handleDescChange} label='Description' margin='dense'/>
                        </Grid>
                        <Grid>
                            {visSelector}
                        </Grid>
                        <Grid>
                            <Button fullWidth variant='outlined' color='error'>Delete Community</Button>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Typography>Moderators</Typography> 
                        <Grid item sx={{height: 253, overflow: 'auto'}}>
                            {props.members.map((x,i) => 
                            <Grid key={x.username + i} mt={0.5}>
                                <UserProfileCard
                                    userId={''}
                                    firstName={x.firstName} 
                                    lastName={x.lastName}
                                    username={x.username}
                                />
                            </Grid>)}
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions> 
                <Button>Save Changes</Button>
            </DialogActions>
        </Dialog>

    return (
        <div>
            <IconButton onClick={handleModalOpen} children={<Settings/>}/>
            {modal}
        </div>
    )
}

export default CommunitySettingsButton