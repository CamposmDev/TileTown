import { AppBar, Box, Button, Fade, Grid, LinearProgress, scopedCssBaselineClasses, Skeleton, Stack, Tab, TabProps, Tabs, TextField, Toolbar, Typography } from "@mui/material"
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "src/context/auth";
import { SocialContext } from "src/context/social";
import { Community, Contest, Tilemap, Tileset, TilesetSocial, User } from "@types";
import CommunityCard from "../card/CommunityCard";
import ContestCard from "../card/ContestCard";
import UserProfileBox from "../UserProfileBox";
import { CommunityContext } from "src/context/social/community";
import TilesetCard from "../card/TilesetCard";
import { ProfileContext } from "src/context/profile";
import { useParams } from "react-router";
import { ContestContext } from "src/context/social/contest";
import TilemapSocialCard from "../card/TilemapSocialCard";
import TilemapSocialCardLoader from "../card/TilemapSocialCardLoader";
import TilesetSocialCardLoader from "../card/TilesetSocialCardLoader";
import TilemapCard from "../card/TilemapCard";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
  
function TabPanel(props: TabPanelProps): JSX.Element {
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
            <Box sx={{  }}>
            <Typography component={'span'}>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

/**
 * Returns 
 * @param index 
 * @returns 
 */
function a11yProps(index: number): TabProps {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const UserProfileScreen = () => {
    const { id } = useParams()
    const [user, setUser] = useState<User>()
    const [contests, setContests] = useState<Contest[]>([])
    const [comms, setComms] = useState<Community[]>([])
    const auth = useContext(AuthContext)
    const social = useContext(SocialContext)
    const contest = useContext(ContestContext)
    const comm = useContext(CommunityContext)
    const nav = useNavigate()
    const [collabTilemaps, setCollabTilemaps] = useState<Tilemap[]>([])
    const [mainIdx, setMainIdx] = useState<number>(0)
    const [tmIdx, setTMIdx] = useState<number>(0)
    const [favorIdx, setFavorIdx] = useState<number>(0)
    useEffect(() => {
        if (!id || !auth.isLoggedIn) {
            nav('/')
        } else {
            social.getUserById(id).then(user => {
                if (user) {
                    social.getUserCollaboratedTilemaps(user.id).then(tilemaps => {
                        setCollabTilemaps(tilemaps)
                    })
                    let aux = () => {
                        setUser(user)
                        contest.getContestsById(user.joinedContests).then(arr => setContests(arr))
                        comm.getCommunitiesById(user.joinedCommunities).then(arr => setComms(arr))           
                    }
                    aux()
                    // let you = auth.usr
                    // if (you) {
                    //     if (you.id.localeCompare(user.id) === 0) {
                    //         auth.refreshUser().then(() => {
                    //             aux()
                    //         })
                    //     } else {
                    //         aux()
                    //     }
                    // }
                }
            })
        }
    }, [id, auth.usr])

    const handleMainTabChange = (e: React.SyntheticEvent, newValue: number) => setMainIdx(newValue)
    const handleFavorTabChange = (e: React.SyntheticEvent, newValue: number) => setFavorIdx(newValue)
    const handleTMTabChange = (e: React.SyntheticEvent, newValue: number) => setTMIdx(newValue)

    if (user) {
        let profileCard = (
            <UserProfileBox
                firstName={user.firstName}
                lastName={user.lastName}
                username={user.username}
            />
        )
        let header = (
            <Toolbar sx={{boxShadow: 3}}>
                <Box m={1}>
                    {profileCard}
                </Box>
                <Tabs
                    value={mainIdx}
                    onChange={handleMainTabChange}
                    variant='scrollable'
                    allowScrollButtonsMobile
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label={`Tilemaps`} {...a11yProps(0)}/>
                    <Tab label={`Tilesets`} {...a11yProps(1)}/>
                    <Tab label={`Communities`} {...a11yProps(2)}/>
                    <Tab label={`Contests & Partcipation`} {...a11yProps(3)}/>
                    <Tab label='Favorites' {...a11yProps(4)}/>
                </Tabs>
            </Toolbar>
        )
        let tilemapTP = (
            <TabPanel value={mainIdx} index={0}>
                <Toolbar sx={{bowShadow: 0}}>
                    <Stack direction='row' spacing={2} alignItems='center'>
                        <Tabs
                            value={tmIdx}
                            onChange={handleTMTabChange}
                            allowScrollButtonsMobile
                            textColor='primary'
                            indicatorColor='primary'
                        >
                            <Tab label={`Owned`} {...a11yProps(0)}/>
                            <Tab label={`Collaborations`} {...a11yProps(1)}/>
                        </Tabs>
                    </Stack>
                </Toolbar>
                <TabPanel value={tmIdx} index={0}>
                    <Grid 
                        container 
                        spacing={1} 
                        p={1}
                    >
                        {user.tilemaps.map(x => 
                            <Grid item key={x}>
                                <TilemapCard tilemapId={x}/>
                            </Grid>
                        )}   
                    </Grid>
                </TabPanel>
                <TabPanel value={tmIdx} index={1}>
                    <Grid container spacing={1} p={1}>
                        {collabTilemaps.map(x => <Grid item><TilemapCard tilemapId={x.id}/></Grid>)}
                    </Grid>
                </TabPanel>
            </TabPanel>
        )
        let tilesetTP = (
            <TabPanel value={mainIdx} index={1}>
                <Grid 
                    container 
                    spacing={1}
                    p={1}
                >
                    {user.tilesets.map(x =>
                        <Grid item key={x}>
                            <TilesetCard
                                tilesetId={x}
                            />
                        </Grid>
                    )}
                </Grid>
            </TabPanel>
        )
        let communityTP = (
            <TabPanel value={mainIdx} index={2}>
                <Grid container 
                    spacing={1}
                    p={1}
                >
                    {comms.map(x => 
                        <Grid item key={x.id} xs={3}>
                            <CommunityCard
                                comm={x}
                            />
                        </Grid>)}
                </Grid>
            </TabPanel>
        )
        let contestTP = (
            <TabPanel value={mainIdx} index={3}>
                <Grid container 
                    spacing={1}
                    p={1}
                >
                    {contests.map(x => 
                        <Grid item key={x.id} xs={3}>
                            <ContestCard
                                c={x}
                            />
                        </Grid>)}
                </Grid>
            </TabPanel>
        )
        let favoritesTP = (
            <TabPanel value={mainIdx} index={4}>
                <Toolbar sx={{boxShadow: 0}}>
                    <Stack direction='row' spacing={2} alignItems='center'>
                        <Tabs
                            value={favorIdx}
                            onChange={handleFavorTabChange}
                            allowScrollButtonsMobile
                            textColor="primary"
                            indicatorColor="primary"
                        >
                            <Tab label={`Tilemaps (${user.favoriteTileMaps.length})`} {...a11yProps(0)}/>
                            <Tab label={`Tilesets (${user.favoriteTileSets.length})`} {...a11yProps(1)}/>
                        </Tabs>
                        {/* <TextField label='Filter by name' size='small'/> */}
                    </Stack>
                    
                </Toolbar>
                <TabPanel value={favorIdx} index={0}>
                    <Grid container spacing={1} p={1}>
                        {user.favoriteTileMaps.map(x => {
                            return (
                                <Grid item key={x}>
                                    <TilemapSocialCardLoader tmsId={x}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                </TabPanel>
                <TabPanel value={favorIdx} index={1}>
                    <Grid container spacing={1} p={1}>
                        {user.favoriteTileSets.map(x => 
                            <Grid item key={x}>
                                <TilesetSocialCardLoader tssId={x}/>
                            </Grid>    
                        )}
                    </Grid>
                </TabPanel>
            </TabPanel>
        )
        let body = (
            <Box>
                {tilemapTP}
                {tilesetTP}
                {communityTP}
                {contestTP}
                {favoritesTP}
            </Box>
        )
        return (
            <Box>
                {header}
                {body}
            </Box>
        )
    }
    return <LinearProgress/>
}

export default UserProfileScreen