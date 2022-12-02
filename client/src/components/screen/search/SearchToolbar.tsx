import { Search, Sort } from "@mui/icons-material"
import { Box, Chip, Fade, Grid, IconButton, InputAdornment, Menu, MenuItem, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import { useEffect } from "react"
import { useContext, useState } from "react"
import { SnackContext } from "src/context/snack"
import { SocialContext } from "src/context/social"
import { CommunityContext } from "src/context/social/community"
import { ContestContext } from "src/context/social/contest"
import { ForumContext } from "src/context/social/forum"
import { UserContext } from "src/context/social/user"
import { SortType, parseSortType as toPretty, TAG_PREFIX } from "../../util/Constants"
import CreateForumPostModal from "../../modals/CreateForumPostModal"
import { MENU_PAPER_PROPS, SearchCategory, TAG_CHAR_LIMIT, TAG_LIMIT } from '../../util/Constants'

const SearchToolbar = (props: {category: SearchCategory}) => {
    const social = useContext(SocialContext)
    const user = useContext(UserContext)
    const comm = useContext(CommunityContext)
    const contest = useContext(ContestContext)
    const forum = useContext(ForumContext)
    const snack = useContext(SnackContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const [query, setQuery] = useState<string>('')
    const [tags, setTags] = useState<string[]>([])
    const [sort, setSort] = useState<SortType>(SortType.none)
    useEffect(() => {
        setSort(SortType.none)
        setTags([])
    }, [props.category])
    const handleSort = (sort: SortType) => {
        setSort(sort)
        search(query, sort)
        handleMenuClose()
    }
    const handleMenuOpen = (event: any) => setAnchorEl(event.currentTarget)
    const handleMenuClose = () => setAnchorEl(null)
    const handleSubmit = (e: any) => {
        if (e.key === 'Enter') {
            if (query.startsWith(TAG_PREFIX) 
                && (props.category === SearchCategory.Tilemaps 
                || props.category === SearchCategory.Tilesets)) {
                addTag()
            } else {
                search(query, sort)
            }
        }
    }

    const addTag = () => {
        if (tags.length >= TAG_LIMIT) {
            snack.showErrorMessage(`You've reached the maximum amount of tags you can search for!`)
            return
        }
        let tag = query.slice(TAG_PREFIX.length)
        if (tag) {
            if (tag.length > TAG_CHAR_LIMIT) {
                snack.showErrorMessage(`You're tag can't be more than ${TAG_CHAR_LIMIT} characters!`)
                return
            }
            if (tags.indexOf(tag) === -1) {
                tags.push(tag)
                setTags(tags)
                setQuery('tag:')
                search('', sort)
            } else {
                snack.showErrorMessage('You already have that tag added!')
            }
        } else {
            snack.showErrorMessage('Tag can\'t be empty!')
        }
    }

    const deleteTag = (i: number) => {
        let arr = tags.filter((x,idx) => idx !== i)
        setTags(arr)
        if (arr.length > 0) {
            if (query.indexOf(TAG_PREFIX) === -1) {
                search('', sort)
            } else {
                search(query, sort)
            }
        }
    }
    
    const search = (query: string, sort: SortType) => {
        switch (props.category) {
            case SearchCategory.Tilemaps:
                social.getTilemapSocialsByName(query, sort.toString(), tags, snack)
                break
            case SearchCategory.Tilesets:
                social.getTilesetSocialsByName(query, sort.toString(), tags, snack)
                break
            case SearchCategory.Users:
                user.getUsersByUsername(query, sort.toString(), snack)
                break
            case SearchCategory.Communities:
                comm.getCommunitiesByName(query, sort.toString(), snack)
                break
            case SearchCategory.Contests:
                contest.getContestByName(query, sort.toString(), snack)
                break
            case SearchCategory.Forums:
                forum.getForumPostsByName(query, sort.toString(), snack)
                break
        }
    }
    let menuItems: JSX.Element[] = []
    switch (props.category) {
        case SearchCategory.Tilemaps:
        case SearchCategory.Tilesets:
            menuItems = [
                <MenuItem key={'sort-tile-pub-date-new'} onClick={() => handleSort(SortType.publishDateNewest)}>Publish Date (Newest)</MenuItem>,
                <MenuItem key={'sort-tile-pub-date-old'} onClick={() => handleSort(SortType.publishDateOldest)}>Publish Date (Oldest)</MenuItem>,
                <MenuItem key={'sort-tile-most-likes'} onClick={() => handleSort(SortType.mostLikes)}>Most Likes</MenuItem>,
                <MenuItem key={'sort-tile-least-likes'} onClick={() => handleSort(SortType.leastLikes)}>Least Likes</MenuItem>,
                <MenuItem key={'sort-tile-most-dislikes'} onClick={() => handleSort(SortType.mostDislikes)}>Most Dislikes</MenuItem>,
                <MenuItem key={'sort-tile-least-dislikes'} onClick={() => handleSort(SortType.leastDislikes)}>Least Dislikes</MenuItem>,
                <MenuItem key={'sort-tile-most-views'} onClick={() => handleSort(SortType.mostViews)}>Most Views</MenuItem>,
                <MenuItem key={'sort-tile-least-views'} onClick={() => handleSort(SortType.leastViews)}>Least Views</MenuItem>,
                <MenuItem key={'sort-tile-most-comments'} onClick={() => handleSort(SortType.mostComments)}>Most Comments</MenuItem>,
                <MenuItem key={'sort-tile-least-comments'} onClick={() => handleSort(SortType.leastComments)}>Least Comments</MenuItem>,
            ]
            break
        case SearchCategory.Users:
            menuItems = [
                <MenuItem key={'sort-user-most-friends'} onClick={() => handleSort(SortType.mostFriends)}>Most Friends</MenuItem>,
                <MenuItem key={'sort-user-least-friends'} onClick={() => handleSort(SortType.leastFriends)}>Least Friends</MenuItem>
            ]
            break
        case SearchCategory.Communities:
            menuItems = [
                <MenuItem key={'sort-community-titleaz'} onClick={() => handleSort(SortType.titleaz)}>A-Z</MenuItem>,
                <MenuItem key={'sort-community-titleza'} onClick={() => handleSort(SortType.titleza)}>Z-A</MenuItem>,
                <MenuItem key={'sort-community-most-members'} onClick={() => handleSort(SortType.mostMembers)}>Most Members</MenuItem>,
                <MenuItem key={'sort-community-least-members'} onClick={() => handleSort(SortType.leastMembers)}>Least Members</MenuItem>,
                <MenuItem key={'sort-community-most-tilemaps'} onClick={() => handleSort(SortType.mostTilemaps)}>Most Tilemaps</MenuItem>,
                <MenuItem key={'sort-community-least-tilemaps'} onClick={() => handleSort(SortType.leastTilemaps)}>Least Tilemaps</MenuItem>,
                <MenuItem key={'sort-community-most-tilesets'} onClick={() => handleSort(SortType.mostTilesets)}>Most Tilesets</MenuItem>,
                <MenuItem key={'sort-community-least-tilesets'} onClick={() => handleSort(SortType.leastTilesets)}>Least Tilesets</MenuItem>,
            ]
            break
        case SearchCategory.Contests:
            menuItems = [
                <MenuItem key={'sort-contest-titleaz'} onClick={() => handleSort(SortType.titleaz)}>A-Z</MenuItem>,
                <MenuItem key={'sort-contest-titleza'} onClick={() => handleSort(SortType.titleza)}>Z-A</MenuItem>,
                <MenuItem key={'sort-contest-time-new'} onClick={() => handleSort(SortType.timeNewest)}>Time: Newest</MenuItem>,
                <MenuItem key={'sort-contest-time-end'} onClick={() => handleSort(SortType.timeEnding)}>Time: Ending Soonest</MenuItem>,
                <MenuItem key={'sort-contest-most-parts'} onClick={() => handleSort(SortType.mostParts)}>Most Participates</MenuItem>,
                <MenuItem key={'sort-contest-least-parts'} onClick={() => handleSort(SortType.leastParts)}>Least Participates</MenuItem>
            ]
            break
        case SearchCategory.Forums:
            menuItems = [
                <MenuItem key={'sort-forum-titleaz'} onClick={() => handleSort(SortType.titleaz)}>A-Z</MenuItem>,
                <MenuItem key={'sort-forum-titleza'} onClick={() => handleSort(SortType.titleza)}>Z-A</MenuItem>,
                <MenuItem key={'sort-forum-pub-date-new'} onClick={() => handleSort(SortType.publishDateNewest)}>Publish Date (Newest)</MenuItem>,
                <MenuItem key={'sort-forum-pub-date-old'} onClick={() => handleSort(SortType.publishDateOldest)}>Publish Date (Oldest)</MenuItem>,
                <MenuItem key={'sort-forum-most_likes'} onClick={() => handleSort(SortType.mostLikes)}>Most Likes</MenuItem>,
                <MenuItem key={'sort-forum-least-likes'} onClick={() => handleSort(SortType.leastLikes)}>Least Likes</MenuItem>,
                <MenuItem key={'sort-forum-most-dislikes'} onClick={() => handleSort(SortType.mostDislikes)}>Most Dislikes</MenuItem>,
                <MenuItem key={'sort-forum-least-dislikes'} onClick={() => handleSort(SortType.leastDislikes)}>Least Dislikes</MenuItem>,
                <MenuItem key={'sort-forum-most-views'} onClick={() => handleSort(SortType.mostViews)}>Most Views</MenuItem>,
                <MenuItem key={'sort-forum-least-views'} onClick={() => handleSort(SortType.leastViews)}>Least Views</MenuItem>,
                <MenuItem key={'sort-forum-most-comments'} onClick={() => handleSort(SortType.mostComments)}>Most Comments</MenuItem>,
                <MenuItem key={'sort-forum-least-comments'} onClick={() => handleSort(SortType.leastComments)}>Least Comments</MenuItem>
            ]
            break
    }
    let sortMenu = (
        <Menu
            key={'sort-memu'}
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={MENU_PAPER_PROPS}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {menuItems}
        </Menu>
    )
    
    let searchField = 
        <TextField 
            fullWidth 
            size="small"
            value={query}
            onChange={(e) => {
                setQuery(e.target.value ? e.target.value : '')
            }}
            onKeyDown={handleSubmit}
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <Search />
                </InputAdornment>
            ), endAdornment: (
                <InputAdornment position="end">
                    {sort ? `Sort: ${toPretty(sort)}` : ``}
                </InputAdornment>
            )}} 
        />
    
    let tagsUI = <Box/>
    let tagToolTipTitle = <Box/>
    switch (props.category) {
        case SearchCategory.Tilemaps:
        case SearchCategory.Tilesets: 
            tagsUI = (
                <Grid container item spacing={1}>
                    {tags.map((x,i) => (
                        <Grid item key={x}>
                            <Chip label={x} onDelete={() => deleteTag(i)}/>
                        </Grid>
                    ))}
                </Grid>
            )
            tagToolTipTitle = <Typography>{`tag:1234 search within a tag`}</Typography>
            break
    }
        
    let header = (
        <Toolbar sx={{boxShadow: 3, position: 'sticky'}}>
            <Grid container alignItems={'center'}>
                <Grid item mr={1}>
                    <Typography variant='h6'>{props.category}</Typography>
                </Grid>
                <Grid item flexGrow={1}>
                    <Tooltip title={
                        <Box>
                            <Typography>{`"words here" exact phrase`}</Typography>
                            {tagToolTipTitle}
                        </Box>
                    }  TransitionComponent={Fade} TransitionProps={{timeout: 600}}>
                        {searchField}
                    </Tooltip>
                </Grid>
                <Grid item>
                    {props.category === SearchCategory.Forums ? <CreateForumPostModal/> : <></>}
                    <Tooltip title={`Sort By`} TransitionComponent={Fade} TransitionProps={{timeout: 600}}>
                        <IconButton onClick={handleMenuOpen} children={<Sort/>}/>
                    </Tooltip>
                    {sortMenu}               
                </Grid>
            </Grid>
        </Toolbar>
    )
    
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                {header}
            </Grid>
            {tagsUI}
        </Grid>
    )
}

export default SearchToolbar