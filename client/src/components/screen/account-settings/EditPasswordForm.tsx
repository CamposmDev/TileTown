import { Stack, Typography, Button, TextField, Box } from "@mui/material"
import React, { useContext } from "react"
import PasswordField from "src/components/PasswordField"
import { AuthContext } from "src/context/auth"
import { SnackContext } from "src/context/snack"

const EditPasswordForm = () => {
    const auth = useContext(AuthContext)
    const snack = useContext(SnackContext)
    const changePassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('fire!')
        const formData = new FormData(e.currentTarget)
        let oldPassword = formData.get('old-password')?.toString()
        let newPassword = formData.get('new-password')?.toString()
        auth.changePassword(oldPassword, newPassword, snack)
    }
    return (
        <Stack direction='column' component='form' onSubmit={changePassword}>
            <Typography><b>{'Password'}</b></Typography>
            <Stack direction='row'>
                <Stack direction='row' spacing={1} flexGrow={1}>
                    <TextField
                        name='old-password'
                        label='Old Password'
                        fullWidth
                        size='small'
                        type={'password'}
                    />
                    <PasswordField
                        name='new-password'
                        label='New Password'
                        fullWidth
                        size='small'
                    />
                    <Box flexGrow={1}/>
                </Stack>
                <Button type="submit">Change</Button>
            </Stack>
        </Stack>
    )
}

export default EditPasswordForm