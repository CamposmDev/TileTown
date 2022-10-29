import { Comment, Download, Share, Star, StarBorder, ThumbDown, ThumbUp, Visibility } from "@mui/icons-material"
import {AppBar, Box, Button, Card, CardActionArea, CardContent, Dialog, Divider, Fab, Grid, IconButton, ImageListItem, Slide, Stack, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import { MouseEventHandler, useState } from "react"
import UserProfileBox from "../UserProfileBox"
import { parseDateToStr } from "../util/DateUtils"
import { formatToSocialStr } from "../util/NumberUtils"
import CommentCard from "./CommentCard"
import './default.css'
import UserProfileCard from "./UserProfileCard"
import SocialBox from "./SocialBox"
import TagCard from "./TagCard"

interface Props {
    preview: string,
    tilemapName: string,
    author: string,
    publishDate: Date,
    views: number,
    comments: number,
    likes: number,
    tags: string[]
}

interface ModalProps {
    tilemapProps: Props
    open: boolean
    callback: MouseEventHandler<HTMLButtonElement>
}

const TilemapModal = (props: ModalProps) => {
    return (
        <Dialog open={props.open} fullScreen onClose={props.callback}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <Stack alignItems={'center'} direction='row' sx={{flexGrow: 1}}>
                        <IconButton size='large'>
                            <Star sx={{color: 'gold'}} />
                        </IconButton>
                        <Typography variant="h6" component="div">
                            {props.tilemapProps.tilemapName}
                        </Typography>
                    </Stack>
                    <Stack>
                        <Button color="inherit" onClick={props.callback}>Close</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Grid container p={1} spacing={1}>
                <Grid item>
                    <Card>
                        <div className='tile-large-root'>
                            <img id='tile-large-preview' src={props.tilemapProps.preview} alt=''/>
                        </div>
                    </Card> 
                </Grid>
                <Grid item xs={12} sm container alignContent={"start"}>
                    <Grid item sm>
                        <Card><CardContent>
                            <Stack direction={'row'}>
                                <Box flexGrow={1}>
                                    <Typography>Author:&ensp;{props.tilemapProps.author}</Typography>
                                    <Typography>Collaborators:&ensp;{'Emdoiqua'}</Typography>
                                    <Typography>Community:&ensp;{'None'}</Typography>
                                    <Typography>Published:&ensp;{parseDateToStr(props.tilemapProps.publishDate)}</Typography>
                                    <Stack direction={'row'} spacing={1}>
                                        <Typography>Tags:</Typography>
                                        {props.tilemapProps.tags.map((x,i) => <TagCard key={props.tilemapProps.tilemapName + '-tag-' + i} name={x}/>)}
                                    </Stack>
                                </Box>
                                <Stack spacing={1}>
                                    <Stack direction='row' sx={{alignItems: 'center'}}>
                                        <IconButton disabled><Visibility  sx={{transform: 'scale(1.25)', color: 'black'}}/></IconButton>
                                        <Typography>{formatToSocialStr(props.tilemapProps.views)}</Typography>
                                    </Stack>
                                    <Stack direction='row' sx={{alignItems: 'center'}}>
                                        <IconButton disabled><Comment sx={{transform: 'scale(1.25)', color: 'black'}}/></IconButton>
                                        <Typography>{formatToSocialStr(props.tilemapProps.comments)}</Typography>
                                    </Stack>
                                    <Stack direction='row' sx={{alignItems: 'center'}}>
                                        <IconButton color="primary"><ThumbUp sx={{transform: 'scale(1.25)'}}/></IconButton>
                                        <Typography>{formatToSocialStr(props.tilemapProps.likes)}</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </CardContent></Card>
                    </Grid>
                    <Grid container>
                        <Button startIcon={<Download/>} size='small'  variant='contained'>Download</Button>
                        <Button startIcon={<Share/>}  size='small' variant='contained'>Share</Button>
                    </Grid>
                    <Grid container mt={1}>
                        <TextField label='Comment' fullWidth/>
                        <Grid item flexGrow={1} mt={1}>
                            <CommentCard/>
                            <CommentCard/>
                            <CommentCard/>
                            <CommentCard/>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
    )
}



const TilemapCard = (props: Props) => {
    const [open, setOpen] = useState(false)

    const handleClose: MouseEventHandler<HTMLButtonElement> = (e) => setOpen(false)

    const headerBox = 
        <Tooltip title={props.tilemapName} followCursor>
            <div className='title-header'>
                <Typography noWrap variant='body2'>{props.tilemapName}</Typography>
                <div >
                <Typography noWrap variant='caption'>By:&ensp;{props.author}</Typography>

                </div>
            </div>
        </Tooltip>
    return (
        <div>
            <Card onClick={() => setOpen(true)}>
                <CardActionArea >
                    <ImageListItem>
                        <img id={'tile-preview'} src={props.preview} alt=''
                            // src='https://camo.githubusercontent.com/cd6351505c5304f9cb3db2b1c598dccfb34361b6972789e21b4c998ad72435ff/687474703a2f2f692e696d6775722e636f6d2f464a614178534c2e706e67'
                        />
                    {headerBox}
                    <SocialBox 
                        views={props.views} 
                        comments={props.comments} 
                        likes={props.likes} />
                    </ImageListItem>
                </CardActionArea>
            </Card>
            <TilemapModal tilemapProps={props} open={open} callback={handleClose}/>
        </div>
    )
}

export default TilemapCard