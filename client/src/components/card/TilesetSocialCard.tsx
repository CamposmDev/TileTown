import { Card, CardActionArea, Fade, ImageListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TilesetSocial } from "@types";
import { useState, useEffect, useContext } from "react"
import AxiosApi from "src/api/axios/AxiosApi";
import { SocialContext } from "src/context/social";
import { dateToPostedStr } from "../util/DateUtils";
import SocialBox from "./SocialBox";
import './default.css'

export default function TilesetSocialCard(props: { tss: TilesetSocial, size?: number}) {
    const social = useContext(SocialContext)
    const [username, setUsername] = useState<string>('')
    useEffect(() => {
        social.getUserUsernameById(props.tss.owner).then(x => {
            if (x) setUsername(x)
        })
    }, [social])
    const imageURL = AxiosApi.getUri() + `/media/${props.tss.imageURL}`
    let d = new Date(props.tss.publishDate)
    let pd = dateToPostedStr(d)
    let header = (
        <Box className='title-header'>
            <Typography noWrap variant='body2'>{props.tss.name}</Typography>
            <Typography noWrap variant='caption'>{`By ${username}, ${pd}`}</Typography>
        </Box>
    )
    let socialBox = <SocialBox comments={props.tss.comments.length} likes={props.tss.likes.length} views={props.tss.views} />
    let content = <img id='tile-preview' src={imageURL} alt={`Failed to get ${props.tss.imageURL}`}/>
    if (props.size) content = <img style={{height: props.size}} src={imageURL} alt={`Failed to get image ${props.tss.imageURL}`}/>
    return (
        <Fade in={true} timeout={1000}>
            <Card
            onClick={() => social.viewTilesetSocial(props.tss)}
            sx={{boxShadow: 3}}>
            <CardActionArea>
                <ImageListItem>
                    {header}
                    {socialBox}
                    {content}
                </ImageListItem>
            </CardActionArea>
        </Card>
        </Fade>
    )
}