import { CopyAll, Download, Star, ThumbDown, ThumbUp, Visibility } from "@mui/icons-material";
import { AppBar, Button, Card, CardContent, Dialog, Grid, IconButton, ImageListItem, LinearProgress, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import AxiosApi from "src/api/axios/AxiosApi";
import { AuthContext } from "src/context/auth";
import { SnackContext } from "src/context/snack";
import { SocialContext } from "src/context/social";
import CommentCard from "../card/CommentCard";
import TagCard from "../card/TagCard";
import UserProfileCard from "../card/UserProfileCard";
import { SLIDE_DOWN_TRANSITION } from "../util/Constants";
import { dateToStr } from "../util/DateUtils";
import { formatToSocialStr } from "../util/NumberUtils";

function containsTMS(arr: string[], id: string): boolean {
    let i = arr.indexOf(id)
    return Boolean(i !== -1)
}

/** Displays the info of a clicked tilemap social */
export default function TilemapViewerModal() {
    const auth = useContext(AuthContext)
    const social = useContext(SocialContext)
    const snack = useContext(SnackContext)
    const [commName, setCommName] = useState<string | null>(null)
    const [contestName, setContestName] = useState<string | null>(null)
    const [comment, setComment] = useState<string>('')
    const open = Boolean(social.state.currentTMS)

    useEffect(() => {
        let tms = social.state.currentTMS
        if (tms && tms.community) {
            social.getCommunityName(tms.community).then(name => {
                if (name) setCommName(name)
            })
        }
        if (tms && tms.contest) {
            social.getContestNameById(tms.contest).then(name => {
                if (name) setContestName(name)
            })
        }
    }, [social, auth])

    const like = () => {
        /** Call the like tilemap social function from social */
        social.likeTMS()
    }

    const dislike = () => {
        /** Call the dislike tilemap social function from social */
        social.dislikeTMS()
    }

    const download = () => {
        const link = document.createElement('a')
        if (!tms) return
        link.download = tms.name
        link.href = `${window.location.protocol}//${window.location.hostname}:3000/api/tilemap/download/tiled/${tms.tileMap}`;
        link.click()
    }

    const favorite = () => {
        /** Handles favorite or unfavoriting tilemap */
        let usr = auth.usr
        if (!tms || !usr) return
        if (containsTMS(usr.favoriteTileMaps, tms.id)) {
            social.unfavoriteTMS(tms.id, snack).then(usr => {
                if (usr) {
                    auth.refreshUser(usr)
                }
            })
        } else {
            social.favoriteTMS(tms.id, snack).then(usr => {
                if (usr) {
                    auth.refreshUser(usr)
                }
            })
        }
    }

    const handlekeyUp = (e: React.KeyboardEvent) => {
        if (e.code === 'Enter') {
            /** Calls the comment function in social
             * Then clear the comment state
             */
            // Call function here
            social.commentTMS(comment, snack)
            setComment('')
        }
    }

    const handleClose = () => {
        /** Clear the comment state and call the clear function from social */
        social.clear()
    }

    let usr = auth.usr
    let tms = social.state.currentTMS
    if (tms) {
        let starSX = {}
        if (usr && containsTMS(usr.favoriteTileMaps, tms.id)) {
            starSX = {color: 'gold'}
        }
        let header = (
            <AppBar position='relative'> 
                <Toolbar>
                    <Grid container alignItems='center' spacing={1}>
                        <Grid item flexGrow={1}>
                            <Typography variant="h6">{tms.name}</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={favorite}><Star sx={starSX} /></IconButton>
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
                                        {contestName ? <Typography variant='body2'>{`Contest: ${contestName}`}</Typography>: <Box/>}
                                        <Typography variant='body2'>{`Published: ${date}`}</Typography>
                                        <Typography variant='body2' flexWrap={"wrap"}>{tms.description}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Box>
                                            <Tooltip title='Views'>
                                                <IconButton disableFocusRipple disableRipple sx={{cursor: 'default'}}><Visibility/></IconButton>
                                            </Tooltip>
                                            {formatToSocialStr(tms.views)}
                                            <Tooltip title={'Like'}>
                                                <IconButton disabled={auth.isGuest()} onClick={like}><ThumbUp/></IconButton>
                                            </Tooltip>
                                            {formatToSocialStr(tms.likes.length)}
                                            <Tooltip title={'Dislike'}>
                                                <IconButton disabled={auth.isGuest()} onClick={dislike}><ThumbDown/></IconButton>
                                            </Tooltip>
                                            {formatToSocialStr(tms.dislikes.length)}
                                            <Tooltip title={'Download'}>
                                                <IconButton onClick={download}><Download/></IconButton>
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