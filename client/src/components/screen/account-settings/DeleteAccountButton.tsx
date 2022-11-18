import { Warning } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material"
import { User } from "@types"
import React, { useContext, useState } from "react"
import { AuthContext } from "src/context/auth"

const DeleteAccountButton = () => {
    const auth = useContext(AuthContext)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setUsername('')
        setVerifyText('')
        setOpen(false)
    }
    const [username, setUsername] = useState('')
    const [verifyText, setVerifyText] = useState('')
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let username = e.target.value
        setUsername(username)
    }
    const handleVerifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let verifyText = e.target.value
        console.log(verifyText)
        setVerifyText(verifyText)
    }
    const deleteAccount = () => {
        auth.deleteAccount()
    }
    let user: User | null = auth.getUsr()
    let btDisabled = true
    if (user !== null) {
        btDisabled = !((username.localeCompare(user.username) === 0) && (verifyText.localeCompare('delete my account') === 0))
    }

    let modal = (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Are you sure you want to do this?</DialogTitle>
            <div style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    flexWrap: 'wrap', 
                    backgroundColor: '#F7D9D7', 
                    borderBlock: '1px solid #8E0000', 
                    color: '#8E0000',
                    padding: '12px'
            }}><Warning/> This is extremely important</div>
            <DialogContent>
                <DialogContentText>
                    <Typography>
                        We will <b>immediately delete all your tilemaps and tilesets, along with all of your contests, forum posts, comments, and owned community.</b>
                    </Typography>
                    <br/>
                    <Typography>Your username will be available to anyone on TileTown.</Typography>
                </DialogContentText>
                <TextField 
                    label='Your username'
                    margin="dense"
                    fullWidth
                    onChange={handleUsernameChange}
                />
                <TextField 
                    label={'To verify, type "delete my account"'}
                    margin="dense"
                    fullWidth
                    onChange={handleVerifyChange}
                />
            </DialogContent>
            <DialogActions>
                <Button disabled={btDisabled} onClick={deleteAccount} color='error'>Delete this account</Button>
            </DialogActions>
        </Dialog>
    )
    return (
        <div>
            <Button onClick={handleOpen} variant='outlined' color='error'>Delete Account</Button>
            {modal}
        </div>
    )
}

export default DeleteAccountButton