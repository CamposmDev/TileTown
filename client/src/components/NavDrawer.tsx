import { Drawer, Box, Typography, IconButton, Grid, Divider, MenuItem } from '@mui/material'
import { useContext, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useNavigate } from 'react-router-dom'
import UserProfileCard from './card/UserProfileCard'
import AddFriendModal from './modals/AddFriendModal'
import { AuthContext } from 'src/context/auth'

export default function NavDrawer() {
  const auth = useContext(AuthContext)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const navigate = useNavigate()

  const handleMenuClose = () => {
    setIsDrawerOpen(false)
  }

  const initMenuItem = (text: string, path: string) => {
    return (
      <MenuItem onClick={handleMenuClose} component={Link} to={path}>{text}</MenuItem>
    )
  }

  let initFriendCards = () => {
    let user = auth.getUsr()
    if (user && user.friends) {
      return user.friends.map((x,i) => {
        return <Grid item key={x} mb={1}>
          <UserProfileCard
            userId={x}
            firstName={x}
            lastName={x}
            username={x}
          />
        </Grid>
      })
    }
    return <Grid item></Grid>
  }

  const DRAWER_WIDTH = '256px'
  let friends = initFriendCards()
  let drawer = (
    <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box p={2} width={DRAWER_WIDTH} role='presentation' textAlign='start'>
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
              {initMenuItem('Home', '/home')}
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
          <Divider/>
          <Grid container alignItems={'center'} mt={1} ml={2} pb={1}>
            <Typography>Friends</Typography>
            <AddFriendModal/>
          </Grid>
          <Grid 
            sx={{
              overflow: 'auto',
              height: '300px'
            }}
            // container
            // spacing={1}
          >
            {friends}
            {/* <Grid item>
              <UserProfileCard
                firstName='Andrew'
                lastName='Ojeda'
                username='H8TER$HADE$'
              />
            </Grid> */}
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
          // transform={'scale(1.3)'}
        />
      </IconButton>
      {drawer}
    </Grid>
  )
}