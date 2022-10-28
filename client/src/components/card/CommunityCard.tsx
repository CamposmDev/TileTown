import { Box, Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material"

const formatMembers = (members: number): string => {
    if (members >= 1_000_000_000_000) return (members / 1_000_000_000_000).toFixed(1) + 'T Members'
    if (members >= 1_000_000_000) return (members / 1_000_000_000).toFixed(1) + 'B Members'
    if (members >= 1_000_000) return (members / 1_000_000).toFixed(1) + 'M Members'
    if (members >= 1000) return (members / 1000).toFixed(1) + 'K Members'
    return members + ' Members'
}

interface Props {
    commName: string,
    commDesc: string,
    numOfMembers: number,
    numOfTilemaps: number,
    numOfTilesets: number
}

const CommunityCard = (props: Props) => {
    return (
        <Card>
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
                                <Typography variant='caption'>{formatMembers(props.numOfMembers)}</Typography>
                            }/>
                            <Box/>
                        </Stack>
                    <Stack direction='column'>
                        <Typography variant='caption'><b>{props.numOfTilemaps}</b>&ensp;Tilemaps</Typography>
                        <Typography variant='caption'><b>{props.numOfTilesets}</b>&ensp;Tilesets</Typography>
                    </Stack>
                    
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CommunityCard