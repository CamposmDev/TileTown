import { Dialog } from "@mui/material"
import { AppBar, Toolbar, Grid, Typography, Button, IconButton, Stack, Card, CardContent, TextField} from "@mui/material"
import UserProfileBox from "../UserProfileBox"
import CommentCard from "../card/CommentCard"
import { ThumbDown, ThumbUp, Visibility } from "@mui/icons-material"
import { ForumPost } from "@types"
import { useContext, useEffect, useState } from "react"
import { ForumContext } from "src/context/social/forum"
import { SLIDE_DOWN_TRANSITION } from "../util/Constants"
import { parseDateToPostedStr } from "../util/DateUtils"
import { formatToSocialStr } from "../util/NumberUtils"
import { SocialContext } from "src/context/social"

const ForumPostModal = () => {
    const social = useContext(SocialContext)
    const forum = useContext(ForumContext)
    const [comment, setComment] = useState('')
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: ''
    })

    useEffect(() => {
        let userId: string | undefined = forum.getCurrentForumPost()?.author
        let aux = async () => {
            if (userId) {
                await social.getUserById(userId).then(u => {
                    if (u) setUser({firstName: u.firstName, lastName: u.lastName, username: u.username})
                })
            }
        }
        aux()
    }, [forum.getCurrentForumPost()])
    let open = Boolean(forum.getCurrentForumPost())
    const handleClose = () => {
        forum.clearCurrentForumPost()
    }
    const handleKeyUp = (e: React.KeyboardEvent) => {
        if (e.code === 'Enter') {
            console.log(comment)
        }
    }

    let forumPost: ForumPost | undefined = forum.getCurrentForumPost()
    let content = <div></div>
    if (forumPost) {
        content = 
            <CardContent>
                <Grid container alignItems={'center'} mb={1}>
                    <Grid item>
                        <UserProfileBox 
                            firstName={user.firstName} 
                            lastName={user.lastName} 
                            username={user.username}
                        />
                    </Grid>
                    <Grid item flexGrow={1}>
                            <Typography>,&ensp;{parseDateToPostedStr(new Date(forumPost?.publishDate))}</Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction='row' alignItems='center'>
                            <Visibility/>
                            <Typography>{formatToSocialStr(forumPost.views, '')}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Stack direction='row' alignItems='center'>
                            <IconButton><ThumbUp sx={{color: 'primary.main'}}/></IconButton>
                            <Typography>{formatToSocialStr(forumPost.likes.length, '')}</Typography>    
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Stack direction='row' alignItems='center'>
                            <IconButton ><ThumbDown sx={{color: 'red'}}/></IconButton>
                            <Typography>{formatToSocialStr(forumPost.dislikes.length, '')}</Typography>    
                        </Stack>
                    </Grid>
                </Grid>
                <Typography>{forumPost?.body}</Typography>
            </CardContent>
    }

    return (
        <Dialog open={open} fullScreen onClose={handleClose} TransitionComponent={SLIDE_DOWN_TRANSITION}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <Grid alignItems={'center'} container direction='row' sx={{flexGrow: 1}}>
                        <Typography variant="h6" component="div">
                            {forumPost?.title}
                        </Typography>
                    </Grid>
                    <Grid>
                        <Button color="inherit" onClick={handleClose}>Close</Button>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Grid container p={1}>
                <Grid item xs={6} pr={1}>
                    <Card>
                        {content}
                    </Card>
                </Grid>
                <Grid container item xs={6} pl={1}>
                    <TextField fullWidth label='Comment' onChange={(e) => setComment(e.target.value)} onKeyUp={handleKeyUp}/>
                    {forumPost?.comments.map(x =>
                        <CommentCard commentId={x} key={x}/>
                    )}
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default ForumPostModal