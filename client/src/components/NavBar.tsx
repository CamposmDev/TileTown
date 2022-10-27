import { ReactElement } from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

interface Props {
    items: ReactElement<any>
}

const NavBar = ({items}: Props) => {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position='relative'>
                <Toolbar>
                     {items}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar