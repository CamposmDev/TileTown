import { Card, CardActionArea, CardContent, Grid, Stack, Typography, Box, Dialog, AppBar, Toolbar, Button, Divider, TextField, IconButton } from "@mui/material"
import { Comment, ThumbDown, ThumbUp, Visibility } from "@mui/icons-material"
import { formatToSocialStr } from '../util/NumberUtils'
import { parseDateToPostedStr } from '../util/DateUtils' 
import './default.css'
import { useState } from "react"
import CommentCard from "./CommentCard"
import UserProfileBox from "../UserProfileBox"

interface Props {
    title: string,
    author: {firstName: string, lastName: string, username: string},
    publishDate: Date
    desc: string,
    views: number,
    likes: number
    dislikes: number
    comments: number,
}

const ForumPostCard = (props: Props) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const modal = (
        <Dialog open={open} fullScreen onClose={handleClose}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <Grid alignItems={'center'} direction='row' sx={{flexGrow: 1}}>
                        <Typography variant="h6" component="div">
                            {props.title}
                        </Typography>
                    </Grid>
                    <Grid>
                        <Button color="inherit" onClick={handleClose}>Close</Button>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Grid container p={1}>
                <Grid xs={6} pr={1}>
                    <Card>
                        <CardContent>
                            <Grid container alignItems={'center'} mb={1}>
                                <Grid item>
                                    <UserProfileBox 
                                        firstName={props.author.firstName} 
                                        lastName={props.author.lastName} 
                                        username={props.author.username}
                                    />
                                </Grid>
                                <Grid item flexGrow={1}>
                                        <Typography>,&ensp;{parseDateToPostedStr(props.publishDate)}</Typography>
                                </Grid>
                                <Grid item>
                                    <Stack direction='row' alignItems='center'>
                                        <Visibility/>
                                        <Typography>{formatToSocialStr(props.views)}</Typography>
                                    </Stack>

                                </Grid>
                                <Grid item>
                                    <Stack direction='row' alignItems='center'>
                                        <IconButton><ThumbUp sx={{color: 'primary.main'}}/></IconButton>
                                        <Typography>{formatToSocialStr(props.likes)}</Typography>    
                                    </Stack>
                                </Grid>
                                <Grid item>
                                    <Stack direction='row' alignItems='center'>
                                        <IconButton ><ThumbDown sx={{color: 'red'}}/></IconButton>
                                        <Typography>{formatToSocialStr(props.dislikes)}</Typography>    
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Typography>{props.desc}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid container xs={6} pl={1}>
                    <TextField fullWidth label='Comment'/>
                    <CommentCard/>
                    <CommentCard/>
                    <CommentCard/>
                </Grid>
            </Grid>
        </Dialog>
    )


    return (
        <div>
            <Card>
                <CardActionArea onClick={handleOpen}>
                    <CardContent>
                        <Grid container alignItems='center'>
                            <Grid item className='forum-post-card'>
                                <Typography variant='h6'>{props.title}</Typography>
                                <Typography noWrap variant='caption'>{props.desc}</Typography>
                                <Stack alignItems='center' direction='row'>
                                        <Typography variant='caption'><b>By</b>:&ensp;{props.author.username},&ensp;</Typography>
                                        <Typography variant='caption'>{parseDateToPostedStr(props.publishDate)}</Typography>
                                </Stack>
                            </Grid>
                            <Box flexGrow={1} mr={3}/>
                            <Grid item>
                                <Stack spacing={1}>
                                    <Stack alignItems='center' direction='row'>
                                        <Visibility/>
                                        <Typography ml={1} variant='caption'>{formatToSocialStr(props.views)}</Typography>
                                    </Stack>
                                    <Stack alignItems='center' direction='row'>
                                        <Comment/>
                                        <Typography ml={1} variant='caption'>{formatToSocialStr(props.comments)}</Typography>
                                    </Stack> 
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                    
                </CardActionArea>  
            </Card>
            {modal}
        </div>
    )
}

export default ForumPostCard