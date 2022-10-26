import { Drawer, Box, Typography, IconButton, Grid, Divider, MenuItem } from '@mui/material'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'


enum Action {
  Home = 0,
  Tilemaps = 1,
  Tilesets = 2,
  Friends = 3,
  Users = 4,
  Communties = 5,
  Contests = 6,
  Forum = 7
}

export default function NavDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleClick = (action: Action) => {
    switch(action) {
      case 0: break
      case 1: break
      case 2: break
      case 3: break
      case 4: break
      case 5: break
      case 6: break
      case 7: break
    }
    setIsDrawerOpen(false)
  }

  const initMenuItem = (text: string, action: Action) => {
    return (
      <MenuItem onClick={() => handleClick(action)}>
        <Typography variant='button'>{text}</Typography>
      </MenuItem>
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
              {initMenuItem('Home', Action.Home)}
            </Grid>
            <Grid item>
            {initMenuItem('Tilemaps', Action.Tilemaps)}
            </Grid>
            <Grid item>
            {initMenuItem('Tilesets', Action.Tilesets)}
            </Grid>
            <Grid item>
              <Divider/>
            </Grid>
            <Grid item>
            {initMenuItem('Friends', Action.Friends)}
            </Grid>
            <Grid item>
            {initMenuItem('Users', Action.Users)}
            </Grid>
            <Grid item>
            {initMenuItem('Communities', Action.Communties)}
            </Grid>
            <Grid item>
            {initMenuItem('Contest', Action.Contests)}
            </Grid>
            <Grid item>
            {initMenuItem('Forum', Action.Forum)}
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