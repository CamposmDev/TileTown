import { Grid, Typography } from "@mui/material"
import { useContext, useEffect } from "react"
import Carousel from "react-material-ui-carousel"
import { useNavigate } from "react-router"
import { AuthContext } from "src/context/auth"
import CommunityCard from "../card/CommunityCard"
import ContestCard from "../card/ContestCard"

const HomeScreen = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!auth.isLoggedIn) navigate('/')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const SIZE = 512
    return (
        <Grid container spacing={1}>
            <Grid container m={1} justifyContent='space-evenly'>
                
                {/* <Grid item>
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

                <Grid item xs={2}>
                    <Grid container 
                        justifyContent={'center'}
                        >
                        <Typography variant='h6'>Popular Contests</Typography>
                        <Carousel sx={{width: SIZE}}>
                            {[1,1,1,1,1,1,1,1,1,1,1,1].map((x,i) => 
                            <Grid item>
                                <ContestCard
                                    payload={{
                                        contestName: 'A New Contest',
                                        startDate: new Date(2022,10,31),
                                        endDate: new Date(2022,11,5),
                                        owner: 'Camposm',
                                        participates: (Math.random() * 100)
                                    }}
                                />    
                            </Grid>)}
                        </Carousel>
                    </Grid>
                    <Grid container mt={7}
                        justifyContent={'center'}
                        >
                        <Typography variant='h6'>Popular Communities</Typography>
                        <Carousel sx={{width: SIZE}}>
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
                        </Carousel>
                    </Grid>
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
                </Grid> */}
            </Grid>         
        </Grid>
    )
}

export default HomeScreen