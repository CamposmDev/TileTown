import { Grid, GridProps } from "@mui/material"
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
        if (!auth.isLoggedIn) nav('/')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let displayProps: GridProps = {
        container: true,
        spacing: 1,
        mt: 1
    }
    let content = <div/>
    switch (props.cat) {
        case SearchCategory.Tilemaps:
            content = <Grid {...displayProps}>
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
            content = <Grid {...displayProps}>
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
            content = <Grid {...displayProps}>
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
            content = <Grid {...displayProps}>
                    {comm.communities.map((x) => 
                        <Grid item key={x.id} xs={4}>
                            <CommunityCard comm={x}/>
                        </Grid>
                    )}
            </Grid>
            break
        case SearchCategory.Contests:
            content = 
            <Grid {...displayProps}>
                    {contest.state.contests.map(x => 
                        <Grid item key={x.id} xs={3}>
                            <ContestCard c={x}/>
                        </Grid>
                    )}
            </Grid>
            break
        case SearchCategory.Forums:
            content = 
                <Grid {...displayProps}>
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
            <Grid container item pl={1} pr={1}>
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