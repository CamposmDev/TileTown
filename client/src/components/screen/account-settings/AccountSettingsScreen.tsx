import { Avatar, Button, Divider, Grid, Stack, Typography } from "@mui/material"
import { stringAvatar } from "src/components/util/Constants";
import ChangeEmailModal from "../../modals/ChangeEmailModal";
import ChangeUsernameModal from "../../modals/ChangeUsernameModal";
import EditPasswordForm from "./EditPasswordForm";
import EditUserPropertyForm from "./EditUserPropertyForm";

const AccountSettingsScreen = () => {

    const divider = <Divider sx={{mt: 1, mb: 1, ml: 50, mr: 50}} />
    const size = 140
    return (
        <Grid container direction='column'>
            <Grid container direction='column' alignItems='center'>
                <Grid item mt={2}>
                    <Typography variant='h5'>Account Settings</Typography>
                </Grid>
                <Grid item boxShadow={1} borderRadius={'50%'} textAlign='center' alignContent='center'>
                    <Avatar {...stringAvatar('Michael', 'Campos')} sx={{fontSize: '32pt', width: size, height: size}}/>
                </Grid>
                <Grid item mt={1}>
                    <Stack direction='row' spacing={1}>
                        <Button variant='outlined'>Upload</Button>
                        <Button variant='outlined'>Remove</Button>
                    </Stack>
                </Grid>
            </Grid>
            <EditUserPropertyForm title='Username' content='Your username is:' value={'Camposm'} button={<ChangeUsernameModal/>}/>
            {divider}
            <EditUserPropertyForm title='Email' content ='Your email is:' value='michael.campos@stonybrook.edu' button={<ChangeEmailModal/>}/>
            {divider}
            <EditPasswordForm/>
            {divider}
            <Grid item container direction='column' alignItems='center'>
                <Grid item>
                    <Button
                        variant='outlined'
                        color='error'
                    >Delete Account</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AccountSettingsScreen