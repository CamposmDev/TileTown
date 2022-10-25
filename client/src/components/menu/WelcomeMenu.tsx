import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, Grid, Typography } from "@mui/material"
import { IconButton } from '@mui/material';
import { useState } from "react"
import { useNavigate } from "react-router"
import { GoMailRead } from 'react-icons/go'


const WelcomeMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const navigate = useNavigate()
    const open = Boolean(anchorEl)

    const handleProfileMenuOpen = (event: any) => setAnchorEl(event.currentTarget)

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleGuest = () => {
        navigate('/')
        // auth.loginAsGuest()
        handleMenuClose()
    }
    return (
        <Grid container>
            <Grid item>
                <Typography
                    variant="h5"
                    noWrap
                    component='div'
                    // component="div"
                    sx={{ display: { xs: 'none', sm: 'block', flexGrow: 1 } }}>TileTown</Typography>
            </Grid>
            <Grid item>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                ><AccountCircle/></IconButton>
            </Grid>
            <Grid item>
            <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"><GoMailRead/></IconButton>
                
            </Grid>
        </Grid>
    )
}

export default WelcomeMenu