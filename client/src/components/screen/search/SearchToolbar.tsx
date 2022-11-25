import { Search, Sort } from "@mui/icons-material"
import { Grid, IconButton, InputAdornment, Menu, MenuItem, Stack, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { SnackContext } from "src/context/snack"
import { SocialContext } from "src/context/social"
import { CommunityContext } from "src/context/social/community"
import { ContestContext } from "src/context/social/contest"
import { ForumContext } from "src/context/social/forum"
import { UserContext } from "src/context/social/user"
import CreateForumPostModal from "../../modals/CreateForumPostModal"
import { MENU_PAPER_PROPS, SearchCategory } from '../../util/Constants'

interface Props {
    category: SearchCategory
}

const SearchToolbar = (props: Props) => {
    const social = useContext(SocialContext)
    const user = useContext(UserContext)
    const comm = useContext(CommunityContext)
    const contest = useContext(ContestContext)
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
                    social.getTilesetsByName(query, snack)
                    break
                case SearchCategory.Users:
                    user.getUsersByUsername(query, snack)
                    break
                case SearchCategory.Communities:
                    comm.getCommunitiesByName(query, snack)
                    break
                case SearchCategory.Contests:
                    contest.getContestByName(query, snack)
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
        <Toolbar sx={{boxShadow: 3, position: 'sticky'}}>
            <Grid container alignItems={'center'}>
                <Grid item mr={1}>
                    <Typography variant='h6'>{props.category}</Typography>
                </Grid>
                <Grid item flexGrow={1}>
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
                </Grid>
                <Grid item>
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