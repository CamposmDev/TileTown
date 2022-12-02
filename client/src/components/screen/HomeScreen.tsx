import { Grid, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import Carousel from "react-material-ui-carousel"
import { useNavigate } from "react-router"
import { AuthContext } from "src/context/auth"
import CommunityCard from "../card/CommunityCard"
import ContestCard from "../card/ContestCard"
import { TilemapSocial, TilesetSocial, Community, Contest } from "@types"
import { SocialContext } from "src/context/social"
import { ContestContext } from "src/context/social/contest"
import { CommunityContext } from "src/context/social/community"
import TilesetSocialCard from "../card/TilesetSocialCard"
import TilemapSocialCard from "../card/TilemapSocialCard"

const HomeScreen = () => {
    const auth = useContext(AuthContext)
    const nav = useNavigate()
    const [tilemaps, setTilemaps] = useState<TilemapSocial[]>([])
    const [tilesets,setTilesets] = useState<TilesetSocial[]>([])
    const [contests, setContests] = useState<Contest[]>([])
    const [comms, setComms] = useState<Community[]>([])
    const social = useContext(SocialContext)
    const contest = useContext(ContestContext)
    const community = useContext(CommunityContext)

    useEffect(() => {
        if (!auth.isLoggedIn) nav('/')
        social.getPopularTop10TMS().then(tilemaps => setTilemaps(tilemaps))
        social.getPopularTop10TSS().then(tilesets => setTilesets(tilesets))
        contest.getPopularTop10().then(contests => setContests(contests))
        community.getPopularTop10().then(communities => setComms(communities))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [social])
    const SIZE = 500
    return (
        <Grid container spacing={1} p={1} justifyContent='space-evenly'>
            <Grid item xs={6}>
                <Carousel>
                    {contests.map(x => <ContestCard c={x} />)}
                </Carousel>
            </Grid>
            <Grid item xs={6}>
                <Carousel>
                    {comms.map(x => <CommunityCard comm={x} />)}
                </Carousel>
            </Grid>
            <Grid item xs={6}>
                <Typography>{`Popular Tilemaps ${tilemaps.length === 0 ? '(Not Available)' : ''}`}</Typography>
                <Carousel sx={{height: SIZE, bgcolor: '#121212'}}>
                    {tilemaps.map(x => 
                        <TilemapSocialCard
                            tms={x} size={SIZE}
                        />
                    )}
                </Carousel>
            </Grid>
            <Grid item xs={6}>
                <Typography>{`Popular Tilesets ${tilesets.length === 0 ? '(Not Available)' : ''}`}</Typography>
                <Carousel sx={{height: SIZE, bgcolor: '#121212'}}>
                    {tilesets.map(x =>
                        <TilesetSocialCard
                            tss={x} size={SIZE}
                        />
                    )}
                </Carousel>
            </Grid>   
        </Grid>
    )
}

export default HomeScreen