import {
  Box,
  Card,
  CardActionArea,
  ImageListItem,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useEffect } from "react";
import "./default.css";
import { ModalContext } from "src/context/modal";
import { SnackContext } from "src/context/snack";
import { TilemapEditContext } from "src/context/tilemapEditor";
import { TilesetApi } from "src/api";

export default function TilesetCard(props: {
  tilesetId: string;
  name: string;
  imageURL: string;
}) {
  const edit = useContext(TilemapEditContext);
  const modal = useContext(ModalContext);
  const snack = useContext(SnackContext);

  useEffect(() => {}, []);

  let header = (
    <Tooltip followCursor title={props.name}>
      <Box className="title-header">
        <Typography noWrap variant="body2">
          {props.name}
        </Typography>
      </Box>
    </Tooltip>
  );
  const content = <img id="tile-preview" src={props.imageURL} />;
  {
    return (
      <Card
        onClick={() => {
          edit.addTileset(props.tilesetId, snack);
          modal.close();
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

  return <LinearProgress />;
}
