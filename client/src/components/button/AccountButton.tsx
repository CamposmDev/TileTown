import { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from 'react-router-dom';
import { Avatar, Box, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import { Logout, Hail, Person, Settings, PersonAdd } from "@mui/icons-material";

interface Props {
    loggedIn: boolean
}

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
            right: 27,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
}

const AccountButton = ({loggedIn}: Props) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const navigate = useNavigate()
    const open = Boolean(anchorEl)

    const handleMenuOpen = (event: any) => setAnchorEl(event.currentTarget)

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleGuest = () => {
        navigate('/feed')
        // auth.loginAsGuest()
        handleMenuClose()
    }

    const loggedInItems = (
        <Box>
            <MenuItem onClick={handleMenuClose} component={Link} to={'/profile'}>
                <ListItemIcon><Person/></ListItemIcon>
                <ListItemText>Your Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to={'/settings'}>
                <ListItemIcon><Settings/></ListItemIcon>
                <ListItemText>Settings</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to={'/login'}>
                <ListItemIcon><Logout/></ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </MenuItem>
        </Box>
    )

    const loggedOutItems = (
        <Box>
            <MenuItem onClick={handleMenuClose} component={Link} to={'/login'} >
                <ListItemIcon><Person/></ListItemIcon>
                <ListItemText>Login</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to={'/register'}>
                <ListItemIcon><PersonAdd/></ListItemIcon>
                <ListItemText>Create New Account</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleGuest}>
                <ListItemIcon><Hail/></ListItemIcon>
                <ListItemText>Continue as Guest</ListItemText>
            </MenuItem>
        </Box>
    )
    const menu = (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={MENU_PAPER_PROPS}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {loggedIn ? loggedInItems : loggedOutItems}
        </Menu>
    )

    const profile = loggedIn ? (
        <Avatar sx={{bgcolor: 'primary.main', fontSize: '1.5rem', width: 40, height: 40}}>MC</Avatar>
    ) : (
        <Avatar sx={{bgcolor: 'primary.main'}} ></Avatar>
    )

    return (
        <Grid borderRadius={'50%'} boxShadow={1}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                    size="large"
                    onClick={handleMenuOpen}
                    color="inherit"
                >{profile}</IconButton>
                {menu}
            </Box>
        </Grid>
    )
}

export default AccountButton