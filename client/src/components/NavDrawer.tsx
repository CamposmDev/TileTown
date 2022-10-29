import { Drawer, Box, Typography, IconButton, Grid, Divider, MenuItem } from '@mui/material'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
// import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

export default function NavDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  // const navigate = useNavigate()

  const handleMenuClose = () => {
    setIsDrawerOpen(false)
  }

  const initMenuItem = (text: string, path: string) => {
    return (
      <MenuItem onClick={handleMenuClose} component={Link} to={path}>{text}</MenuItem>
    )
  }

  let drawer = (
    <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box p={2} width='200px' role='presentation' textAlign='start'>
          <Grid container justifyContent={'start'} alignItems='center' spacing={1}>
            <Grid item> 
              <IconButton onClick={() => setIsDrawerOpen(false)}><MenuIcon/></IconButton>
            </Grid>
              <Grid item><Typography variant='h6' component='div'>TileTown</Typography>
            </Grid>
          </Grid>
          <Divider/>
          <Grid mt={2} container direction={'column'} justifyContent={'flex-end'} spacing={1} >
            <Grid item >
              {initMenuItem('Home', '/feed')}
            </Grid>
            <Grid item>
            {initMenuItem('Tilemaps', '/search/tilemaps')}
            </Grid>
            <Grid item>
            {initMenuItem('Tilesets', '/search/tilesets')}
            </Grid>
            <Grid item>
              <Divider/>
            </Grid>
            <Grid item>
            {initMenuItem('Friends', '/friends')}
            </Grid>
            <Grid item>
            {initMenuItem('Users', '/search/users')}
            </Grid>
            <Grid item>
            {initMenuItem('Communities', '/search/communities')}
            </Grid>
            <Grid item>
            {initMenuItem('Contests', '/search/contests')}
            </Grid>
            <Grid item>
            {initMenuItem('Forums', '/search/forums')}
            </Grid>
          </Grid>
        </Box>
      </Drawer>
  )
  return (
    <Grid 
      // borderRadius={'5%'} 
      // boxShadow={1}
    >
      <IconButton
        onClick={() => setIsDrawerOpen(true)}
        size='large'
        color='inherit'
        aria-label='logo'>
        <MenuIcon 
          transform={'scale(1.3)'}
        />
      </IconButton>
      {drawer}
    </Grid>
  )
}