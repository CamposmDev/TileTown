import { Grid, Stack, Typography, Button, TextField, Box } from "@mui/material"

const EditPasswordForm = () => {
    return (
        <Grid item sx={{ml: 50, mr: 50}}>
            <Stack direction='column' spacing={1}>
                <Typography variant="body1"><b>{'Password'}</b></Typography>
                <Stack direction='row' alignItems='center' spacing={1}>
                    <Stack direction='row' spacing={1} flexGrow={1}>
                        <TextField
                            label='Old Password'
                            fullWidth
                            size='small'
                        />
                        <TextField
                            label='New Password'
                            fullWidth
                            size='small'
                        />
                    </Stack>
                    <Button>Change</Button>
                </Stack>
            </Stack>
        </Grid>
    )
}

export default EditPasswordForm