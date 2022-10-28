import { Card, CardActionArea, CardContent, Grid, Stack, Typography, IconButton, Box } from "@mui/material"
import { Comment, Visibility } from "@mui/icons-material"
import { format } from '../../util/NumberUtils'
import { parseDateToPostedStr } from '../../util/DateUtils' 

const formatDesc = (desc: string): string => {
    const LIMIT = 100
    return desc.length >= LIMIT ? desc.substring(0,LIMIT).concat('...') : desc
}

interface Props {
    title: string,
    author: string,
    publishDate: Date
    desc: string,
    views: number,
    comments: number,
}

const ForumPostCard = (props: Props) => {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Grid container alignItems='center'>
                        <Grid item>
                            <Typography variant='h6'>{props.title}</Typography>
                            <Typography variant='caption'>{formatDesc(props.desc)}</Typography>
                            <Stack alignItems='center' direction='row'>
                                    <Typography variant='caption'><b>By</b>:&ensp;{props.author},&ensp;</Typography>
                                    <Typography variant='caption'>{parseDateToPostedStr(props.publishDate)}</Typography>
                            </Stack>
                        </Grid>
                        <Box flexGrow={1} mr={3}/>
                        <Grid item>
                            <Stack spacing={1}>
                                <Stack alignItems='center' direction='row'>
                                    <Visibility/>
                                    <Typography ml={1} variant='caption'>{format(props.views)}</Typography>
                                </Stack>
                                <Stack alignItems='center' direction='row'>
                                    <Comment/>
                                    <Typography ml={1} variant='caption'>{format(props.comments)}</Typography>
                                </Stack> 
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
                
            </CardActionArea>
        </Card>
    )
}

export default ForumPostCard