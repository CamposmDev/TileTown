import { Publish, Send } from "@mui/icons-material"
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { editableInputTypes } from "@testing-library/user-event/dist/utils"
import { useContext, useState } from "react"
import { AuthContext } from "src/context/auth"
import { SLIDE_DOWN_TRANSITION } from "../util/Constants"

interface Props {
    name: string
    callback: Function
}

const PublishTileItemButton = (props: Props) => {
    const auth = useContext(AuthContext)
    const [open, setOpen] = useState(false)
    const [desc, setDesc] = useState('')
    const [commOption, setCommOption] = useState('')

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const publish = () => {
        // props.callback(desc, [commName], [], [])
        console.log(desc)
        console.log(commOption)
        handleClose()
    }

    const cancel = () => {
        setDesc('')
        setCommOption('')
        handleClose()
    }

    let usr = auth.getUsr()
    let comms: string[] = []
    if (usr) {
        comms = usr.joinedCommunities
    }
    let dis = !(Boolean(desc))

    const modal = (
        <Dialog open={open} onClose={handleClose} TransitionComponent={SLIDE_DOWN_TRANSITION}>
            <DialogTitle>Publish</DialogTitle>
            <DialogContent>
                    <DialogContentText>
                        {'Are you sure you want to publish ' + props.name + '?'}
                    </DialogContentText>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                required
                                autoFocus
                                fullWidth
                                label='Description'
                                margin="dense"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                fullWidth
                                options={comms}
                                onChange={(e,v) => { if (v) setCommOption(v) }}
                                renderInput={(params) => 
                                    <TextField 
                                        {...params} 
                                        margin='dense' 
                                        label='Community' 
                                        value={commOption}
                                />}
                            />
                        </Grid>
                    </Grid>
            </DialogContent>
            <DialogActions>
                    <Button disabled={dis} onClick={publish} startIcon={<Send />}>Publish</Button>
                    <Button onClick={cancel}>Cancel</Button>
                </DialogActions>
        </Dialog>
    )
    return (
        <div>
            <Button startIcon={<Publish />} onClick={handleOpen} color="primary">
                Publish
              </Button>
              {modal}
        </div>
    )
}

export default PublishTileItemButton