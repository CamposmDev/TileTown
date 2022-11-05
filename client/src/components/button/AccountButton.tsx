import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from 'react-router-dom';
import { Avatar, Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import { Logout, Hail, Person, Settings, PersonAdd } from "@mui/icons-material";
import { AuthContext } from "src/context/auth";
import { MENU_PAPER_PROPS, stringAvatar } from "../util/Constants";
import { User } from '@types'

const AccountButton = () => {
    const auth = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const navigate = useNavigate()
    const open = Boolean(anchorEl)

    const handleMenuOpen = (event: any) => setAnchorEl(event.currentTarget)

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        auth.logoutUser()
        handleMenuClose()
    }

    const handleGuest = () => {
        navigate('/home')
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
            <MenuItem onClick={handleLogout}>
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
            {auth.isLoggedIn() ? loggedInItems : loggedOutItems}
        </Menu>
    )

    let usr: User | null = auth.getUsr()


    const profile = auth.isLoggedIn() && usr ? (
        <Avatar {...stringAvatar(usr.firstName, usr.lastName)}/>
    ) : (
        <Avatar sx={{bgcolor: 'primary.main'}}/>
    )

    return (
        <Box>
                <IconButton
                    sx={{border: 'none'}}
                    onClick={handleMenuOpen}
                >{profile}</IconButton>
                {menu}
        </Box>
    )
}

export default AccountButton