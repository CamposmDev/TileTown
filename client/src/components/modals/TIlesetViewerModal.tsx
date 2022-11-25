import { CopyAll, CopyAllOutlined, CopyAllRounded, CopyAllTwoTone, Copyright, Download, Forum, Star, StarBorder, ThumbDown, ThumbUp, Visibility } from "@mui/icons-material";
import { AppBar, Box, Button, Card, CardContent, Dialog, Grid, Icon, IconButton, ImageListItem, LinearProgress, Stack, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react"
import { SnackContext } from "src/context/snack";
import { SocialContext } from "src/context/social";
import { SLIDE_DOWN_TRANSITION } from "../util/Constants";
import '../card/default.css'
import axios from "axios";
import AxiosApi from "src/api/axios/AxiosApi";
import CommentCard from "../card/CommentCard";
import { unmountComponentAtNode } from "react-dom";
import { dateToStr } from "../util/DateUtils";
import { FaCopy } from "react-icons/fa";
import TagCard from "../card/TagCard";
import UserProfileCard from "../card/UserProfileCard";
import UserProfileBox from "../UserProfileBox";
import ts from "typescript";

export default function TilesetViewerModal() {
    const social = useContext(SocialContext)
    const snack = useContext(SnackContext)
    const [commName, setCommName] = useState('None')
    const [comment, setComment] = useState<string>()
    const open = Boolean(social.state.currentTSS)

    useEffect(() => {
        let tss = social.state.currentTSS
        if (tss && tss.community) {
            social.getCommunityName(tss.community).then(name => {
                if (name) setCommName(name)
            })
        } else {
            setCommName('None')
        }
    }, [social.state.currentTSS])

    const like = () => {
        /** Call the like tileset social function from social */
    }

    const dislike = () => {
        /** Call the dislike tileset social function from social */
    }

    const download = () => {

    }

    const clone = () => {

    }
    
    const favorite = () => {
        /** Handles favorite or unfavoriting tileset */
    }

    const handlekeyUp = (e: React.KeyboardEvent) => {
        if (e.code === 'Enter') {
            /** Calls the comment function in social
             * Then clear the comment state
             */
            console.log(comment)
            setComment('')
        }
    }

    const handleClose = () => {
        /** Clear the comment state and call the clear function from social */
        social.clear()
    }

    let tss = social.state.currentTSS
    if (tss) {
        let header = (
            <AppBar position='relative'> 
                <Toolbar>
                    <Grid container alignItems='center' spacing={1}>
                        <Grid item flexGrow={1}>
                            <Typography variant="h6">{tss.name}</Typography>
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
        let date = dateToStr(new Date(tss.publishDate))
        let imageURL = `${AxiosApi.getUri()}/media/${tss.imageURL}`
        console.log(imageURL)
        let body = (
            <Grid container p={1} spacing={1}>
                <Grid item xs={6}>
                    <Card sx={{boxShadow: 3}}>
                        <ImageListItem>
                            <img id='tile-large-preview' src={imageURL} />
                        </ImageListItem>
                    </Card>
                </Grid>
                <Grid container item xs={6}>
                    <Grid item xs={12}>
                        <Card sx={{boxShadow: 3}}>
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item flexGrow={1}>
                                        <UserProfileCard
                                            userId={tss.owner}
                                            minimal={true}
                                        />
                                        {/* {tss.community ? <Typography>{tss.community}</Typography> : <Box/>} */}
                                        <Typography variant='body2'>{`Community: ${commName}`}</Typography>
                                        <Typography variant='body2'>{`Published: ${date}`}</Typography>
                                        <Typography variant='body2'>{tss.description}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Box>
                                            <Tooltip title={tss.likes.length}>
                                                <IconButton onClick={like}><ThumbUp/></IconButton>
                                            </Tooltip>
                                            <Tooltip title={tss.dislikes.length}>
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
                                    <Grid item container>
                                        {tss.tags.map(x => <TagCard name={x} />)}
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
                            {tss.comments.slice().map(x => 
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
    return <div/>
}