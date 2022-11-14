import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, Modal, TextField } from "@mui/material"
import React, { useContext } from "react"
import { AuthContext } from "src/context/auth"
import { ModalContext } from "src/context/modal"
import { SnackContext } from "src/context/snack"
import { SocialContext } from "src/context/social"

const DeleteContestModal = () => {
    const auth = useContext(AuthContext)
    const modal = useContext(ModalContext)
    const social = useContext(SocialContext)
    const snack = useContext(SnackContext)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let formData = new FormData(e.currentTarget)
        let contestName = formData.get('contest-name')?.toString()
        social.deleteContestByName(auth.getUsr()?.id, contestName, snack)
        modal.close()
    }
    let ui = (
        <Dialog open={modal.getModal().showDeleteContestModal} onClose={() => modal.close()}>
            <DialogTitle>Delete Contest</DialogTitle>
            <DialogContent>
                <DialogContentText>Enter the name of your contest</DialogContentText>
                <Box component={'form'} onSubmit={handleSubmit}>
                        <TextField
                            name='contest-name'
                            label='Contest Name'
                            fullWidth
                            margin="dense"
                        />
                    </Box>
            </DialogContent>
        </Dialog>
    )
    return (
        <div>
            {ui}
        </div>
    )
}

export default DeleteContestModal