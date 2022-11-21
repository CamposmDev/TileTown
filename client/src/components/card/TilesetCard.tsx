import { Box, Card, CardActionArea, ImageListItem, Tooltip, Typography } from "@mui/material";
import { Tileset } from "@types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AxiosApi from "src/api/axios/AxiosApi";
import './default.css'

export default function TilesetCard(props: {tileset: Tileset}) {
    const nav = useNavigate()
    useEffect(() => {
        
    }, [])
    const header =
        <Tooltip followCursor title={props.tileset.name}>
            <Box className='title-header'>
                <Typography noWrap variant='body2'>{props.tileset.name}</Typography>
            </Box>
        </Tooltip>  
    const content = <img id='tile-preview' src={AxiosApi.getUri() + `/media/${props.tileset.image}`}/>
    if (props.tileset.isPublished) {
        return (
            <Card>
                <CardActionArea>
                    {header}
                    {content}
                </CardActionArea>
            </Card>
        )
    }
    return (
        <Card
            onClick={() => {
                nav(`/create/tileset/${props.tileset.id}`)
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

