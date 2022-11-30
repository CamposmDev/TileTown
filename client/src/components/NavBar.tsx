import { useContext } from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { AuthContext } from '../context/auth'
import UserMenu from './menu/UserMenu'
import WelcomeMenu from './menu/WelcomeMenu'

const NavBar = () => {
    const auth = useContext(AuthContext)
    return (
        <AppBar position='relative'>
            <Toolbar>
                    {auth.isLoggedIn ? <UserMenu/> : <WelcomeMenu/>}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar