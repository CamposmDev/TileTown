import { useContext, useEffect, useState } from "react";

import { ModalContext } from "src/context/modal";
import { AuthContext } from "src/context/auth";
import { Button, Dialog, DialogTitle, Grid } from "@mui/material";
import AddTilesetCard from "../card/AddTilesetCard";
import { UserApi } from "src/api";
import { TilesetSocial } from "@types";
import AxiosApi from "src/api/axios/AxiosApi";

const AddTilesetModal = () => {
  const modal = useContext(ModalContext);
  const auth = useContext(AuthContext);

  const [tilesets, setTilesets] = useState<TilesetSocial[]>([]);

  const user = auth.usr;
  const hostURL = AxiosApi.getUri() + `/media/`;

  useEffect(() => {
    if (user) {
      UserApi.getUsersPublishedTilesets(user.id).then((res) => {
        if (res.data.socials) setTilesets(res.data.socials);
      });
    }
  }, [modal.getModal().showAddTilesetModal]);

  const handleClose = () => {
    modal.close();
  };
  const cards = tilesets ? (
    tilesets.map((tileset) => {
      return (
        <Grid item xs={6}>
          <AddTilesetCard
            tilesetId={tileset.tileset}
            key={"CardId " + tileset.id}
            name={tileset.name}
            imageURL={hostURL + tileset.imageURL}
          ></AddTilesetCard>
        </Grid>
      );
    })
  ) : (
    <div></div>
  );

  const ui = (
    <Dialog open={modal.getModal().showAddTilesetModal} onClose={handleClose}>
      <DialogTitle>Select A Tileset To Add To Your Tilemap</DialogTitle>
      <Grid container mr={2} ml={2} spacing={2}>
        {cards}
      </Grid>
      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          variant="contained"
          sx={{ m: 1 }}
          onClick={() => {
            modal.close();
          }}
        >
          Cancel
        </Button>
      </Grid>
    </Dialog>
  );
  return <div>{ui}</div>;
};

export default AddTilesetModal;
