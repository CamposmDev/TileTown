import { Grid } from "@mui/material"
import ForumPostCard from "../../card/ForumPostCard"
import TilemapCard from "../../card/TileItemCard"
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
            items = 
                <Grid container spacing={1} ml={5}>
                    <Grid item>
                        <TilemapCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/level5_1.png'
                            tilemapName='McBendorjee vs Robots Level 5-1'
                            author='Camposm'
                            publishDate={new Date(2022,11,5)}
                            views={23923092}
                            comments={39903}
                            likes={293020}
                            // tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380', 'mcbendorjee']}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TilemapCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/level5_1.png'
                            tilemapName='McBendorjee vs Robots Level 5-1'
                            author='Camposm'
                            publishDate={new Date(2022,11,5)}
                            views={23923092}
                            comments={39903}
                            likes={293020}
                            // tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380', 'mcbendorjee']}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TilemapCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/level5_1.png'
                            tilemapName='McBendorjee vs Robots Level 5-1'
                            author='Camposm'
                            publishDate={new Date(2022,11,5)}
                            views={23923092}
                            comments={39903}
                            likes={293020}
                            // tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380', 'mcbendorjee']}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TilemapCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/level5_1.png'
                            tilemapName='McBendorjee vs Robots Level 5-1'
                            author='Camposm'
                            publishDate={new Date(2022,11,5)}
                            views={23923092}
                            comments={39903}
                            likes={293020}
                            // tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380', 'mcbendorjee']}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TilemapCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/level5_1.png'
                            tilemapName='McBendorjee vs Robots Level 5-1'
                            author='Camposm'
                            publishDate={new Date(2022,11,5)}
                            views={23923092}
                            comments={39903}
                            likes={293020}
                            // tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380', 'mcbendorjee']}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TilemapCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/level5_1.png'
                            tilemapName='McBendorjee vs Robots Level 5-1'
                            author='Camposm'
                            publishDate={new Date(2022,11,5)}
                            views={23923092}
                            comments={39903}
                            likes={293020}
                            // tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380', 'mcbendorjee']}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TilemapCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/level5_1.png'
                            tilemapName='McBendorjee vs Robots Level 5-1'
                            author='Camposm'
                            publishDate={new Date(2022,11,5)}
                            views={23923092}
                            comments={39903}
                            likes={293020}
                            // tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380', 'mcbendorjee']}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TilemapCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/level5_1.png'
                            tilemapName='McBendorjee vs Robots Level 5-1'
                            author='Camposm'
                            publishDate={new Date(2022,11,5)}
                            views={23923092}
                            comments={39903}
                            likes={293020}
                            // tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380', 'mcbendorjee']}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TilemapCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/level5_1.png'
                            tilemapName='McBendorjee vs Robots Level 5-1'
                            author='Camposm'
                            publishDate={new Date(2022,11,5)}
                            views={23923092}
                            comments={39903}
                            likes={293020}
                            // tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380', 'mcbendorjee']}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
                    <Grid item>
                        <TilemapCard
                            preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/level5_1.png'
                            tilemapName='McBendorjee vs Robots Level 5-1'
                            author='Camposm'
                            publishDate={new Date(2022,11,5)}
                            views={23923092}
                            comments={39903}
                            likes={293020}
                            // tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380', 'mcbendorjee']}
                            tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
                        />
                    </Grid>
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