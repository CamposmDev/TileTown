import { AppBar, Box, Button, Grid, LinearProgress, scopedCssBaselineClasses, Skeleton, Stack, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "src/context/auth";
import { SocialContext } from "src/context/social";
import { SocialActionType } from "src/context/social/SocialAction";
import { Community, Contest, Tileset, TilesetSocial, User } from "@types";
import CommunityCard from "../card/CommunityCard";
import ContestCard from "../card/ContestCard";
import TileItemCard from "../card/TileItemCard";
import UserProfileBox from "../UserProfileBox";
import { CommunityContext } from "src/context/social/community";
import TilesetCard from "../card/TilesetCard";
import { ProfileContext } from "src/context/profile";
import { useParams } from "react-router";
import { ContestContext } from "src/context/social/contest";

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
    const { id } = useParams()
    const [user, setUser] = useState<User>()
    const [contests, setContests] = useState<Contest[]>([])
    const [comms, setComms] = useState<Community[]>([])
    const auth = useContext(AuthContext)
    const social = useContext(SocialContext)
    const contest = useContext(ContestContext)
    const comm = useContext(CommunityContext)
    const nav = useNavigate()
    const [value, setValue] = useState(0)
    
    useEffect(() => {
        if (!id || !auth.isLoggedIn()) {
            nav('/')
        } else {
            social.getUserById(id).then(user => {
                if (user) {
                    setUser(user)
                    contest.getContestsById(user.joinedContests).then(arr => setContests(arr))
                    comm.getCommunitiesById(user.joinedCommunities).then(arr => setComms(arr))            
                }
            })
        }
    }, [id])

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

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
                <Box mt={1} mb={1} mr={1}>
                    {profileCard}
                </Box>
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label="Tilemaps" />
                    <Tab label="Tilesets" />
                    <Tab label="Contests & Partcipation" />
                    <Tab label='Communities' />
                </Tabs>
            </Toolbar>
        )
        let body = (
            <Box>
                <TabPanel value={value} index={0}>
                    <Grid 
                        container 
                        spacing={1} 
                        mt={1}
                    >
                        
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid container 
                        spacing={1}>
                            {user.tilesets.map(x =>
                                    <Grid item key={x}>
                                        <TilesetCard
                                            tilesetId={x}
                                        />
                                    </Grid>
                            )}
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Grid container 
                        spacing={1}
                        mt={1}
                    >
                        {contests.map(x => 
                            <Grid item key={x.id} xs={3}>
                                <ContestCard
                                    c={x}
                                />
                            </Grid>)}
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Grid container 
                        spacing={1}
                        mt={1}
                    >
                        {comms.map(x => 
                            <Grid item key={x.id} xs={3}>
                                <CommunityCard
                                    comm={x}
                                />
                            </Grid>)}
                    </Grid>
                </TabPanel>
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