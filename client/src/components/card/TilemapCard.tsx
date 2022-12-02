import { Box, Card, CardActionArea, CircularProgress, Fade, ImageListItem, LinearProgress, Tooltip, Typography } from "@mui/material";
import { AuthContext } from "src/context/auth";
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router";
import { Tilemap, TilemapSocial, TilesetSocial } from "@types";
import { SocialContext } from "src/context/social";
import TilemapSocialCard from "./TilemapSocialCard";
import AxiosApi from "src/api/axios/AxiosApi";

export default function TilemapCard(props: {tilemapId: string}) {
    const auth = useContext(AuthContext)
    const social = useContext(SocialContext)
    const nav = useNavigate()
    const [tilemap, setTilemap] = useState<Tilemap | undefined>(undefined)
    const [tms, setTMS] = useState<TilemapSocial | undefined>(undefined)
    const [username, setUsername] = useState<string>('')
    useEffect(() => {
        social.getTilemapById(props.tilemapId).then(tilemap => {
            if (tilemap) {
                setTilemap(tilemap)
                if (tilemap.isPublished) {
                    social.getTilemapSocialByTilemapId(tilemap.id).then(s => setTMS(s))
                }
                social.getUserById(tilemap.owner).then(x => {
                    if (x) setUsername(x.username)
                })
            }
        })
    }, [social, props.tilemapId])

    if (!tilemap) return <LinearProgress/>
    let usr = auth.usr
    /** If I'm not the owner of the tilemap and it's not published, then don't show it */
    if (usr) {
        if ((usr.id.localeCompare(tilemap.owner) !== 0 && !tilemap.isPublished) && tilemap.collaborators.indexOf(usr.id) === -1) {
            return <div/>
        }
    }
    if (tms) {
        return <TilemapSocialCard tms={tms} />
    }
    
    const handleClick = () => {
        nav(`/create/tilemap/${tilemap.id}`)
    }

    
    let header = (
        <Tooltip followCursor title={tilemap.name}>
            <Box className={'title-header'}>
                <Typography noWrap variant='body2'>{tilemap.name}</Typography>
                <Typography noWrap variant='caption'>{`By ${username}`}</Typography>
            </Box>
        </Tooltip>
    )

    const imageURL = AxiosApi.getUri() + `/media/${tilemap.image}`
    const content = <img id='tile-preview' src={imageURL} alt={`Failed to get ${tilemap.image}`}/>

    return (
        <Fade in={true} timeout={1000}>
            <Card onClick={handleClick} sx={{boxShadow: 3}}>
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