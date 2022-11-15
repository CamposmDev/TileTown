import { Menu, MenuItem, MenuItemProps } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ModalContext } from "src/context/modal";

const MENU_PAPER_PROPS = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 40,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

const CreateButton = (props: MenuItemProps) => {
  const modal = useContext(ModalContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
        Create Tilemap
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/create/tileset">
        Create Tileset
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
        My Tilemaps
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
        My Tilesets
      </MenuItem>
      <MenuItem onClick={showCreateCommunityModal}>Create Community</MenuItem>
      <MenuItem onClick={showCreateContestModal}>Create Contest</MenuItem>
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
