// import { useState, useContext } from 'react';
// import AuthContext from '../context/auth'
import Copyright from '../Copyright'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { GlobalStoreContext } from '../context/store'
// import ErrorModal from './modal/ErrorModal'
import Box from '@mui/material/Box'
import { ButtonGroup, Fade } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from 'src/context/auth';

const RegisterScreen = () => {
    const auth = useContext(AuthContext)
    console.log(' am i logged in ? ' + auth.isLoggedIn())
    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log('I AM ALIVE')
        const formData = new FormData(e.currentTarget)
        let firstName = formData.get('firstName')?.toString()
        let lastName = formData.get('lastName')?.toString()
        let email = formData.get('email')?.toString()
        let username = formData.get('username')?.toString()
        let password = formData.get('password')?.toString()
        if (firstName && lastName && email && username && password) {
            let payload = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: password
            }
            console.log(payload)
            auth.registerUser(payload)
        }
    }
    let ui =
        <Container component="main" maxWidth="xs">
            {/* <ErrorModal showAlert={showAlert} errMsg={errMsg} handleCloseDialog={handleCloseDialog} /> */}
            <CssBaseline />
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create New Account
                </Typography>
                <Box component="form" noValidate onSubmit={(handleSubmit)} 
                    sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id='username'
                                label='Username'
                                name='username'
                                autoComplete='username'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="passwordVerify"
                                label="Re-enter Password"
                                type="password"
                                id="passwordVerify"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Login
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright />
        </Container>
    return (
        <Fade in={true} timeout={1000} children={ui}></Fade>
    )
}

export default RegisterScreen