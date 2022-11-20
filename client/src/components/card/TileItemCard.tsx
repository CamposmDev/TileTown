import { Comment, Download, Share, StarBorder, ThumbUp, Visibility } from "@mui/icons-material"
import {AppBar, Box, Button, Card, CardActionArea, Grid, CardContent, Dialog, IconButton, ImageListItem, Stack, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import { MouseEventHandler, useContext, useState } from "react"
import { AuthContext } from "src/context/auth"
import { SLIDE_DOWN_TRANSITION } from "../util/Constants"
import { parseDateToStr } from "../util/DateUtils"
import { formatToSocialStr } from "../util/NumberUtils"
import CommentCard from "./CommentCard"
import './default.css'
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
    width?: number
    height?: number
}

interface ModalProps {
    tilemapProps: Props
    open: boolean
    callback: MouseEventHandler<HTMLButtonElement>
}

const TileItemModal = (props: ModalProps) => {
    const auth = useContext(AuthContext)
    return (
        <Dialog open={props.open} fullScreen onClose={props.callback} TransitionComponent={SLIDE_DOWN_TRANSITION}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <Stack alignItems={'center'} direction='row' sx={{flexGrow: 1}}>
                        <IconButton size='large'>
                            <StarBorder sx={{color: 'gold'}} />
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
                                        <IconButton disabled><Visibility  sx={{transform: 'scale(1.25)'}}/></IconButton>
                                        <Typography>{formatToSocialStr(props.tilemapProps.views)}</Typography>
                                    </Stack>
                                    <Stack direction='row' sx={{alignItems: 'center'}}>
                                        <IconButton disabled><Comment sx={{transform: 'scale(1.25)'}}/></IconButton>
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
                        {auth.isGuest() ? <div/> : <TextField label='Comment' fullWidth/>}
                        <Grid item flexGrow={1} mt={1}>
                            {}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
    )
}



const TileItemCard = (props: Props) => {
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
    if (props.width && props.height) {
        return (
            <Grid item>
                <Card onClick={() => setOpen(true)} sx={{boxShadow: 3}}>
                    <CardActionArea >
                        <ImageListItem>
                            <img style={{
                                width: props.width,
                                height: props.width,
                                objectFit: 'cover',
                                objectPosition: 'center'
                            }} src={props.preview} alt=''
                            />
                        {headerBox}
                        <SocialBox 
                            views={props.views} 
                            comments={props.comments} 
                            likes={props.likes} />
                        </ImageListItem>
                    </CardActionArea>
                </Card>
                <TileItemModal tilemapProps={props} open={open} callback={handleClose}/>
            </Grid>
        )
    }
    return (
        <Grid item>
            <Card onClick={() => setOpen(true)} sx={{boxShadow: 3}}>
                <CardActionArea >
                    <ImageListItem>
                        <img id={'tile-preview'} src={props.preview} alt=''
                        />
                    {headerBox}
                    <SocialBox 
                        views={props.views} 
                        comments={props.comments} 
                        likes={props.likes} />
                    </ImageListItem>
                </CardActionArea>
            </Card>
            <TileItemModal tilemapProps={props} open={open} callback={handleClose}/>
        </Grid>
    )
}

export default TileItemCard