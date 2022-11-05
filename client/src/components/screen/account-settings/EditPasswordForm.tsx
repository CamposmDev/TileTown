import { Stack, Typography, Button, TextField, Box } from "@mui/material"
import PasswordField from "src/components/PasswordField"

const EditPasswordForm = () => {
    return (
        <Stack direction='column' spacing={1}>
            <Typography><b>{'Password'}</b></Typography>
            <Stack direction='row' alignItems='center'>
                <Stack direction='row' spacing={1} flexGrow={1}>
                    <TextField
                        label='Old Password'
                        fullWidth
                        size='small'
                    />
                    <PasswordField
                        label='New Password'
                        fullWidth
                        size='small'
                    />
                    <Box flexGrow={1}/>
                </Stack>
                <Button>Change</Button>
            </Stack>
        </Stack>
    )
}

export default EditPasswordForm