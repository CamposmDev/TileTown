import { Button, Grid } from "@mui/material"
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
    let items = 
    <Grid>
        <Grid item>
            <ForumPostCard
                author={{firstName: 'Michael', lastName: 'Campos', username: 'Camposm'}}
                comments={232}
                desc={'This is a description post'}
                dislikes={39034}
                likes={39034}
                title={'This is another post'}
                publishDate={new Date(2022,9,27)}
                views={3490340}
            />
        </Grid>
        <Grid item>
            <ForumPostCard
                author={{firstName: 'Michael', lastName: 'Campos', username: 'Camposm'}}
                comments={232}
                desc={'This is a description post'}
                dislikes={39034}
                likes={39034}
                title={'This is another other post'}
                publishDate={new Date(2022,9,27)}
                views={3490340}
            />
        </Grid>
        <Grid item>
            <ForumPostCard
                author={{firstName: 'Michael', lastName: 'Campos', username: 'Camposm'}}
                comments={232}
                desc={'This is a description post'}
                dislikes={39034}
                likes={39034}
                title={'This is a post'}
                publishDate={new Date(2022,9,27)}
                views={3490340}
            />
        </Grid>
        <Grid item>
            <ForumPostCard
                author={{firstName: 'Michael', lastName: 'Campos', username: 'Camposm'}}
                comments={232}
                desc={'This is a description post'}
                dislikes={39034}
                likes={39034}
                title={'This is a post'}
                publishDate={new Date(2022,9,27)}
                views={3490340}
            />
        </Grid>
        <Grid item>
            <ForumPostCard
                author={{firstName: 'Michael', lastName: 'Campos', username: 'Camposm'}}
                comments={232}
                desc={'This is a description post'}
                dislikes={39034}
                likes={39034}
                title={'This is another post'}
                publishDate={new Date(2022,9,27)}
                views={3490340}
            />
        </Grid>
        <Grid item>
            <ForumPostCard
                author={{firstName: 'Michael', lastName: 'Campos', username: 'Camposm'}}
                comments={232}
                desc={'This is a description post'}
                dislikes={39034}
                likes={39034}
                title={'This is another other post'}
                publishDate={new Date(2022,9,27)}
                views={3490340}
            />
        </Grid>
        <Grid item>
            <ForumPostCard
                author={{firstName: 'Michael', lastName: 'Campos', username: 'Camposm'}}
                comments={232}
                desc={'This is a description post'}
                dislikes={39034}
                likes={39034}
                title={'This is a post'}
                publishDate={new Date(2022,9,27)}
                views={3490340}
            />
        </Grid>
        <Grid item>
            <ForumPostCard
                author={{firstName: 'Michael', lastName: 'Campos', username: 'Camposm'}}
                comments={232}
                desc={'This is a description post'}
                dislikes={39034}
                likes={39034}
                title={'This is a post'}
                publishDate={new Date(2022,9,27)}
                views={3490340}
            />
        </Grid>
    </Grid>
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
            break
        case SearchCategory.Users:
            items = <Grid container 
                justifyContent={'center'}
                alignItems={'center'}
                spacing={1}
                mt={1}>
                {[1,1,1,1,,1,1,1,1,1,1,1].map((x,i) => 
                    <Grid item>
                        <UserProfileCard
                        firstName='Michael'
                        lastName="Campos"
                        username="Camposm"
                        fancy={true}
                    />
                    </Grid>
                )}
            </Grid>
            break
        case SearchCategory.Communities:
            items = <Grid container 
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
            break
        case SearchCategory.Contests:
            items = <Grid container 
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