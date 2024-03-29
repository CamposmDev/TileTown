import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import Copyright from '../Copyright';
import PasswordResetModal from '../modals/PasswordResetModal';
import { AuthContext } from 'src/context/auth';
import { useContext } from 'react';
import { Login } from '@mui/icons-material';
import PasswordField from '../PasswordField';
import { SnackContext } from 'src/context/snack';

const LoginScreen = () => {
    const auth = useContext(AuthContext)
    const snack = useContext(SnackContext)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        let email = formData.get('email')?.toString()
        let password = formData.get('password')?.toString()
        auth.loginUser(email, password, snack)
    }

    let ui = (
        <Container component='main' maxWidth='xs'>
            <CssBaseline/>
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <Login />
                </Avatar>
                <Typography component="h1" variant="h5">Login</Typography>
                <Box 
                    component="form" 
                    onSubmit={handleSubmit} 
                    noValidate sx={{ mt: '8%' }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email / Username"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <PasswordField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    id='password'
                    autoComplete='current-password'
                />
                <Grid container justifyContent='flex-end'>
                    <Grid item >
                        <PasswordResetModal/>
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
                        <Link href="/register" variant="body2">
                        Don't have an account? Register
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <Copyright />
        </Container>
    )
    return (
        <Fade in={true} timeout={1000} children={ui}></Fade>
    )
}

export default LoginScreen