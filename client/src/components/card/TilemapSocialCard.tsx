import { useContext, useEffect, useState } from "react"
import { SocialContext } from "src/context/social"
import { TilemapSocial } from "@types"
import AxiosApi from "src/api/axios/AxiosApi"
import { dateToPostedStr } from "../util/DateUtils"
import { Card, CardActionArea, ImageListItem, Tooltip, Typography } from "@mui/material"
import { Box } from "@mui/system"
import SocialBox from "./SocialBox"

export default function TilemapSocialCard(props: {tms: TilemapSocial, size?: number}) {
    const social = useContext(SocialContext)
    const [username, setUsername] = useState<string>('')
    useEffect(() => {
        social.getUserById(props.tms.owner).then(x => {
            if (x) setUsername(x.username)
        })
    }, [social])
    const imageURL = AxiosApi.getUri() + `/media/${props.tms.imageURL}`
    let date = new Date(props.tms.publishDate)
    let postedDate = dateToPostedStr(date)
    let header = (
        <Tooltip followCursor title={props.tms.name}>
            <Box className='title-header'>
                <Typography noWrap variant='body2'>{props.tms.name}</Typography>
                <Typography noWrap variant='caption'>{`By ${username}, ${postedDate}`}</Typography>
            </Box>
        </Tooltip>
    )
    let socialBox = <SocialBox comments={props.tms.comments.length} likes={props.tms.likes.length} views={props.tms.views} />
    let content = <img id='tile-preview' src={imageURL} alt={props.tms.id} />
    if (props.size) content = <img style={{height: props.size}} src={imageURL} alt={props.tms.id} />
    return (
        <Card
            onClick={() => social.viewTilemapSocial(props.tms)}
            sx={{boxShadow: 3}}
        >
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