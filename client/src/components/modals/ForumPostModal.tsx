import { Box, Dialog } from "@mui/material"
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
import { AuthContext } from "src/context/auth"
import EditForumPostModal from "./EditForumPostModal"

const ForumPostModal = () => {
    const social = useContext(SocialContext)
    const forum = useContext(ForumContext)
    const auth = useContext(AuthContext)
    const [edit, setEdit] = useState(false)
    const [comment, setComment] = useState('')
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: ''
    })

    useEffect(() => {
        let userId: string | undefined = forum.getCurrentForumPost()?.author
        let aux = async () => {
            console.log(forum.getCurrentForumPost()?.body)
            if (userId) {
                await social.getUserById(userId).then(u => {
                    if (u) setUser({firstName: u.firstName, lastName: u.lastName, username: u.username})
                })
            }
        }
        aux()
    }, [forum.getCurrentForumPost()])

    const like = () => {
        forum.like()
    }

    const dislike = () => {
        forum.dislike()
    }

    let open = Boolean(forum.getCurrentForumPost())

    const handleEdit = () => {
        setEdit(true)
    }
    const handleClose = () => {
        forum.clearCurrentForumPost()
    }
    const handleKeyUp = (e: React.KeyboardEvent) => {
        if (e.code === 'Enter') {
            forum.comment(comment)
        }
    }

    let disableLike = false
    let disableDislike = false
    let forumPost: ForumPost | undefined = forum.getCurrentForumPost()
    let content = <div></div>
    let editButton = <div></div>
    let editModal = <div></div>
    const NEW_LINE = '\n'
    if (forumPost) {
        let usr = auth.getUsr()
        if (usr) {
            disableLike = !Boolean(forumPost.likes.indexOf(usr.id))
            disableDislike = !Boolean(forumPost.dislikes.indexOf(usr.id))
            if (usr.id.localeCompare(forumPost.author) === 0) {
                editButton = <Button color='inherit' onClick={handleEdit}>Edit</Button>
            }
            editModal = <EditForumPostModal forumPost={forumPost} open={edit} callback={setEdit} />
        }   
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
                            <IconButton disabled={disableLike} onClick={like}><ThumbUp/></IconButton>
                            <Typography>{formatToSocialStr(forumPost.likes.length, '')}</Typography>    
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Stack direction='row' alignItems='center'>
                            <IconButton disabled={disableDislike} onClick={dislike}><ThumbDown/></IconButton>
                            <Typography>{formatToSocialStr(forumPost.dislikes.length, '')}</Typography>    
                        </Stack>
                    </Grid>
                </Grid>
                <Typography sx={{whiteSpace: 'pre-line'}}>{forumPost.body}</Typography>
                {/* {forumPost.body.split(NEW_LINE).map(x =>  */}
            </CardContent>
    }

    return (
        <div>
            <Dialog 
            open={open} 
            fullScreen 
            onClose={handleClose} 
            TransitionComponent={SLIDE_DOWN_TRANSITION}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <Grid alignItems={'center'} container direction='row' sx={{flexGrow: 1}}>
                        <Typography variant="h6" component="div">
                            {forumPost?.title}
                        </Typography>
                    </Grid>
                    <Grid>
                        {editButton}
                    </Grid>
                    <Grid>
                        <Button color="inherit" onClick={handleClose}>Close</Button>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Grid container p={1}>
                <Grid item xs={6} pr={1}>
                    <Card sx={{boxShadow: 3}}>
                        {content}
                    </Card>
                </Grid>
                <Grid container item xs={6} pl={1}>
                    <Grid container>
                        <TextField 
                            fullWidth 
                            label='Comment' 
                            onChange={(e) => setComment(e.target.value)} 
                            onKeyUp={handleKeyUp}
                        />
                    </Grid>
                    <Grid container>
                        {forumPost?.comments.map(x =>
                            <Grid>
                                <CommentCard commentId={x} key={x}/>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
        {editModal}
        </div>
    )
}

export default ForumPostModal