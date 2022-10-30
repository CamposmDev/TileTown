import { EmojiEvents, Group } from "@mui/icons-material"
import { Box, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import Carousel from "react-material-ui-carousel"
import CommunitySettingsButton from "../button/CommunitySettingsButton"
import TileItemCard from "../card/TileItemCard"

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
    const SIZE = 550
    return (
        <Grid> 
            <Grid>
                <Toolbar sx={{boxShadow: 1}}>
                    <Grid container alignItems='center'>
                        <Grid item>
                            <Typography variant='h6'>RPGs Done Right</Typography>
                            <Typography variant='body1'>We don't like streets or dungeon masters.</Typography>
                        </Grid>
                    </Grid>
                    <IconButton><EmojiEvents sx={{color: 'gold'}}/></IconButton>
                    <IconButton><Group/></IconButton>
                    <CommunitySettingsButton
                        title='RPGs Done Right'
                        desc="We don't like streets or dungeon or masters."
                        visibility={'Private'}
                        members= {[
                            {
                                firstName: 'Michael',
                                lastName: 'Campos',
                                username: 'Camposm'
                            },
                            {
                                firstName: 'Peter',
                                lastName: 'Walsh',
                                username: 'PeteyLumpkins'
                            },
                            {
                                firstName: 'Jonathan',
                                lastName: 'Lemus',
                                username: 'The Gamer'
                            },
                            {
                                firstName: 'Kevin',
                                lastName: 'Lemus',
                                username: 'xKevzy'
                            },
                            {
                                firstName: 'Tuyen',
                                lastName: 'Vo',
                                username: 'Emdoiqua'
                            },
                            {
                                firstName: 'Hector',
                                lastName: 'Lemus',
                                username: 'SomeQuickGuy'
                            }
                        ]}
                    />
                </Toolbar>
            </Grid>
            <Grid container m={1} spacing={1} justifyContent='center'>
                <Grid item>
                    <Typography textAlign='center' variant='h6'>Popular Tilemaps</Typography>
                    <Carousel sx={{width: SIZE, height: SIZE+30}}>
                        {tilemaps.map((x,i) => 
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
                                width={SIZE}
                                height={SIZE}
                            />
                        </Grid>)}
                    </Carousel>   
                </Grid>
                <Grid item>
                    <Typography textAlign='center' variant='h6'>Popular Tilesets</Typography>
                    <Carousel sx={{width: SIZE, height: SIZE+30}}>
                        {tilesets.map((x,i) => 
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
                                width={SIZE}
                                height={SIZE}
                            /></Grid>)}
                    </Carousel>   
                </Grid>
            </Grid>            
        </Grid>
        
    )
}

export default CommunityProfileScreen