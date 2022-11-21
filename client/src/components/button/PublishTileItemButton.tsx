import { Publish, Send } from "@mui/icons-material"
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "src/context/auth"
import { ProfileContext } from "src/context/profile"
import { SocialContext } from "src/context/social"
import { SLIDE_DOWN_TRANSITION } from "../util/Constants"

interface Props {
    id: string,
    name: string
}

const PublishTileItemButton = (props: Props) => {
    const prof = useContext(ProfileContext)
    const auth = useContext(AuthContext)
    const social = useContext(SocialContext)
    const [open, setOpen] = useState(false)
    const [desc, setDesc] = useState('')
    const [options, setOptions] = useState<string[]>([])
    const [commOption, setCommOption] = useState('')

    useEffect(() => {
        let usr = auth.getUsr()
        if (usr) {
            social.getCommunityNames(usr.joinedCommunities).then(arr => {
                setOptions(arr)
            })
        }
    }, [])

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const publish = () => {
        social.publishTileset(props.id, desc, commOption, [], [])
        prof.viewPublishedTilesets()
        handleClose()
    }

    const cancel = () => {
        setDesc('')
        setCommOption('')
        handleClose()
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
                                options={options}
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