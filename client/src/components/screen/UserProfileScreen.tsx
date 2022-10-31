import { ArrowDropDown, MoreVert } from "@mui/icons-material";
import { Avatar, Box, Button, Grid, IconButton, Stack, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import { useState } from "react";
import CommunityCard from "../card/CommunityCard";
import ContestCard from "../card/ContestCard";
import TileItemCard from "../card/TileItemCard";
import UserProfileBox from "../UserProfileBox";

interface Props {
    firstName: string,
    lastName: string,
    username: string
}

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
    const [value, setValue] = useState(0)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Box>
            <Stack direction='row' justifyItems='center'>
                <Box mt={1}>
                    <UserProfileBox
                        firstName={'Michael'}
                        lastName={'Campos'}
                        username={'Camposm'}
                        size={'profile'}
                        />
                </Box>
            </Stack>
            <Grid item container>
                <Box>
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
                    <TabPanel value={value} index={0}>
                    <Grid 
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
                    <Grid item>
                        <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level1/Level1_1_alt.png'
                            tilemapName='McBendorjee vs Robots Level 1-1'
                            author='H8TER$HADE$'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level1/Level1_2_alt.png'
                            tilemapName='McBendorjee vs Robots Level 1-2'
                            author='H8TER$HADE$'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level1/Level1_3_alt.png'
                            tilemapName='McBendorjee vs Robots Level 1-3'
                            author='H8TER$HADE$'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level1/Level1_4_alt.png'
                            tilemapName='McBendorjee vs Robots Level 1-4'
                            author='H8TER$HADE$'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/level5_1.png'
                            tilemapName='McBendorjee vs Robots Level 5-1'
                            author='Camposm'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 10000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/Level5_2.png'
                            tilemapName='McBendorjee vs Robots Level 5-2'
                            author='Camposm'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/Level5_3.png'
                            tilemapName='McBendorjee vs Robots Level 5-3'
                            author='Camposm'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/Level5_4.png'
                            tilemapName='McBendorjee vs Robots Level 5-4'
                            author='Camposm'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/level5_1.png'
                            tilemapName='McBendorjee vs Robots Level 5-1'
                            author='Camposm'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level1/Level1_1_alt.png'
                            tilemapName='McBendorjee vs Robots Level 1-1'
                            author='H8TER$HADE$'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level1/Level1_2_alt.png'
                            tilemapName='McBendorjee vs Robots Level 1-2'
                            author='H8TER$HADE$'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level1/Level1_3_alt.png'
                            tilemapName='McBendorjee vs Robots Level 1-3'
                            author='H8TER$HADE$'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level6/Level6_4.png'
                            tilemapName='McBendorjee vs Robots Level 6-4'
                            author='Camposm'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    <Grid container 
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
                <Grid item>
                    <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/mc_tileset.png'
                            tilemapName='McBendorjee vs Robots Tileset'
                            author='Emdoiqua'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                </Grid>
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
                <Grid item>
                    <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/mc_tileset.png'
                            tilemapName='McBendorjee vs Robots Tileset'
                            author='Emdoiqua'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                </Grid>
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
                <Grid item>
                    <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/mc_tileset.png'
                            tilemapName='McBendorjee vs Robots Tileset'
                            author='Emdoiqua'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                </Grid>
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
                <Grid item>
                    <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/mc_tileset.png'
                            tilemapName='McBendorjee vs Robots Tileset'
                            author='Emdoiqua'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                </Grid>
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
                <Grid item>
                    <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/mc_tileset.png'
                            tilemapName='McBendorjee vs Robots Tileset'
                            author='Emdoiqua'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                </Grid>
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
                <Grid item>
                    <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/mc_tileset.png'
                            tilemapName='McBendorjee vs Robots Tileset'
                            author='Emdoiqua'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                </Grid>
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
                <Grid item>
                    <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/mc_tileset.png'
                            tilemapName='McBendorjee vs Robots Tileset'
                            author='Emdoiqua'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                </Grid>
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
                <Grid item>
                    <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/mc_tileset.png'
                            tilemapName='McBendorjee vs Robots Tileset'
                            author='Emdoiqua'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                </Grid>
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
                <Grid item>
                    <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/mc_tileset.png'
                            tilemapName='McBendorjee vs Robots Tileset'
                            author='Emdoiqua'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                </Grid>
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
                <Grid item>
                    <TileItemCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/mc_tileset.png'
                            tilemapName='McBendorjee vs Robots Tileset'
                            author='Emdoiqua'
                            publishDate={new Date(2022,11,5)}
                            views={Math.random() * 3000}
                            comments={Math.random() * 3000}
                            likes={Math.random() * 3000}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                </Grid>
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
                </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Grid container 
                            justifyContent={'center'}
                            spacing={1}
                            mt={1}>
                        {[1,1,1,1,1,1,1,1,1,1,1,1].map((x,i) => 
                            <Grid item>
                                <ContestCard
                                    payload={{
                                        contestName: 'A New Contest',
                                        startDate: new Date(2022,10,31),
                                        endDate: new Date(2022,11,5),
                                        ownerName: 'Camposm',
                                        contestTheme: 'A Theme',
                                        numOfParticipates: (Math.random() * 100)
                                    }}
                                />    
                            </Grid>)}
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                    <Grid container 
                justifyContent={'center'}
                spacing={1}
                mt={1}>
                {[1,1,1,1,1,1,1,1,1,1,1,1].map((x,i) => 
                    <Grid item>
                        <CommunityCard
                            commName="RPGs Done Right"
                            commDesc="We don't like streets or dungoen masters"
                            numOfMembers={Math.random() * 100}
                            numOfTilemaps={Math.random() * 100}
                            numOfTilesets={Math.random() * 100}
                        />    
                    </Grid>)}
            </Grid>
                    </TabPanel>
                </Box>
            </Grid>
        </Box>
    )
}

export default UserProfileScreen