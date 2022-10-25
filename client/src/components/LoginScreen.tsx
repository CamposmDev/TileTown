import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { FormControlLabel, Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow'
// import { useState, useContext } from 'react';
// import AuthContext from '../context/auth'
import Copyright from './Copyright'

const LoginScreen = () => {
    let ui = (
        <Container component='main' maxWidth='xs'>
            <CssBaseline/>
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LoginIcon />
                </Avatar>
                
                <Typography component="h1" variant="h4">Login</Typography>

                <Box 
                    component="form" 
                    // onSubmit={handleSubmit} 
                    noValidate sx={{ mt: '8%' }}>
                <TextField
                    variant='outlined'
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email / Username"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    variant='outlined'
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Grid container justifyContent='flex-end'>
                    <Grid item >
                        <Link href='/' variant='body2'>Forgot your password?</Link>
                    </Grid>
                </Grid>
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </Button>
                </Box>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/register/" variant="body2">
                        Already have an account? Sign In
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <Copyright />
        </Container>
    )
    return (
        <Grow in={true} timeout={1000} children={ui}></Grow>
    )
}

export default LoginScreen