import { Publish, Send } from "@mui/icons-material"
import { Autocomplete, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputAdornment, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "src/context/auth"
import { ProfileContext } from "src/context/profile"
import { SnackContext } from "src/context/snack"
import { SocialContext } from "src/context/social"
import { DESC_CHAR_LIMIT, SLIDE_DOWN_TRANSITION, TAG_CHAR_LIMIT, TAG_LIMIT } from "../util/Constants"

export default function PublishTilemapButton(props: {id: string, name: string}) {
    const prof = useContext(ProfileContext)
    const auth = useContext(AuthContext)
    const social = useContext(SocialContext)
    const snack = useContext(SnackContext)
    const [open, setOpen] = useState(false)
    const [desc, setDesc] = useState('')
    const [options, setOptions] = useState<string[]>([])
    const [commOption, setCommOption] = useState('')
    const [tag, setTag] = useState<string>('')
    const [tags, setTags] = useState<string[]>([])

    useEffect(() => {
        let usr = auth.usr
        if (usr) {
            social.getCommunityNames(usr.joinedCommunities).then(arr => {
                setOptions(arr)
            })
        }
    }, [])

    const handleOpen = () => setOpen(true)

    const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(e.target.value)
    }

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.target.value = e.target.value.toLowerCase()
        setTag(e.target.value)
    }

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.code === 'Enter') {
            /** If the user presses enter, then try to 
             * add the tag to the tags array. 
             */
            addTag()
        }
    }

    const addTag = () => {
        if (tags.length >= TAG_LIMIT) {
            snack.showErrorMessage(`You've reached the maxmimum amount of tags you can have!`)
            return
        }
        if (tag) {
            if (tag.length > TAG_CHAR_LIMIT) {
                snack.showErrorMessage(`You're tag can't be more than ${TAG_CHAR_LIMIT} characters!`)
                return
            }
            if (tags.indexOf(tag) === -1) {
                tags.push(tag)
                setTags(tags)
                setTag('')
            } else {
                snack.showErrorMessage('You already have that tag added!')
            }
        } else {
            snack.showErrorMessage('Tag can\'t be empty!')
        }
    }

    const deleteTag = (i: number) => {
        let arr = tags.filter((x,idx) => idx !== i)
        setTags(arr)
    }

    const handleClose = () => {
        setDesc('')
        setCommOption('')
        setTag('')
        setTags([])
        setOpen(false)
    }

    const publish = () => {
        social.publishTilemap(props.id, desc, commOption, [], tags, snack)
        prof.viewPublishedTilesets(auth.usr?.id)
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
                                autoFocus
                                required
                                fullWidth
                                label='Description'
                                margin="dense"
                                value={desc}
                                onChange={handleDescChange}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{`${(DESC_CHAR_LIMIT - desc.length)}`}</InputAdornment>
                                }}
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
                                        label='Optional: Community' 
                                        value={commOption}
                                />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Optional: Tag (Press 'Enter' to add your tag)"
                                margin='dense'
                                value={tag}
                                onChange={handleTagChange}
                                onKeyDown={handleTagKeyDown}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{`${(TAG_CHAR_LIMIT - tag.length)}`}</InputAdornment>
                                }}
                            />
                        </Grid>
                        <Grid container item alignItems={'center'} spacing={1}>
                            {tags.map((x,i) => <Grid item key={x}><Chip label={x} variant={'outlined'} onDelete={() => deleteTag(i)}/></Grid>)}
                        </Grid>
                    </Grid>
            </DialogContent>
            <DialogActions>
                    <Button disabled={dis} onClick={publish} startIcon={<Send />}>Publish</Button>
                    <Button onClick={handleClose}>Cancel</Button>
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