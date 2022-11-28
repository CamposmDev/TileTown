import { Button, Grid, Toolbar, Typography } from "@mui/material"
import { useContext } from "react"
import Carousel from "react-material-ui-carousel"
import { AuthContext } from "src/context/auth"
import { CommunityContext } from "src/context/social/community"
import CommunitySettingsButton from "../button/CommunitySettingsButton"
import CommunityMembersModal from "../modals/CommunityMembersModal"
import { User } from "@types"

function isMember(members: string[], usrId: string): boolean {
    return Boolean(members.indexOf(usrId) !== -1)
}

const CommunityProfileScreen = () => {
    const auth = useContext(AuthContext)
    const comm = useContext(CommunityContext)

    const join = () => {
        /** Call the join function from comm */
        comm.joinCommunity()
    }

    const leave = () => {
        /** Call the leave function from comm */
        comm.leaveCommunity()
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

    const handleClick = () => [

    ]

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