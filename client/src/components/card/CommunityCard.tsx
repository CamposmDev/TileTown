import { Card, CardActionArea, CardContent, Fade, Stack, Typography } from "@mui/material"
import { Community } from "@types"
import { formatToSocialStr } from '../util/NumberUtils'
import { useContext, useState, useEffect } from "react"
import { CommunityContext } from "src/context/social/community"
import { TilesetSocial, TilemapSocial } from "@types"

interface Props {
    comm: Community
}

const CommunityCard = (props: Props) => {
    const comm = useContext(CommunityContext)
    const [tilesets, setTilesets] = useState<TilesetSocial[]>([])
    const [tilemaps, setTilemaps] = useState<TilemapSocial[]>([])
    useEffect(() => {
        comm.getPopularCommunityTilemaps(props.comm.id).then(tilemaps => setTilemaps(tilemaps))
        comm.getPopularCommunityTilesets(props.comm.id).then(tilesets => setTilesets(tilesets))
    }, [])
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
                        <Typography variant='caption'><b>{tilemaps.length}</b>&ensp;Tilemaps</Typography>
                        <Typography variant='caption'><b>{tilesets.length}</b>&ensp;Tilesets</Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
        </Fade>
    )
}

export default CommunityCard