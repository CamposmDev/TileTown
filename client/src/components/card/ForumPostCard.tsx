import { Card, CardActionArea, CardContent, Grid, Stack, Typography, Box } from "@mui/material"
import { Comment, ThumbDown, ThumbUp, Visibility } from "@mui/icons-material"
import { formatToSocialStr } from '../util/NumberUtils'
import { parseDateToPostedStr } from '../util/DateUtils' 
import './default.css'
import { useContext, useEffect, useState } from "react"
import ForumPost from "../../../../@types/ForumPost"
import { ForumContext } from "src/context/social/forum"
import { SocialContext } from "src/context/social"

interface Props {
    forumPost: ForumPost
}

const ForumPostCard = (props: Props) => {
    const social = useContext(SocialContext)
    const forum = useContext(ForumContext)
    const [username, setUsername] = useState('')
    useEffect(() => {
        let userId = props.forumPost.author
        console.log(userId)
        if (userId) social.getUserById(userId).then(u => {
            if (u) setUsername(u.username)
        })
    }, [])
    const handleClick = () => {
        forum.setCurrentForumPost(props.forumPost)
    }
    return (
        <Card>
            <CardActionArea onClick={handleClick}>
                <CardContent>
                    <Grid container alignItems='center'>
                        <Grid item className='forum-post-card'>
                            <Typography variant='h6'>{props.forumPost.title}</Typography>
                            <Typography noWrap variant='caption'>{props.forumPost.body}</Typography>
                            <Stack alignItems='center' direction='row'>
                                    <Typography variant='caption'><b>By</b>:&ensp;{username},&ensp;</Typography>
                                    <Typography variant='caption'>{parseDateToPostedStr(new Date(props.forumPost.publishDate))}</Typography>
                            </Stack>
                        </Grid>
                        <Box flexGrow={1} mr={3}/>
                        <Grid item>
                            <Stack spacing={1}>
                                <Stack alignItems='center' direction='row'>
                                    <Visibility/>
                                    <Typography ml={1} variant='caption'>{formatToSocialStr(props.forumPost.views, '')}</Typography>
                                </Stack>
                                <Stack alignItems='center' direction='row'>
                                    <Comment/>
                                    <Typography ml={1} variant='caption'>{formatToSocialStr(props.forumPost.comments.length, '')}</Typography>
                                </Stack> 
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>  
        </Card>
    )
}

export default ForumPostCard