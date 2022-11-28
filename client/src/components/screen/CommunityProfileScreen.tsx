import { ConstructionOutlined } from "@mui/icons-material"
import { Grid, Toolbar, Typography } from "@mui/material"
import userEvent from "@testing-library/user-event"
import { useContext } from "react"
import Carousel from "react-material-ui-carousel"
import { useNavigate } from "react-router"
import { AuthContext } from "src/context/auth"
import { CommunityContext } from "src/context/social/community"
import CommunitySettingsButton from "../button/CommunitySettingsButton"
import TileItemCard from "../card/TileItemCard"
import CommunityContestsModal from "../modals/CommunityContestsModal"
import CommunityMembersModal from "../modals/CommunityMembersModal"

let tilemaps = [{
    preview: 'https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/level5_1.png',
    tilemapName: 'McBendorjee vs Robots Level 5-1',
    author: 'Camposm',
    publishDate: new Date(2022,11,5),
    views: Math.random() * 3000,
    comments: Math.random() * 3000,
    likes: Math.random() * 10000,
    tags: ['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']
},
{
    preview: 'https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/Level5_2.png',
    tilemapName: 'McBendorjee vs Robots Level 5-2',
    author: 'Camposm',
    publishDate: new Date(2022,11,5),
    views: Math.random() * 3000,
    comments: Math.random() * 3000,
    likes: Math.random() * 3000,
    tags: ['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']

}]

let tilesets = [{
    preview: 'https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level1/level1and2tileset.png',
    tilemapName: 'McBendorjee vs Robots Tileset',
    author: 'Emdoiqua',
    publishDate: new Date(2022,11,5),
    views: Math.random() * 3000,
    comments: Math.random() * 3000,
    likes: Math.random() * 3000,
    tags: ['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']
    },
    {
        preview: 'https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/mc_tileset.png',
        tilemapName: 'McBendorjee vs Robots Tileset',
        author: 'Emdoiqua',
        publishDate: new Date(2022,11,5),
        views: Math.random() * 3000,
        comments: Math.random() * 3000,
        likes: Math.random() * 3000,
        tags: ['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']
},{
    preview: 'https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level1/level1and2tileset.png',
    tilemapName: 'McBendorjee vs Robots Tileset',
    author: 'Camposm',
    publishDate: new Date(2022,11,5),
    views: Math.random() * 3000,
    comments: Math.random() * 3000,
    likes: Math.random() * 3000,
    tags: ['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']
    },
    {
        preview: 'https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/mc_tileset.png',
        tilemapName: 'McBendorjee vs Robots Tileset',
        author: 'H8TER$HADE$',
        publishDate: new Date(2022,11,5),
        views: Math.random() * 3000,
        comments: Math.random() * 3000,
        likes: Math.random() * 3000,
        tags: ['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']
}]

const CommunityProfileScreen = () => {
    const auth = useContext(AuthContext)
    const comm = useContext(CommunityContext)
    const nav = useNavigate()
    let c = comm.getCurrentCommunity()
    const RES_SIZE = 550
    let settings = <div/>
    let usr = auth.usr
    if (usr && c) {
        if (usr.id.localeCompare(c.owner) === 0) {
            settings = <CommunitySettingsButton/>
        }
    }
    return (
        <Grid> 
            <Grid>
                <Toolbar sx={{boxShadow: 1}}>
                    <Grid container alignItems='center'>
                        <Grid item>
                            <Typography variant='h6'>{c?.name}</Typography>
                            <Typography variant='body1'>{c?.description}</Typography>
                        </Grid>
                    </Grid>
                    {/* <CommunityContestsModal/> */}
                    <CommunityMembersModal/>
                    {settings}
                </Toolbar>
            </Grid>
            <Grid container m={1} spacing={1} justifyContent='center'>
                <Grid item>
                    <Typography textAlign='center' variant='h6'>Popular Tilemaps</Typography>
                    <Carousel sx={{width: RES_SIZE, height: RES_SIZE+30}}>
                        {/* {tilemaps.map((x,i) => 
                        <Grid item>
                            <TileItemCard key={i}
                                author={x.author}
                                comments={x.comments}
                                likes={x.likes}
                                preview={x.preview}
                                publishDate={x.publishDate}
                                tags={x.tags}
                                tilemapName={x.tilemapName}
                                views={x.views}
                                width={RES_SIZE}
                                height={RES_SIZE}
                            />
                        </Grid>)} */}
                    </Carousel>   
                </Grid>
                <Grid item>
                    <Typography textAlign='center' variant='h6'>Popular Tilesets</Typography>
                    <Carousel sx={{width: RES_SIZE, height: RES_SIZE+30}}>
                        {/* {tilesets.map((x,i) => 
                        <Grid item>
                            <TileItemCard key={i}
                                author={x.author}
                                comments={x.comments}
                                likes={x.likes}
                                preview={x.preview}
                                publishDate={x.publishDate}
                                tags={x.tags}
                                tilemapName={x.tilemapName}
                                views={x.views}
                                width={RES_SIZE}
                                height={RES_SIZE}
                            /></Grid>)} */}
                    </Carousel>   
                </Grid>
            </Grid>            
        </Grid>
        
    )
}

export default CommunityProfileScreen