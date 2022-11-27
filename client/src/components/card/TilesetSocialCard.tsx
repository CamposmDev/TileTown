import { Card, CardActionArea, ImageListItem, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TilesetSocial } from "@types";
import { useState, useEffect, useContext } from "react"
import AxiosApi from "src/api/axios/AxiosApi";
import { SocialContext } from "src/context/social";
import { dateToPostedStr } from "../util/DateUtils";
import SocialBox from "./SocialBox";

export default function TilesetSocialCard(props: { tss: TilesetSocial}) {
    const social = useContext(SocialContext)
    const [username, setUsername] = useState<string>('')
    useEffect(() => {
        social.getUserById(props.tss.owner).then(x => {
            if (x) setUsername(x.username)
        })
    }, [social])
    const imageURL = AxiosApi.getUri() + `/media/${props.tss.imageURL}`
    let d = new Date(props.tss.publishDate)
    let pd = dateToPostedStr(d)
    let header = (
        <Tooltip followCursor title={props.tss.name}>
            <Box className='title-header'>
                <Typography noWrap variant='body2'>{props.tss.name}</Typography>
                <Typography noWrap variant='caption'>{`By ${username}, ${pd}`}</Typography>
            </Box>
        </Tooltip>
    )
    let socialBox = <SocialBox comments={props.tss.comments.length} likes={props.tss.likes.length} views={props.tss.views} />
    const content = <img id='tile-preview' src={imageURL} alt={props.tss.id}/>
    return (
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
    )
}