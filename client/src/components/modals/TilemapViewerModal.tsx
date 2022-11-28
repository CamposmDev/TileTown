import { CopyAll, Download, Star, ThumbDown, ThumbUp } from "@mui/icons-material";
import { AppBar, Button, Card, CardContent, Dialog, Grid, IconButton, ImageListItem, LinearProgress, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import AxiosApi from "src/api/axios/AxiosApi";
import { SnackContext } from "src/context/snack";
import { SocialContext } from "src/context/social";
import CommentCard from "../card/CommentCard";
import TagCard from "../card/TagCard";
import UserProfileCard from "../card/UserProfileCard";
import { SLIDE_DOWN_TRANSITION } from "../util/Constants";
import { dateToStr } from "../util/DateUtils";

/** Displays the info of a clicked tilemap social */
export default function TilemapViewerModal() {
    const social = useContext(SocialContext)
    const snack = useContext(SnackContext)
    const [commName, setCommName] = useState<string | undefined>(undefined)
    const [comment, setComment] = useState<string>('')
    const open = Boolean(social.state.currentTMS)

    useEffect(() => {
        let tms = social.state.currentTMS
        if (tms && tms.communities) {
            social.getCommunityName(tms.communities[0]).then(name => {
                if (name) setCommName(name)
            })
        } else {
            setCommName(undefined)
        }
    }, [social.state.currentTMS])

    const like = () => {
        /** Call the like tilemap social function from social */
    }

    const dislike = () => {
        /** Call the dislike tilemap social function from social */
    }

    const download = () => {
        /** Andrew help me */
    }

    const clone = () => {
        /** Andrew help me */
    }

    const favorite = () => {
        /** Hanldes favorite or unfavoriting tilemap */
    }

    const handlekeyUp = (e: React.KeyboardEvent) => {
        if (e.code === 'Enter') {
            /** Calls the comment function in social
             * Then clear the comment state
             */
            // Call function here
            setComment('')
        }
    }

    const handleClose = () => {
        /** Clear the comment state and call the clear function from social */
        social.clear()
    }

    let tms = social.state.currentTMS
    if (tms) {
        let header = (
            <AppBar position='relative'> 
                <Toolbar>
                    <Grid container alignItems='center' spacing={1}>
                        <Grid item flexGrow={1}>
                            <Typography variant="h6">{tms.name}</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={favorite}><Star/></IconButton>
                        </Grid>
                        <Grid item>
                            <Button color='inherit' onClick={handleClose}>Close</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
        let date = dateToStr(new Date(tms.publishDate))
        let imageURL = `${AxiosApi.getUri()}/media/${tms.imageURL}`
        let body = (
            <Grid container p={1} spacing={1}>
                <Grid item>
                    <Card sx={{boxShadow: 3}}>
                        <ImageListItem>
                            <img id='tile-large-preview' src={imageURL} alt={tms.id}/>
                        </ImageListItem>
                    </Card>
                </Grid>
                <Grid item flexGrow={1} xs>
                    <Grid item xs={12}>
                        <Card sx={{boxShadow: 3}}>
                            <CardContent>
                                <Grid item>
                                    <Grid item>
                                        <UserProfileCard
                                            userId={tms.owner}
                                            minimal={true}
                                        />
                                        {commName ? <Typography variant='body2'>{`Community: ${commName}`}</Typography> : <Box/>}
                                        <Typography variant='body2'>{`Published: ${date}`}</Typography>
                                        <Typography variant='body2' flexWrap={"wrap"}>{tms.description}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Box>
                                            <Tooltip title={tms.likes.length}>
                                                <IconButton onClick={like}><ThumbUp/></IconButton>
                                            </Tooltip>
                                            <Tooltip title={tms.dislikes.length}>
                                                <IconButton onClick={dislike}><ThumbDown/></IconButton>
                                            </Tooltip>
                                            <Tooltip title={'Download'}>
                                                <IconButton onClick={download}><Download/></IconButton>
                                            </Tooltip>
                                            <Tooltip title={'Clone'}>
                                                <IconButton onClick={clone}><CopyAll/></IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Grid>
                                    <Grid item container spacing={1}>
                                        {tms.tags.map(x => <Grid item key={x}><TagCard name={x} /></Grid>)}
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <TextField
                            autoFocus
                            fullWidth
                            margin='dense'
                            value={comment}
                            label='Comment'
                            onChange={(e) => setComment(e.target.value)}
                            onKeyUp={handlekeyUp}
                        />
                    </Grid>
                    <Grid item>
                        {tms.comments.slice().map(x => 
                            <Grid item xs={12} key={x}>
                                <CommentCard commentId={x} />
                            </Grid>
                        )} 
                    </Grid>
                </Grid>
            </Grid>
        )
        return (
            <Dialog open={Boolean(open)} fullScreen onClose={handleClose} TransitionComponent={SLIDE_DOWN_TRANSITION}>
                {header}
                {body}
            </Dialog>
        )
    }
    return <Dialog open={Boolean(open)} fullScreen onClose={handleClose} TransitionComponent={SLIDE_DOWN_TRANSITION}>
            <AppBar><Toolbar/></AppBar>
            <LinearProgress/>
        </Dialog>
}