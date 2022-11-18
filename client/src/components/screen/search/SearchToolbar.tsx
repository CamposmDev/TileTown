import { Search, Sort } from "@mui/icons-material"
import { Grid, IconButton, InputAdornment, Menu, MenuItem, Stack, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { SnackContext } from "src/context/snack"
import { SocialContext } from "src/context/social"
import { ForumContext } from "src/context/social/forum"
import CreateForumPostModal from "../../modals/CreateForumPostModal"
import { MENU_PAPER_PROPS, SearchCategory } from '../../util/Constants'

interface Props {
    category: SearchCategory
}

const SearchToolbar = (props: Props) => {
    const social = useContext(SocialContext)
    const forum = useContext(ForumContext)
    const snack = useContext(SnackContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const [query, setQuery] = useState('')

    const handleMenuOpen = (event: any) => setAnchorEl(event.currentTarget)
    const handleMenuClose = () => setAnchorEl(null)
    const handleSubmit = (e: any) => {
        if (e.key === 'Enter') {
            switch (props.category) {
                case SearchCategory.Tilemaps:
                    break
                case SearchCategory.Tilesets:
                    break
                case SearchCategory.Users:
                    social.getUserByUsername(query, snack)
                    break
                case SearchCategory.Communities:
                    social.getCommunityByName(query, snack)
                    break
                case SearchCategory.Contests:
                    social.getContestByName(query, snack)
                    break
                case SearchCategory.Forums:
                    forum.getForumPostsByName(query, snack)
                    break
            }
        }
    }

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

    return (
        <Toolbar sx={{boxShadow: 1, position: 'sticky'}}>
            <Grid container justifyContent='space-between'>
                <Grid item xs={11}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <Typography variant='h6'>{props.category}</Typography>
                        <TextField 
                            fullWidth 
                            size="small"
                            onChange={(e) => {
                                setQuery(e.target.value)
                            }}
                            onKeyDown={handleSubmit}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            )}} 
                        />
                    </Stack>
                </Grid>
                <Grid item alignItems='end'>
                    {props.category === SearchCategory.Forums ? <CreateForumPostModal/> : <></>}
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