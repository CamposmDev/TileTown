import { Box, Card, CardActionArea, ImageListItem, Tooltip, Typography } from "@mui/material";
import { Tileset, TilesetSocial } from "@types";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AxiosApi from "src/api/axios/AxiosApi";
import { AuthContext } from "src/context/auth";
import { ProfileContext } from "src/context/profile";
import { SocialContext } from "src/context/social";
import './default.css'
import SocialBox from "./SocialBox";

export default function TilesetCard(props: {tilesetId: string}) {
    const auth = useContext(AuthContext)
    const prof = useContext(ProfileContext)
    const nav = useNavigate()
    const [tileset, setTileset] = useState<Tileset | undefined>(undefined)
    const social = useContext(SocialContext)
    useEffect(() => {
        async function aux() {
            let tileset = await social.getTilesetById(props.tilesetId)
            if (tileset) {
                setTileset(tileset)
            }
        }
        aux()
    }, [])
    if (tileset) {
        let usr = auth.getUsr()
        /** If I'm not the owner of the tileset and it's not published, then don't show it */
        if (usr) {
            if (usr.id.localeCompare(tileset.owner) !== 0 && !tileset.isPublished) {
                return <div/>
            }
        }
        const socialBox = <SocialBox comments={0} likes={0} views={0} />
        const imageURL = AxiosApi.getUri() + `/media/${tileset.image}`
        const header =
            <Tooltip followCursor title={tileset.name}>
                <Box className='title-header'>
                    <Typography noWrap variant='body2'>{tileset.name}</Typography>
                </Box>
            </Tooltip>
        const content = <img id='tile-preview' src={imageURL}/>
        if (prof.state.viewUnpublishedTilesets) {
            if (tileset.isPublished) {
                return <div></div>
            } else {
                return (
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
                )
            }
        }
        return (
            <Card
                onClick={() => {
                    if (!tileset.isPublished) {
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
        )
    } else {
        return <div/>
    }
}

