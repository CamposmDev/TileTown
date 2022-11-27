import {
  Box,
  Card,
  CardActionArea,
  ImageListItem,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { Tileset, TilesetSocial } from "@types";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AxiosApi from "src/api/axios/AxiosApi";
import { TilesetApi } from "src/api";
import { AuthContext } from "src/context/auth";
import "./default.css";
import { SocialContext } from "src/context/social";

export default function TilesetCard(props: { tilesetId: string }) {
  const auth = useContext(AuthContext);
  const nav = useNavigate();
  const [tileset, setTileset] = useState<Tileset | undefined>(undefined);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const social = useContext(SocialContext);
  useEffect(() => {
    async function aux() {
      await social.getTilesetById(props.tilesetId).then((res) => {
        if (res) {
          setTileset(res);
          setIsPublished(res.isPublished);
        }
      });
      if (!isPublished) return;
    }
    aux();
    if (!isPublished) return;
  }, [isPublished]);
  if (tileset) {
    console.log(tileset);
    let usr = auth.getUsr();
    /** If I'm not the owner of the tileset and it's not published, then don't show it */
    if (usr) {
      if (usr.id.localeCompare(tileset.owner) !== 0 && !tileset.isPublished) {
        return <div />;
      }
    }
    const imageURL = AxiosApi.getUri() + `/media/${tileset.image}`;
    let header = (
      <Tooltip followCursor title={tileset.name}>
        <Box className="title-header">
          <Typography noWrap variant="body2">
            {tileset.name}
          </Typography>
        </Box>
      </Tooltip>
    );
    const content = <img id="tile-preview" src={imageURL} />;
    {
      return (
        <Card
          onClick={() => {
            nav(`/create/tileset/${tileset.id}`);
          }}
          sx={{ boxShadow: 3 }}
        >
          <CardActionArea>
            <ImageListItem>
              {header}
              {content}
            </ImageListItem>
          </CardActionArea>
        </Card>
      );
    }
  }
  return <LinearProgress />;
}
