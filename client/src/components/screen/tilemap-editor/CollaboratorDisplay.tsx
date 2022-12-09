import { useEffect, useState, useContext } from "react";
import { AuthContext } from "src/context/auth";
import { SnackContext } from "src/context/snack";
import { TilemapEditContext } from "src/context/tilemapEditor";
import { UserApi } from "src/api";
import axios from "axios";
import { Grid, Stack, Toolbar, Typography } from "@mui/material";

const CollaboratorDisplay = () => {
  const auth = useContext(AuthContext);
  const edit = useContext(TilemapEditContext);
  const snack = useContext(SnackContext);

  const user = auth ? auth.usr : undefined;
  const id = user ? user.id : undefined;

  const collaboratorIndex = edit.state.Tilemap.collaboratorIndex;

  const collaboratorNames = edit.state.Tilemap.collaboratorNames;

  const nextCollaboratorIndex =
    collaboratorIndex === collaboratorNames.length ? 0 : collaboratorIndex + 1;

  const collaboratorSettings = edit.state.Tilemap.collaboratorSettings;

  const editMode = collaboratorSettings.editMode;

  const timeLimit = collaboratorSettings.timeLimit;
  const tileLimit = collaboratorSettings.tileLimit;

  const tilesLeft = tileLimit - edit.state.tileCount;

  const [timeLeft, setTimeLeft] = useState(edit.state.timeLeft * 60);

  const [ownerName, setOwnerName] = useState("");

  useEffect(() => {
    if (ownerName === "") {
      UserApi.getUserById(edit.state.Tilemap.owner)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.user.username);
            setOwnerName(res.data.user.username);
          }
        })
        .catch((e) => {
          if (axios.isAxiosError(e) && e.response) {
            snack?.showErrorMessage(e.response.data.message);
          }
        });
    }
    if (timeLeft > 0) {
      setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
  });

  const currentCollaboratorName =
    collaboratorIndex === 0
      ? ownerName
      : collaboratorNames[collaboratorIndex - 1];
  const nextCollaboratorName =
    nextCollaboratorIndex === 0
      ? ownerName
      : collaboratorNames[nextCollaboratorIndex - 1];
  const time =
    timeLimit === 0 ? (
      <div></div>
    ) : (
      <Typography>
        Time Left:&ensp;
        {Math.floor(timeLeft / 60) +
          ":" +
          (timeLeft - Math.floor(timeLeft / 60) * 60)}
      </Typography>
    );

  const tile =
    tileLimit === 0 ? (
      <div></div>
    ) : (
      <Typography>Tiles Left:&ensp;{tilesLeft}</Typography>
    );
  const next =
    editMode === "free" ? (
      <div></div>
    ) : (
      <Typography>Next:&ensp;{nextCollaboratorName}</Typography>
    );

  return (
    <Toolbar sx={{ boxShadow: 1 }} variant="dense">
      <Grid container direction="column" alignContent="center">
        <Stack direction="row" spacing={4}>
          {time}
          {tile}
          <Typography>Current:&ensp;{currentCollaboratorName}</Typography>
          {next}
        </Stack>
      </Grid>
    </Toolbar>
  );
};

export default CollaboratorDisplay;
