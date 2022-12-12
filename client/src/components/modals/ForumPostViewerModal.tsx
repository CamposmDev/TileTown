import { Box, Dialog } from "@mui/material"
import { AppBar, Toolbar, Grid, Typography, Button, IconButton, Stack, Card, CardContent, TextField} from "@mui/material"
import UserProfileBox from "../UserProfileBox"
import CommentCard from "../card/CommentCard"
import { ThumbDown, ThumbUp, Visibility } from "@mui/icons-material"
import { ForumPost } from "@types"
import { useContext, useEffect, useState } from "react"
import { ForumContext } from "src/context/social/forum"
import { SLIDE_DOWN_TRANSITION } from "../util/Constants"
import { dateToPostedStr } from "../util/DateUtils"
import { formatToSocialStr } from "../util/NumberUtils"
import { SocialContext } from "src/context/social"
import { AuthContext } from "src/context/auth"
import EditForumPostModal from "./EditForumPostModal"
import { SnackContext } from "src/context/snack"

export default function ForumPostViewerModal() {
    const social = useContext(SocialContext)
    const forum = useContext(ForumContext)
    const auth = useContext(AuthContext)
    const snack = useContext(SnackContext)
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
            if (userId) {
                await social.getUserCredentialsById(userId).then(u => {
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
        setComment('')
    }
    const handleKeyUp = (e: React.KeyboardEvent) => {
        if (e.code === 'Enter') {
            forum.comment(comment, snack)
            setComment('')
        }
    }

    let commentField = <div/>
    if (!auth.isGuest()) {
        commentField = <TextField 
            sx={{mb: 1}}
            autoFocus
            fullWidth
            value={comment}
            label='Comment' 
            onChange={(e) => setComment(e.target.value)} 
            onKeyUp={handleKeyUp}
        />
    }

    let disableLike = false
    let disableDislike = false
    let forumPost: ForumPost | undefined = forum.getCurrentForumPost()
    let content = <div></div>
    let editButton = <div></div>
    let editModal = <div></div>
    if (forumPost) {
        let usr = auth.usr
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
                            <Typography>,&ensp;{dateToPostedStr(new Date(forumPost?.publishDate))}</Typography>
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
                            <Typography>{formatToSocialStr(forumPost.likes.length)}</Typography>    
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Stack direction='row' alignItems='center'>
                            <IconButton disabled={disableDislike} onClick={dislike}><ThumbDown/></IconButton>
                            <Typography>{formatToSocialStr(forumPost.dislikes.length)}</Typography>    
                        </Stack>
                    </Grid>
                </Grid>
                <Typography  sx={{overflowWrap: 'anywhere', whiteSpace: 'pre-line'}}>{forumPost.body}</Typography>
            </CardContent>
    }

    return (
        <Box>
            <Dialog 
                open={open} 
                fullScreen 
                onClose={handleClose} 
                TransitionComponent={SLIDE_DOWN_TRANSITION}
            >
                <AppBar sx={{position: 'sticky'}}>
                    <Toolbar>
                        <Grid container alignItems={'center'}>
                            <Grid item flexGrow={1}>
                                <Typography variant="h6">{forumPost?.title}</Typography>
                            </Grid>
                            <Grid item>
                                {editButton}
                            </Grid>
                            <Grid item>
                               <Button color="inherit" onClick={handleClose}>Close</Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Grid container p={1} spacing={1}>
                    <Grid item xs={6}>
                        <Card sx={{boxShadow: 3}}>
                            {content}
                        </Card>
                    </Grid>
                    <Grid container item xs={6}>
                        <Grid container>
                            {commentField}
                        </Grid>
                        <Grid container spacing={1}>
                            {forumPost?.comments.slice().reverse().map(x =>
                                <Grid item xs={12} key={x}>
                                    <CommentCard commentId={x} />
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
            {editModal}
        </Box>
    )
}