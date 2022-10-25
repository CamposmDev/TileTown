import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import MeetingRoomSharpIcon from '@mui/icons-material/MeetingRoomSharp';
import NavDrawer from './NavDrawer'

const MENU_PAPER_PROPS = {
    elevation: 0,
    sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 24,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
}

const AppHeader = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const navigate = useNavigate()
    const open = Boolean(anchorEl)

    const handleProfileMenuOpen = (event: any) => setAnchorEl(event.currentTarget)

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        handleMenuClose()
        // auth.logoutUser()
        // store.clearTop5Lists()
    }

    const handleGuest = () => {
        navigate('/')
        // auth.loginAsGuest()
        handleMenuClose()
    }

    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={MENU_PAPER_PROPS}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem 
                onClick={handleMenuClose} 
                component={Link} to={'/login/'} 
                >
                    <PersonIcon />
                    Login</MenuItem>
            <MenuItem 
                onClick={handleMenuClose} 
                component={Link} to={'/register/'}
                ><PersonAddAlt1Icon />Create New Account</MenuItem>
            <MenuItem 
                onClick={handleGuest}
                ><PersonSearchIcon />Continue as Guest</MenuItem>
        </Menu>
    )

    const loggedInMenu =
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={MENU_PAPER_PROPS}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleLogout}><MeetingRoomSharpIcon />Logout</MenuItem>
        </Menu>

    let menu = loggedOutMenu
    // if (auth.loggedIn) {
    //     menu = loggedInMenu;
    // }

    const getAccountMenu = (loggedIn: boolean) => {
        // if (loggedIn && auth.user !== null) {
        //     let firstInitial = auth.user.firstName.charAt(0).toUpperCase()
        //     let lastInitial = auth.user.lastName.charAt(0).toUpperCase()
        //     let initials = firstInitial + lastInitial;
        //     return <span>{initials}</span>
        // }
        return <AccountCircle fontSize='large' />;
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position='static'>
                <Toolbar>
                     {/** The NavDrawer should only show in main feed and other areas though...hmm.. */}
                    <NavDrawer/>
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block', flexGrow: 1 } }}
                    >
                        <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>T<sub>T</sub></Link>
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            {getAccountMenu(false)}
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {menu}
        </Box>
    )
}

export default AppHeader