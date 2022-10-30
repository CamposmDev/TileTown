import { Search, Sort } from "@mui/icons-material"
import { Grid, IconButton, InputAdornment, Menu, MenuItem, Stack, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import { useState } from "react"
import CreateForumPostModal from "../../modals/CreateForumPostModal"
import { MENU_PAPER_PROPS, SearchCategory } from '../../util/Constants'

interface Props {
    category: SearchCategory
}

const SearchToolbar = (props: Props) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleMenuOpen = (event: any) => setAnchorEl(event.currentTarget)
    const handleMenuClose = () => setAnchorEl(null)

    const sortMenu = (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={MENU_PAPER_PROPS}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            
            <MenuItem>Publish Date (Newest)</MenuItem>
            <MenuItem>Publish Date (Oldest)</MenuItem>
            <MenuItem>Likes</MenuItem>
            <MenuItem>Dislikes</MenuItem>
            <MenuItem>Views</MenuItem>
        </Menu>
    )

    let createBox = 
        <Tooltip title='Create Post'>
            <CreateForumPostModal/>
        </Tooltip>

    return (
        <Toolbar sx={{boxShadow: 1, position: 'sticky'}}>
            <Grid container justifyContent='space-between'>
                <Grid item xs={11}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                    <Typography variant='h6'>{props.category}</Typography>
                    <TextField fullWidth size="small" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <Search />
                        </InputAdornment>
                    ),
                    }} />
                    </Stack>
                </Grid>
                <Grid item alignItems='end'>
                    {props.category === SearchCategory.Forums ? createBox : <></>}
                    <Tooltip title='Sort By'>
                        <IconButton onClick={handleMenuOpen} children={<Sort/>}/>
                    </Tooltip>
                    {sortMenu}               
                </Grid>
            </Grid>
        </Toolbar>
    )
}

export default SearchToolbar