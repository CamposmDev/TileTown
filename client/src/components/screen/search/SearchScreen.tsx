import { Grid } from "@mui/material"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import TilesetCard from "src/components/card/TilesetCard"
import { UserContext } from "src/context/social/user"
import { AuthContext } from "../../../context/auth"
import { SocialContext } from "../../../context/social"
import { CommunityContext } from "../../../context/social/community"
import { ContestContext } from "../../../context/social/contest"
import { ForumContext } from "../../../context/social/forum"
import CommunityCard from "../../card/CommunityCard"
import ContestCard from "../../card/ContestCard"
import ForumPostCard from "../../card/ForumPostCard"
import TileItemCard from "../../card/TileItemCard"
import UserProfileCard from "../../card/UserProfileCard"
import { SearchCategory } from "../../util/Constants"
import SearchToolbar from "./SearchToolbar"

interface Props {
    cat: SearchCategory
}

const SearchScreen = (props: Props) => {
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
                    {/* <Grid item>
                        <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level1/Level1_1.png'
                            tilemapName='McBendorjee vs Robots Debug'
                            author='H8TER$HADE$'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid> */}
                </Grid>
            break
        case SearchCategory.Tilesets:
            content = <Grid container 
                    spacing={1}
                    mt={1}>
                        {social.state.tilesets.map(x =>
                            <Grid item key={x.id}>  
                                <TilesetCard
                                    tilesetId={x.id}
                                />
                            </Grid>
                        )}
                {/* <Grid item>
                    <TileItemCard
                        preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level1/level1and2tileset.png'
                        tilemapName='McBendorjee vs Robots Tileset'
                        author='Emdoiqua'
                        publishDate={new Date(2022,11,5)}
                        views={Math.random() * 3000}
                        comments={Math.random() * 3000}
                        likes={Math.random() * 3000}
                        tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                    />
                </Grid> */}
            </Grid>
            break
        case SearchCategory.Users:
            content = <Grid container 
                        spacing={1}
                        mt={1}>
                    {user.users.map((x) => 
                    <Grid item key={x.id}>
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
                        <Grid xs={4} item key={x.name}>
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
                    {contest.getContests().map(x => 
                        <Grid xs={3} item key={x.name}>
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
        </Grid>
    )
}

export default SearchScreen