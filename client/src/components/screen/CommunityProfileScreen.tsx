import { Button, Grid, Toolbar, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import Carousel from "react-material-ui-carousel"
import { AuthContext } from "src/context/auth"
import { CommunityContext } from "src/context/social/community"
import CommunitySettingsButton from "../button/CommunitySettingsButton"
import CommunityMembersModal from "../modals/CommunityMembersModal"
import { TilemapSocial, TilesetSocial, User } from "@types"
import { SnackContext } from "src/context/snack"
import TilemapCard from "../card/TilemapCard"
import TilemapSocialCard from "../card/TilemapSocialCard"
import TilesetSocialCard from "../card/TilesetSocialCard"

function isMember(members: string[], usrId: string): boolean {
    return Boolean(members.indexOf(usrId) !== -1)
}

const CommunityProfileScreen = () => {
    const auth = useContext(AuthContext)
    const comm = useContext(CommunityContext)
    const snack = useContext(SnackContext)
    const [tilemaps, setTilemaps] = useState<TilemapSocial[]>([])
    const [tilesets, setTilesets] = useState<TilesetSocial[]>([])
    useEffect(() => {
        let c = comm.currCommunity
        if (c) {
            comm.getPopularCommunityTilemaps(c.id).then(tilemaps => setTilemaps(tilemaps))
            comm.getPopularCommunityTilesets(c.id).then(tilesets => setTilesets(tilesets))
        }
    }, [])

    const join = () => {
        /** Call the join function from comm */
        comm.joinCommunity(snack).then(usr => {
            auth.refreshUser(usr)
        })
    }

    const leave = () => {
        /** Call the leave function from comm */
        comm.leaveCommunity(snack).then(usr => {
            auth.refreshUser(usr)
        })
    }
   

    let c = comm.currCommunity
    /** Size of the Carousel */
    const RES_SIZE = 550 
    let settingsButton = <div/>
    let joinButton = <Button onClick={join}>Join</Button>
    let leaveButton = <Button onClick={leave}>Leave</Button>
    let theButton = <div/>
    let usr: User | null = auth.usr
    /** If the user is the owner of the community, then show the settings button */
    if (usr && c) {
        if (usr.id.localeCompare(c.owner) === 0) {
            settingsButton = <CommunitySettingsButton/>
        } else {
            if (isMember(c.members, usr.id)) {
                theButton = leaveButton
            } else {
                theButton = joinButton
            }
        }
    }
    /** check if user is banned */
    if (usr && c && isMember(c.banned, usr.id)) {
        theButton = <div/>
    }

    let header = (
        <Grid>
            <Toolbar sx={{boxShadow: 1}}>
                <Grid container alignItems='center'>
                    <Grid item>
                        <Typography variant='h6'>{c?.name}</Typography>
                        <Typography variant='body1'>{c?.description}</Typography>
                    </Grid>
                </Grid>
                {theButton}
                <CommunityMembersModal/>
                {settingsButton}
            </Toolbar>
        </Grid>
    )
    return (
        <Grid> 
            {header}
            <Grid container mt={1} spacing={1} justifyContent='center'>
                <Grid item>
                    <Typography textAlign='center' variant='h6'>{`Popular Tilemaps ${tilesets.length === 0 ? '(Not Available)' : ''}`}</Typography>
                    <Carousel sx={{width: RES_SIZE, height: RES_SIZE+30, bgcolor: '#121212'}}>
                        {tilemaps.map(x => <TilemapSocialCard key={x.id} tms={x} size={RES_SIZE} />)}
                    </Carousel>   
                </Grid>
                <Grid item>
                    <Typography textAlign='center' variant='h6'>{`Popular Tilesets ${tilesets.length === 0 ? '(Not Available)' : ''}`}</Typography>
                    <Carousel sx={{width: RES_SIZE, height: RES_SIZE+30, bgcolor: '#121212'}}>
                        {tilesets.map(x => <TilesetSocialCard key={x.id} tss={x} size={RES_SIZE}/>)}
                    </Carousel>   
                </Grid>
            </Grid>            
        </Grid>
        
    )
}

export default CommunityProfileScreen