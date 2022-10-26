import { Avatar, Button, Divider, Grid, Stack, Typography } from "@mui/material"
import { useState } from "react"
import EditPasswordForm from "./EditPasswordForm";
import EditUserPropertyForm from "./EditUserPropertyForm";

const AccountSettingsScreen = () => {
    const [hasPicture, setHasPicture] = useState(false)

    const stringToColor = (string: string) => {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }

    const stringAvatar = (name: string) => {
        return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    }

    const divider = <Divider sx={{mt: 1, mb: 1, ml: 50, mr: 50}} />

    const name = 'Michael Campos'
    const size = 160
    return (
        <Grid container direction='column'>
            <Grid container direction='column' alignItems='center'>
                <Grid item mt={2}>
                    <Typography variant='h5'>Account Settings</Typography>
                </Grid>
                <Grid item boxShadow={1} borderRadius={'50%'} textAlign='center' alignContent='center'>
                    <Avatar 
                        src='https://avatars.githubusercontent.com/u/39308094?v=4' 
                        sx={{bgcolor: stringToColor(name), fontSize: '2.5rem', width: size, height: size}}>
                            {stringAvatar(name)}
                    </Avatar>
                </Grid>
                <Grid item mt={1}>
                    <Stack direction='row' spacing={1}>
                        <Button variant='outlined'>Upload</Button>
                        <Button variant='outlined'>Remove</Button>
                    </Stack>
                </Grid>
            </Grid>
            <EditUserPropertyForm title='Username' content='Your username is:' value={'Camposm'} />
            {divider}
            <EditUserPropertyForm title='Email' content ='Your email is:' value='michael.campos@stonybrook.edu'/>
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