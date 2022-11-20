import { Add } from "@mui/icons-material"
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material"
import React, { useContext, useState } from "react"
import { AuthContext } from "src/context/auth"
import { SnackContext } from "src/context/snack"
import { SocialContext } from "src/context/social"

const AddFriendModal = () => {
    const [open, setOpen] = useState(false)
    const auth = useContext(AuthContext)
    const social = useContext(SocialContext)
    const snack = useContext(SnackContext)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let formData = new FormData(e.currentTarget)
        let username = formData.get('username')?.toString()
        let users = await social.getUsersByUsername(username)
        if (users) {
            if (users.length === 1) {
                social.addFriend(users[0].id, auth, snack)
                setOpen(false)
            }
        } else {
            snack.showErrorMessage(`No user with username '${username}'`)
        }
    }
    return (
        <div>
            <IconButton onClick={() => setOpen(true)}><Add/></IconButton>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Friend</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter your friend's username here</DialogContentText>
                    <Box component={'form'} onSubmit={handleSubmit}>
                        <TextField
                            name='username'
                            label='Username'
                            fullWidth
                            margin="dense"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </div>
        
    )
}

export default AddFriendModal