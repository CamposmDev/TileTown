import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import React, { useContext } from "react"
import { AuthContext } from "src/context/auth"
import { ModalContext } from "src/context/modal"
import { SnackContext } from "src/context/snack"
import { SocialContext } from "src/context/social"

    const DeleteCommunityModal = () => {
        const auth = useContext(AuthContext)
        const modal = useContext(ModalContext)
        const social = useContext(SocialContext)
        const snack = useContext(SnackContext)
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            let formData = new FormData(e.currentTarget)
            let commName = formData.get('comm-name')?.toString()  
            social.deleteCommunityByName(auth.getUsr()?.id, commName, snack)
            modal.close()
        }
        let ui = (
            <Dialog open={modal.getModal().showDeleteCommunityModal} onClose={() => modal.close()}>
                <DialogTitle>Delete Community</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter the name of your community</DialogContentText>
                    <Box component={'form'} onSubmit={handleSubmit}>
                            <TextField
                                name='comm-name'
                                label='Community Name'
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

    export default DeleteCommunityModal