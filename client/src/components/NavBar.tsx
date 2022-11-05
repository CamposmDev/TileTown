import { ReactElement, useContext } from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { AuthContext } from 'src/context/auth'
import UserMenu from './menu/UserMenu'
import WelcomeMenu from './menu/WelcomeMenu'

const NavBar = () => {
    const auth = useContext(AuthContext)
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position='relative'>
                <Toolbar>
                     {auth.isLoggedIn() ? <UserMenu/> : <WelcomeMenu/>}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar