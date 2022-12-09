import { CopyAll, Download, Star, ThumbDown, ThumbUp, Visibility } from "@mui/icons-material";
import { AppBar, Box, Button, Card, CardContent, Dialog, Grid, Icon, IconButton, ImageListItem, LinearProgress, Skeleton, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react"
import { SnackContext } from "src/context/snack";
import { SocialContext } from "src/context/social";
import { SLIDE_DOWN_TRANSITION } from "../util/Constants";
import '../card/default.css'
import AxiosApi from "src/api/axios/AxiosApi";
import CommentCard from "../card/CommentCard";
import { dateToStr } from "../util/DateUtils";
import TagCard from "../card/TagCard";
import UserProfileCard from "../card/UserProfileCard";
import { formatToSocialStr } from "../util/NumberUtils";
import { AuthContext } from "src/context/auth";

function containsTSS(arr: string[], id: string): boolean {
    let i = arr.indexOf(id)
    return Boolean(i !== -1)
}

/** Displays the info of a clicked tileset social */
export default function TilesetViewerModal() {
    const auth = useContext(AuthContext)
    const social = useContext(SocialContext)
    const snack = useContext(SnackContext)
    const [commName, setCommName] = useState<string | null>(null)
    const [contestName, setContestName] = useState<string | null>(null)
    const [comment, setComment] = useState<string>('')
    const open = Boolean(social.state.currentTSS)

    useEffect(() => {
        let tss = social.state.currentTSS
        if (tss && tss.community) {
            social.getCommunityName(tss.community).then(name => {
                if (name) setCommName(name)
            })
        }
        if (tss && tss.contest) {
            social.getContestNameById(tss.contest).then(name => {
                if (name) setContestName(name)
            })
        }
    }, [social, auth])

    const like = () => {
        /** Call the like tileset social function from social */
        social.likeTSS(snack)
    }

    const dislike = () => {
        /** Call the dislike tileset social function from social */
        social.dislikeTSS(snack)
    }

    const favorite = () => {
        /** Call the favorite/unfavorite function to decide whether to add or remove */
        let usr = auth.usr
        if (!tss || !usr) return
        if (containsTSS(usr.favoriteTileSets, tss.id)) {
            social.unfavoriteTSS(tss.id, snack).then(usr => {
                if (usr) {
                    auth.refreshUser(usr)
                }
            })
        } else {
            social.favoriteTSS(tss.id, snack).then(usr => {
                if (usr) {
                    auth.refreshUser(usr)
                }
            })
        }
    }

    const download = () => {
        if (!tss) return
        const url = `${window.location.protocol}//${window.location.hostname}:3000/api/media/${tss.imageURL}`
        const link = document.createElement("a");
        link.target = '_blank'
        link.download = tss.name
        link.href = url
        link.click();
    }

    const handlekeyUp = (e: React.KeyboardEvent) => {
        if (e.code === 'Enter') {
            /** Calls the comment function in social
             * Then clear the comment state
             */
            social.commentTSS(comment, snack)
            setComment('')
        }
    }

    const handleClose = () => {
        /** Clear the comment state and call the clear function from social */
        social.clear()
    }

    let tss = social.state.currentTSS
    let usr = auth.usr
    if (tss) {
        let starSX = {}
        if (usr && containsTSS(usr.favoriteTileSets, tss.id)) {
            starSX = {color: 'gold'}
        }
        let header = (
            <AppBar position='relative'> 
                <Toolbar>
                    <Grid container alignItems='center' spacing={1}>
                        <Grid item flexGrow={1}>
                            <Typography variant="h6">{tss.name}</Typography>
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
        let date = dateToStr(new Date(tss.publishDate))
        let imageURL = `${AxiosApi.getUri()}/media/${tss.imageURL}`
        let body = (
            <Grid container p={1} spacing={1}>
                <Grid item>
                    <Card sx={{boxShadow: 3}}>
                        <ImageListItem>
                            <img id='tile-large-preview' src={imageURL} alt={tss.id}/>
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
                                            userId={tss.owner}
                                            minimal={true}
                                        />
                                        {commName ? <Typography variant='body2'>{`Community: ${commName}`}</Typography> : <Box/>}
                                        {contestName ? <Typography variant='body2'>{`Contest: ${contestName}`}</Typography>: <Box/>}
                                        <Typography variant='body2'>{`Published: ${date}`}</Typography>
                                        <Typography variant='body2' flexWrap={"wrap"}>{tss.description}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Box>
                                            <Tooltip title='Views'>
                                                <IconButton disableFocusRipple disableRipple sx={{cursor: 'default'}}><Visibility/></IconButton>
                                            </Tooltip>
                                            {formatToSocialStr(tss.views)}
                                            <Tooltip title={'Like'}>
                                                <IconButton onClick={like}><ThumbUp/></IconButton>
                                            </Tooltip>
                                            {formatToSocialStr(tss.likes.length)}
                                            <Tooltip title={'Dislike'}>
                                                <IconButton onClick={dislike}><ThumbDown/></IconButton>
                                            </Tooltip>
                                            {formatToSocialStr(tss.dislikes.length)}
                                            <Tooltip title={'Download'}>
                                                <IconButton onClick={download}><Download/></IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Grid>
                                    <Grid item container spacing={1}>
                                        {tss.tags.map(x => <Grid item key={x}><TagCard name={x} /></Grid>)}
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
                        {tss.comments.slice().reverse().map(x => 
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