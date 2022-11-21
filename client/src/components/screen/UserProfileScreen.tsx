import { AppBar, Box, Button, Grid, scopedCssBaselineClasses, Stack, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "src/context/auth";
import { SocialContext } from "src/context/social";
import { SocialActionType } from "src/context/social/SocialAction";
import { Community, Contest, Tileset, TilesetSocial } from "@types";
import CommunityCard from "../card/CommunityCard";
import ContestCard from "../card/ContestCard";
import TileItemCard from "../card/TileItemCard";
import UserProfileBox from "../UserProfileBox";
import { CommunityContext } from "src/context/social/community";
import TilesetCard from "../card/TilesetCard";
import { ProfileContext } from "src/context/profile";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const UserProfileScreen = () => {
    const prof = useContext(ProfileContext)
    const auth = useContext(AuthContext)
    const social = useContext(SocialContext)
    const comm = useContext(CommunityContext)
    const nav = useNavigate()
    const [tilesetIds, setTilesetIds] = useState<string[]>([])
    const [contests, setContests] = useState<Contest[]>([])
    const [communities, setCommunities] = useState<Community[]>([])
    useEffect(() => {
        if (!auth.isLoggedIn()) {
            nav('/')
        } else {
            if (prof.state.viewUnpublishedTilesets) {
                setValue(1)
            }
            let usr = auth.getUsr()
            if (usr) {
                social.getAllUserTilesets(usr.id).then(arr => {
                    if (arr) {
                        setTilesetIds(arr)
                    }
                })
            }
            social.getContestsById(auth.getUsr()?.joinedContests).then(arr => {
                setContests(arr)
            })
            comm.getCommunitiesById(auth.getUsr()?.joinedCommunities).then(arr => {
                setCommunities(arr)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prof])
    console.log(prof.state.viewUnpublishedTilesets)
    const [value, setValue] = useState(0)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    let user = auth.getUsr()
    let profile = <div/>
    let tilesetCards: JSX.Element | JSX.Element[] = <div>No tilesets</div>
    let contestCards: JSX.Element | JSX.Element[] = <div>No contests found</div>
    let communityCards: JSX.Element | JSX.Element[] = <div>No communities found</div>
    if (user) {
        profile = <UserProfileBox
            firstName={user.firstName}
            lastName={user.lastName}
            username={user.username}
        />
        tilesetCards = tilesetIds.map(x => 
            <Grid item key={x}>
                <TilesetCard
                    tilesetId={x}
                />
            </Grid>)
        contestCards = contests.map((x) =>
            <Grid item key={x.id} xs={3}>
                <ContestCard c={x}/>
            </Grid>
        )
        communityCards = communities.map((x) => 
            <Grid item key={x.id} xs={3}>
                <CommunityCard comm={x}/>
            </Grid>
        )
    }
    let toolbar = (
        <Toolbar sx={{boxShadow: 3}}>
            <Box mt={1} mb={1} mr={1}>
                {profile}
            </Box>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
            >
                <Tab label="Tilemaps" {...a11yProps(0)} />
                <Tab label="Tilesets" {...a11yProps(1)} />
                <Tab label="Contests & Partcipation" {...a11yProps(2)} />
                <Tab label='Communities' {...a11yProps(3)}/>
            </Tabs>
        </Toolbar>
    )
    return (
        <Box>
            {toolbar}
            <Grid>
                <Box>
                    <TabPanel value={value} index={0}>
                        <Grid 
                            container 
                            spacing={1} 
                            mt={1}
                        >
                            <Grid item>
                                {/* <TileItemCard
                                    preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level1/Level1_1.png'
                                    tilemapName='McBendorjee vs Robots Debug'
                                    author='H8TER$HADE$'
                                    publishDate={new Date(2022,11,5)}
                                    views={Math.random() * 3000}
                                    comments={Math.random() * 3000}
                                    likes={Math.random() * 3000}
                                    tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                                /> */}
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Grid container 
                            spacing={1}>
                                {tilesetCards}
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Grid container 
                            spacing={1}
                            mt={1}
                        >
                            {contestCards}
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Grid container 
                            spacing={1}
                            mt={1}
                        >
                            {communityCards}
                        </Grid>
                    </TabPanel>
                </Box>
            </Grid>
        </Box>
    )
}

export default UserProfileScreen