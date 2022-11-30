import { Box, Card, CardActionArea, Fade, ImageListItem, LinearProgress, Tooltip, Typography } from "@mui/material";
import { Tileset, TilesetSocial } from "@types";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AxiosApi from "src/api/axios/AxiosApi";
import { AuthContext } from "src/context/auth";
import { ProfileContext } from "src/context/profile";
import { SocialContext } from "src/context/social";
import { dateToPostedStr } from "../util/DateUtils";
import './default.css'
import SocialBox from "./SocialBox";

export default function TilesetCard(props: {tilesetId: string}) {
    const auth = useContext(AuthContext)
    const prof = useContext(ProfileContext)
    const nav = useNavigate()
    const [tileset, setTileset] = useState<Tileset | undefined>(undefined)
    const [tilesetSocial, setTilesetSocial] = useState<TilesetSocial | undefined>(undefined)
    const [username, setUsername] = useState<string>('')
    const social = useContext(SocialContext)
    useEffect(() => {
        async function aux() {
            let tileset = await social.getTilesetById(props.tilesetId)
            if (tileset) {
                setTileset(tileset)
                social.getUserById(tileset.owner).then(x => {
                    if (x) setUsername(x.username)
                })
                if (tileset.isPublished) social.getTilesetSocialByTilesetId(tileset.id).then(s => setTilesetSocial(s))
            }
        }
        aux()
    }, [social])
    if (tileset) {
        let usr = auth.usr
        /** If I'm not the owner of the tileset and it's not published, then don't show it */
        if (usr) {
            if (usr.id.localeCompare(tileset.owner) !== 0 && !tileset.isPublished) {
                return <div/>
            }
        }
        const imageURL = AxiosApi.getUri() + `/media/${tileset.image}`
        let header =
            <Tooltip followCursor title={tileset.name}>
                <Box className='title-header'>
                    <Typography noWrap variant='body2'>{tileset.name}</Typography>
                    <Typography noWrap variant='caption'>{`By ${username}`}</Typography>
                </Box>
            </Tooltip>
        const content = <img id='tile-preview' src={imageURL}/>
        if (prof.state.viewUnpublishedTilesets) {
            if (tileset.isPublished) {
                return <div/>
            } else {
                return (
                    <Fade in={true} timeout={1500}>
                    <Card
                        onClick={() => {
                            nav(`/create/tileset/${tileset.id}`)
                        }}
                        sx={{boxShadow: 3}}>
                        <CardActionArea>
                            <ImageListItem>
                                {header}
                                {content}
                            </ImageListItem>
                        </CardActionArea>
                    </Card>
                    </Fade>
                )
            }
        }
        let socialBox = <Box/>
        if (tilesetSocial) {
            let d = new Date(tilesetSocial.publishDate)
            let pd = dateToPostedStr(d)
            header = (
                <Tooltip followCursor title={tileset.name}>
                    <Box className='title-header'>
                        <Typography noWrap variant='body2'>{tileset.name}</Typography>
                        <Typography noWrap variant='caption'>{`By ${username}, ${pd}`}</Typography>
                    </Box>
                </Tooltip>
            )
            socialBox = <SocialBox comments={tilesetSocial.comments.length} likes={tilesetSocial.likes.length} views={tilesetSocial.views} />
        }
        return (
            <Fade in={true} timeout={1000}>
            <Card
                onClick={() => {
                    if (tileset.isPublished) {
                        if (tilesetSocial) social.viewTilesetSocial(tilesetSocial)
                    } else {
                        nav(`/create/tileset/${tileset.id}`)
                    }
                }}
                sx={{boxShadow: 3}}>
                <CardActionArea>
                    <ImageListItem>
                        {header}
                        {tileset.isPublished ? socialBox : <div/>}
                        {content}
                    </ImageListItem>
                </CardActionArea>
            </Card>
            </Fade>
        )
    }
    return <LinearProgress/>
}

