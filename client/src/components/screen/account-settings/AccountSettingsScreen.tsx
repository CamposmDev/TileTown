import { Avatar, Box, Button, Container, CssBaseline, Divider, Grid, Stack, Typography } from "@mui/material"
import { useContext, useEffect } from "react";
import NotificationSnack from "src/components/modals/NotificationSnack";
import { User } from "@types";
import { stringAvatar } from "../../../components/util/Constants";
import { AuthContext } from "../../../context/auth";
import ChangeEmailModal from "../../modals/ChangeEmailModal";
import ChangeUsernameModal from "../../modals/ChangeUsernameModal";
import EditPasswordForm from "./EditPasswordForm";
import EditUserPropertyForm from "./EditUserPropertyForm";
import { useNavigate } from "react-router";

const AccountSettingsScreen = () => {
    const auth = useContext(AuthContext)
    const nav = useNavigate()
    useEffect(() => {
        if (!auth.isLoggedIn()) nav('/')
    }, [])

    const handleUpload = () => {
        throw new Error('Not Implemented Yet')
    }

    const removePicture = () => {
        throw new Error('Not Implemented Yet')
    }

    const SIZE = 128
    let user: User | null = auth.getUsr()
    return (
        <Container>
            <NotificationSnack/>
            <CssBaseline/>
            <Box sx={{display: 'flex', flexDirection: 'column', mt: 1, alignItems: 'center'}}>
                <Typography variant='h5' mb={1}>Account Settings</Typography>
                <Avatar 
                    {...user ? stringAvatar(user.firstName, user.lastName) : null}
                    style={{fontSize: '32pt', width: SIZE, height: SIZE}}
                />
                <Stack mt={1} mb={1} spacing={1} direction='row'>
                    <Button variant='outlined' onClick={handleUpload} >Upload</Button>
                    <Button variant='outlined' onClick={removePicture}>Remove</Button>
                </Stack>
                <Grid>
                    <EditUserPropertyForm
                        title='Username' 
                        content='Your username is:' 
                        value={user ? user.username : 'How did you get here?'} 
                        button={<ChangeUsernameModal/>}
                    />
                    <Divider sx={{mt: 1, mb: 1}}/>
                    <EditUserPropertyForm 
                        title='Email' 
                        content ='Your email is:' 
                        value={user ? user.email : 'How did you get here?'}
                        button={<ChangeEmailModal/>}
                    />
                    <Divider sx={{mt: 1, mb: 1}}/>
                    <EditPasswordForm/>
                    <Divider sx={{mt: 1, mb: 1}}/>
                </Grid>
                <Button
                    variant='outlined'
                    color='error'
                >Delete Account</Button>
                
            </Box>
        </Container>
    )
}

export default AccountSettingsScreen