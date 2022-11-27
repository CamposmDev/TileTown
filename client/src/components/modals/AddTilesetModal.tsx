import { useContext } from "react";

import { ModalContext } from "src/context/modal";
import { AuthContext } from "src/context/auth";
import { Dialog } from "@mui/material";
import AddTilesetCard from "../card/AddTilesetCard";

const AddTilesetModal = () => {
  const modal = useContext(ModalContext);
  const auth = useContext(AuthContext);

  const user = auth.getUsr();

  const handleClose = () => {
    modal.close();
  };

  const tilesets = user ? user.tilesets : [];
  const ui = (
    <Dialog open={modal.getModal().showAddTilesetModal} onClose={handleClose}>
      {tilesets.map((id) => {
        return (
          <AddTilesetCard tilesetId="id" key={"CardId " + id}></AddTilesetCard>
        );
      })}
    </Dialog>
  );
  return <div>{ui}</div>;
};

export default AddTilesetModal;
