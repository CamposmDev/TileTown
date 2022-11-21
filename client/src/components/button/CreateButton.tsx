import { Menu, MenuItem, MenuItemProps } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModalContext } from "src/context/modal";
import { ProfileContext } from "src/context/profile";
import { MENU_PAPER_PROPS } from "../util/Constants";

const CreateButton = (props: MenuItemProps) => {
  const prof = useContext(ProfileContext)
  const modal = useContext(ModalContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const nav = useNavigate()

  const handleMenuOpen = (event: any) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const showCreateCommunityModal = () => {
    modal.showCreateCommunityModal();
    handleMenuClose();
  };

  const showCreateContestModal = () => {
    modal.showCreateContestModal();
    handleMenuClose();
  };

  const showCreateTilesetModal = () => {
    modal.showUploadTilesetModal();
    handleMenuClose();
  };

  const menu = (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      PaperProps={MENU_PAPER_PROPS}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/create/tilemap">
        Tilemap
      </MenuItem>
      <MenuItem onClick={showCreateTilesetModal}>Tileset</MenuItem>
      <MenuItem onClick={() => {
        prof.viewUnpublishedTilesets()
        handleMenuClose()
      }}>View Unpublished Tilesets</MenuItem>
      <MenuItem onClick={showCreateCommunityModal}>Community</MenuItem>
      <MenuItem onClick={showCreateContestModal}>Contest</MenuItem>
    </Menu>
  );

  return (
    <>
      <MenuItem
        {...props}
        sx={{ mr: 2, fontSize: 20 }}
        onClick={handleMenuOpen}
      >
        Create
      </MenuItem>
      {menu}
    </>
  );
};

export default CreateButton;
