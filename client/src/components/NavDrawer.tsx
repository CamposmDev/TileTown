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

  let drawer = (
    <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box p={2} width='200px' role='presentation' textAlign='start'>
          <Grid container justifyContent={'start'} alignContent={'center'} spacing={1}>
            <Grid item> 
              <MenuIcon/>
            </Grid>
              <Grid item><Typography variant='h6' component='div'>TileTown</Typography>
            </Grid>
          </Grid>
          <Divider/>
          <Grid mt={2} container direction={'column'} justifyContent={'flex-end'} spacing={1} >
            <Grid item >
              <MenuItem onClick={() => handleClick(Action.Home)}><Typography variant='h6'>Home</Typography></MenuItem>
            </Grid>
            <Grid item>
              <MenuItem onClick={() => handleClick(Action.Tilemaps)}><Typography variant='h6'>Tilemaps</Typography></MenuItem>
            </Grid>
            <Grid item>
              <MenuItem onClick={() => handleClick(Action.Tilesets)}><Typography variant='h6'>Tilesets</Typography></MenuItem>
            </Grid>
            <Grid item>
              <Divider/>
            </Grid>
            <Grid item>
              <MenuItem onClick={() => handleClick(Action.Friends)}><Typography variant='h6'>Friends</Typography></MenuItem>
            </Grid>
            <Grid item>
              <MenuItem onClick={() => handleClick(Action.Users)}><Typography variant='h6'>Users</Typography></MenuItem>
            </Grid>
            <Grid item>
              <MenuItem onClick={() => handleClick(Action.Communties)}><Typography variant='h6'>Communities</Typography></MenuItem>
            </Grid>
            <Grid item>
              <MenuItem onClick={() => handleClick(Action.Contests)}><Typography variant='h6'>Contests</Typography></MenuItem>
            </Grid>
            <Grid item>
              <MenuItem onClick={() => handleClick(Action.Forum)}><Typography variant='h6'>Forum</Typography></MenuItem>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
  )
  return (
    <>
      <IconButton
        onClick={() => setIsDrawerOpen(true)}
        size='large'
        edge='start'
        color='inherit'
        aria-label='logo'>
        <MenuIcon />
      </IconButton>
      {drawer}
    </>
  )
}