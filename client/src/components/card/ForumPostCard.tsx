import { Card, CardActionArea, CardContent, Grid, Stack, Typography, Box } from "@mui/material"
import { Comment, ThumbDown, ThumbUp, Visibility } from "@mui/icons-material"
import { formatToSocialStr } from '../util/NumberUtils'
import { parseDateToPostedStr } from '../util/DateUtils' 
import { useContext, useEffect, useState } from "react"
import ForumPost from "../../../../@types/ForumPost"
import { ForumContext } from "src/context/social/forum"
import { SocialContext } from "src/context/social"
import { SnackContext } from "src/context/snack"
import './default.css'

interface Props {
    forumPost: ForumPost
}

const ForumPostCard = (props: Props) => {
    const social = useContext(SocialContext)
    const forum = useContext(ForumContext)
    const snack = useContext(SnackContext)
    const [username, setUsername] = useState('')
    useEffect(() => {
        let userId = props.forumPost.author
        let aux = async () => await social.getUserById(userId).then(u => { if (u) setUsername(u.username) })
        aux()
    }, [])
    
    const handleClick = () => {
        forum.viewForumPost(props.forumPost, snack)
    }
    return (
        <Card sx={{boxShadow: 3}}>
            <CardActionArea onClick={handleClick}>
                <CardContent>
                    <Grid container>
                        <Grid item className='forum-post-card' flexGrow={1}>
                            <Typography variant='h6'>{props.forumPost.title}</Typography>
                            <Typography noWrap>{props.forumPost.body}</Typography>
                            <Stack alignItems='center' direction='row'>
                                    <Typography><b>By</b>:&ensp;{username},&ensp;</Typography>
                                    <Typography>{parseDateToPostedStr(new Date(props.forumPost.publishDate))}</Typography>
                            </Stack>
                        </Grid>
                        <Grid container item>
                            <Grid container item spacing={1} xs={12}>
                                <Grid item xs={2}>
                                    <Stack direction='row'>
                                        <Visibility/>
                                        <Typography pl={1}>{formatToSocialStr(props.forumPost.views)}</Typography>
                                    </Stack>
                                </Grid>
                                <Grid item >
                                    <Stack direction='row'>
                                        <Comment/>
                                        <Typography pl={1}>{formatToSocialStr(props.forumPost.comments.length)}</Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Grid container item spacing={1} xs={12}>
                                <Grid item xs={2}>
                                    <Stack alignItems='center' direction='row'>
                                        <ThumbUp/>
                                        <Typography pl={1}>{formatToSocialStr(props.forumPost.likes.length)}</Typography>
                                    </Stack> 
                                </Grid>
                                <Grid item >
                                    <Stack alignItems='center' direction='row'>
                                        <ThumbDown/>
                                        <Typography pl={1}>{formatToSocialStr(props.forumPost.dislikes.length)}</Typography>
                                    </Stack> 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>  
        </Card>
    )
}

export default ForumPostCard