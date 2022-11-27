import { Archive, Favorite, Restore } from "@mui/icons-material"
import { BottomNavigation, BottomNavigationAction, Grid, Paper } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import TilemapSocialCard from "src/components/card/TilemapSocialCard"
import TilesetSocialCard from "src/components/card/TilesetSocialCard"
import { UserContext } from "src/context/social/user"
import { AuthContext } from "../../../context/auth"
import { SocialContext } from "../../../context/social"
import { CommunityContext } from "../../../context/social/community"
import { ContestContext } from "../../../context/social/contest"
import { ForumContext } from "../../../context/social/forum"
import CommunityCard from "../../card/CommunityCard"
import ContestCard from "../../card/ContestCard"
import ForumPostCard from "../../card/ForumPostCard"
import UserProfileCard from "../../card/UserProfileCard"
import { SearchCategory } from "../../util/Constants"
import SearchToolbar from "./SearchToolbar"

interface Props {
    cat: SearchCategory
}

const SearchScreen = (props: Props) => {
    const [value, setValue] = useState(0)
    const auth = useContext(AuthContext)
    const social = useContext(SocialContext)
    const user = useContext(UserContext)
    const comm  = useContext(CommunityContext)
    const contest = useContext(ContestContext)
    const forum = useContext(ForumContext)
    const nav = useNavigate()
    useEffect(() => {
        if (!auth.isLoggedIn()) nav('/')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let content = <div/>
    switch (props.cat) {
        case SearchCategory.Tilemaps:
            content = <Grid 
                    container 
                    spacing={1} 
                    mt={1}
                >
                    {social.state.tilemaps.map(x => 
                        <Grid item key={`${x.id}-${x.name}`}>
                            <TilemapSocialCard
                                key={x.id}
                                tms={x}
                            />
                        </Grid>
                    )}
                </Grid>
            break
        case SearchCategory.Tilesets:
            content = <Grid container 
                    spacing={1}
                    mt={1}>
                        {social.state.tilesets.map(x =>
                            <Grid item key={`${x.id}-${x.name}`}>  
                                <TilesetSocialCard 
                                    key={x.id}
                                    tss={x}
                                />
                            </Grid>
                        )}
            </Grid>
            break
        case SearchCategory.Users:
            content = <Grid container 
                        spacing={1}
                        mt={1}>
                    {user.users.map((x) => 
                    <Grid item key={`${x.id}-${x.username}`}>
                        <UserProfileCard 
                            key={x.id}
                            userId={x.id}
                            fancy={true}
                        />
                    </Grid>)}
            </Grid>
            break
        case SearchCategory.Communities:
            content = <Grid container 
                spacing={1}
                mt={1}>
                    {comm.getCommunities().map((x) => 
                        <Grid xs={4} item key={x.id}>
                            <CommunityCard comm={x}/>
                        </Grid>
                    )}
            </Grid>
            break
        case SearchCategory.Contests:
            content = 
            <Grid container 
                spacing={1}
                mt={1}>
                    {contest.state.contests.map(x => 
                        <Grid xs={3} item key={x.id}>
                            <ContestCard c={x}/>
                        </Grid>
                    )}
            </Grid>
            break
        case SearchCategory.Forums:
            content = 
                <Grid container spacing={1}>
                    {forum.getForums().map((x) => 
                        <Grid item key={x.id} xs={12}>
                            <ForumPostCard
                                forumPost={x}
                            />  
                        </Grid>  
                    )}
                </Grid>
            break
    }
    return (
        <Grid alignItems={'center'}>
            <Grid item>
                <SearchToolbar category={props.cat}/>
            </Grid>
            <Grid item>
                {content}
            </Grid>
            {/* <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                >
                <BottomNavigationAction label="Recents" icon={<Restore />} />
                <BottomNavigationAction label="Favorites" icon={<Favorite />} />
                <BottomNavigationAction label="Archive" icon={<Archive />} />
                </BottomNavigation>
            </Paper> */}
        </Grid>
    )
}

export default SearchScreen