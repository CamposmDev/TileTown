import { Edit } from "@mui/icons-material";
import { Box, Card, CardActionArea, Icon, ImageListItem, Tooltip, Typography } from "@mui/material";
import { Tileset } from "@types";
import axios from "axios";
import { useEffect, useState } from "react";
import AxiosApi from "src/api/axios/AxiosApi";
import './default.css'

export default function TilesetCard(props: 
    {
        tileset: Tileset
    }) {
    const [open, setOpen] = useState(false)
    useEffect(() => {

    }, [])

    if (props.tileset.isPublished) {
        return (
            <Card>
                <CardActionArea>
                    TODO
                </CardActionArea>
            </Card>
        )
    }

    const header =
        <Tooltip followCursor title={props.tileset.name}>
            <Box className='title-header'>
                <Typography noWrap variant='body2'>{props.tileset.name}</Typography>
            </Box>
        </Tooltip>  
    return (
        <Box>
            <Card
                sx={{boxShadow: 3}}>
                <CardActionArea>
                    <ImageListItem>
                        {header}
                        <img id='tile-preview' src={AxiosApi.getUri() + `/media/${props.tileset.image}`}/>
                    </ImageListItem>
                </CardActionArea>
            </Card>
        </Box>
    )
}

