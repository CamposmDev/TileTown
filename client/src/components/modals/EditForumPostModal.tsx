import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { SnackContext } from "src/context/snack"
import { ForumContext } from "src/context/social/forum"
import ForumPost from "../../../../@types/ForumPost"
import { SLIDE_DOWN_TRANSITION } from "../util/Constants"

interface Props {
    open: boolean
    callback: Function
    forumPost: ForumPost
}

const EditForumPostModal = (props: Props) => {
    const forum = useContext(ForumContext)
    const snack = useContext(SnackContext)
    const [text, setText] = useState('')
    const handleClose = () => props.callback(false);


    const handleAppend = (e: React.MouseEvent) => {
        forum.append(text, snack)
        handleClose()
    }

    return (
        <Dialog 
            open={props.open}
            onClose={() => props.callback(false)}
            TransitionComponent={SLIDE_DOWN_TRANSITION}
        >
            <DialogTitle>Edit Forum Post</DialogTitle>
            <DialogContent>
                <DialogContentText></DialogContentText>
                <Box>
                    <TextField
                        disabled
                        margin="dense"
                        fullWidth
                        value={props.forumPost.title}
                        label="Title"
                    />
                    <TextField
                        disabled
                        margin='dense'
                        fullWidth
                        value={props.forumPost.body}
                        label='Question'
                    />
                    <TextField
                        margin="dense"
                        fullWidth
                        onChange={(e) => setText(e.target.value)}
                        label="Append your question here"
                        autoFocus
                        multiline
                        rows={11}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAppend}>Append</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditForumPostModal
