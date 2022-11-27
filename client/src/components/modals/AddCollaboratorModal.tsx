import { TilemapEditContext } from "src/context/tilemapEditor";
import { SnackContext } from "src/context/snack";
import { ModalContext } from "src/context/modal";
import { useState, useContext } from "react";
import { UserApi } from "src/api";
import { User } from "@types";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  Grid,
  Icon,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Book, Remove } from "@mui/icons-material";
import axios from "axios";
import UserProfileBox from "../UserProfileBox";
import { editableInputTypes } from "@testing-library/user-event/dist/utils";

const AddCollaboratorModal = () => {
  const edit = useContext(TilemapEditContext);
  const snack = useContext(SnackContext);
  const modal = useContext(ModalContext);

  const [users, setUsers] = useState<User[]>([]);
  const [collaborators, setCollaborators] = useState<
    {
      id: string;
      username: string;
    }[]
  >([]);
  const [userName, setUserName] = useState<string>("");

  const handleClose = () => {
    setCollaborators([]);
    modal.close();
  };

  const handleKeyPress = (event: any): void => {
    if (event.code === "Enter") {
      loadUsers(event);
    }
  };
  const loadUsers = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    UserApi.getUsers({ username: e.target.value })
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data.users);
          snack?.showSuccessMessage(res.data.message);
        }
      })
      .catch((e) => {
        if (axios.isAxiosError(e) && e.response) {
          snack?.showErrorMessage(e.response.data.message);
        }
      });
  };

  const addCollaborator = (id: string, username: string): void => {
    setCollaborators([...collaborators, { id, username }]);
  };
  const removeCollaborator = (id: string) => {
    setCollaborators(
      [...collaborators].filter((collaborator) => {
        return collaborator.id !== id;
      })
    );
  };

  const addCollaboratorsAndClose = (): void => {
    edit.addCollaborators(collaborators);
    snack.showSuccessMessage(
      "Collaborator Have Been Added, Please Save Your Tilemap To Finalize"
    );
    handleClose();
  };

  const UserCards = users.map((user, index) => {
    return (
      <Stack sx={{ m: 1 }} direction="row">
        <UserProfileBox
          firstName={user.firstName}
          lastName={user.lastName}
          username={user.username}
          key={"UserProfileBox " + index}
        ></UserProfileBox>
        <IconButton
          color="primary"
          key={"AddCollab " + index}
          onClick={() => {
            addCollaborator(user.id, user.username);
          }}
          disabled={collaborators.some((collaborator) => {
            return collaborator.id === user.id;
          })}
        >
          <Add />
        </IconButton>
        <IconButton
          color="primary"
          key={"RemoveCollab " + index}
          onClick={() => {
            removeCollaborator(user.id);
          }}
          disabled={
            !collaborators.some((collaborator) => {
              return collaborator.id === user.id;
            })
          }
        >
          <Remove />
        </IconButton>
      </Stack>
    );
  });

  const ui = (
    <Dialog
      open={modal.getModal().showAddCollaboratorModal}
      onClose={handleClose}
    >
      <Box textAlign="center" mt={1} mb={1} ml={2} mr={2}>
        <Avatar
          sx={{
            bgcolor: "secondary.main",
            justifyItems: "center",
            margin: "auto",
          }}
        >
          <Icon>
            <Book />
          </Icon>
        </Avatar>
        <Typography sx={{ fontWeight: "bold" }} variant="h6" component="h2">
          Invite a Collaborator
        </Typography>
        <TextField
          sx={{ width: 352 }}
          margin="normal"
          fullWidth
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          onBlur={loadUsers}
          onKeyPress={handleKeyPress}
          label="Search by username"
        />
      </Box>
      <Grid
        container
        spacing={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {UserCards}
      </Grid>
      <Box textAlign="center" mt={1} mb={1} ml={2} mr={2} m={1}>
        <Button
          sx={{ m: 1 }}
          variant="contained"
          disabled={collaborators.length === 0}
          onClick={addCollaboratorsAndClose}
        >
          Invite
        </Button>
        <Button sx={{ m: 1 }} variant="contained" onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
  return <div>{ui}</div>;
};

export default AddCollaboratorModal;
