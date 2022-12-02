import { Card, CardActionArea, CardContent, Fade, Stack, Typography } from "@mui/material"
import { Community } from "@types"
import { formatToSocialStr } from '../util/NumberUtils'
import { useContext } from "react"
import { CommunityContext } from "src/context/social/community"

interface Props {
    comm: Community
}

const CommunityCard = (props: Props) => {
    const comm = useContext(CommunityContext)
    return (
        <Fade in={true} timeout={1000}>
        <Card onClick={() => {
            comm.viewCommunity(props.comm)
        }} sx={{boxShadow: 3}}>
            <CardActionArea>
            <CardContent>
                        <Typography>{props.comm.name}</Typography>
                        <Typography variant='caption'>{props.comm.description}</Typography>
                        <Stack direction='row'>
                            <Card sx={{
                                borderRadius: 3,
                                paddingInline: 1,
                                boxShadow: 1,
                                bgcolor: 'primary.main',
                                color: 'white'
                            }} children={
                                <Typography variant='caption'>{formatToSocialStr(props.comm.members.length, 'Members')}</Typography>
                            }/>
                            <Card/>
                        </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography variant='caption'><b>{props.comm.members.length}</b>&ensp;Tilemaps</Typography>
                        <Typography variant='caption'><b>{props.comm.members.length}</b>&ensp;Tilesets</Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
        </Fade>
    )
}

export default CommunityCard