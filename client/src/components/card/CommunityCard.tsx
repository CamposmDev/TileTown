import { Box, Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router"
import { formatToSocialStr } from '../util/NumberUtils'

interface Props {
    commName: string,
    commDesc: string,
    numOfMembers: number,
    numOfTilemaps: number,
    numOfTilesets: number
}

const CommunityCard = (props: Props) => {
    const nav = useNavigate()
    return (
        <Card onClick={() => {
            nav('/community/rpgs-done-right')
        }}>
            <CardActionArea>
                <CardContent>
                        <Typography>{props.commName}</Typography>
                        <Typography variant='caption'>{props.commDesc}</Typography>
                        <Stack direction='row'>
                            <Box sx={{
                                borderRadius: 3,
                                paddingInline: 1,
                                boxShadow: 1,
                                bgcolor: 'secondary.main',
                                color: 'white'
                            }} children={
                                <Typography variant='caption'>{formatToSocialStr(props.numOfMembers, 'Members')}</Typography>
                            }/>
                            <Box/>
                        </Stack>
                    <Stack direction='column'>
                        <Typography variant='caption'><b>{props.numOfTilemaps.toFixed(0)}</b>&ensp;Tilemaps</Typography>
                        <Typography variant='caption'><b>{props.numOfTilesets.toFixed(0)}</b>&ensp;Tilesets</Typography>
                    </Stack>
                    
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CommunityCard