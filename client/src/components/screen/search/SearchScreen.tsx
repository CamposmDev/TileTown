import { Grid } from "@mui/material"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import { AuthContext } from "src/context/auth"
import { SocialContext } from "src/context/social"
import { ForumContext } from "src/context/social/forum"
import { SocialActionType } from "src/context/social/SocialAction"
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
    const forum = useContext(ForumContext)
    const nav = useNavigate()
    useEffect(() => {
        if (!auth.isLoggedIn()) nav('/')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let items = <div/>
    switch (props.cat) {
        case SearchCategory.Tilemaps:
            items = <Grid 
                    container 
                    justifyContent={'center'}
                    spacing={1} 
                    mt={1}
                >
                    <Grid item>
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
                    </Grid>
                </Grid>
            break
        case SearchCategory.Tilesets:
            items = <Grid container 
                    justifyContent={'center'}
                    spacing={1}
                    mt={1}>
                <Grid item>
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
                </Grid>
            </Grid>
            break
        case SearchCategory.Users:
            items = <Grid container 
                justifyContent={'center'}
                alignItems={'center'}
                spacing={1}
                mt={1}>
                    {social.getUsers().map((x,i) => <Grid>
                        <UserProfileCard 
                            userId={x.id}
                            firstName={x.firstName}
                            lastName={x.lastName}
                            username={x.username}
                            fancy={true}
                        />
                    </Grid>)}
            </Grid>
            break
        case SearchCategory.Communities:
            items = <Grid container 
                justifyContent={'center'}
                spacing={1}
                mt={1}>
                    {social.getCommunities().map((x,i) => 
                        <Grid item key={x.name}>
                            <CommunityCard
                                commName={x.name}
                                commDesc={x.description}
                                numOfMembers={x.members.length}
                                numOfTilemaps={0}
                                numOfTilesets={0}
                            />
                        </Grid>
                    )}
            </Grid>
            break
        case SearchCategory.Contests:
            items = 
            <Grid container 
                justifyContent={'center'}
                spacing={1}
                mt={1}>
                    {social.getContests().map((x,i) => 
                        <Grid item key={x.name}>
                            <ContestCard
                                payload={{
                                    contestName: x.name,
                                    startDate: new Date(x.startDate),
                                    endDate: new Date(x.endDate),
                                    owner: x.owner,
                                    participates: x.participates.length
                                }}
                            />
                        </Grid>
                    )}
            </Grid>
            break
        case SearchCategory.Forums:
            items = 
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
                {items}
            </Grid>
        </Grid>
    )
}

export default SearchScreen