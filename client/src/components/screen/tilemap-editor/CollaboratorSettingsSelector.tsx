import {
  FormControl,
  Stack,
  FormControlLabel,
  TextField,
  InputAdornment,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useContext } from "react";
import { TilemapEditContext } from "src/context/tilemapEditor";
import { SnackContext } from "src/context/snack";
import {
  CollaboratorSettings,
  EditMode,
} from "src/context/tilemapEditor/TilemapEditTypes";
import { FloodRounded } from "@mui/icons-material";

const CollaboratorSettingsSelector = () => {
  const edit = useContext(TilemapEditContext);
  const snack = useContext(SnackContext);

  const collaboratorSettings = edit.state.Tilemap.collaboratorSettings;

  return (
    <Stack pl={1} pr={1} spacing={1} direction="column" alignItems="center">
      <FormControl>
        <RadioGroup row={true}>
          <FormControlLabel
            labelPlacement="start"
            value="free-edit"
            control={<Radio />}
            label="Free Edit"
            checked={collaboratorSettings.editMode === "free"}
            onChange={() => {
              edit.updateTilemap({
                collaboratorSettings: {
                  editMode: "free",
                  timeLimit: collaboratorSettings.timeLimit,
                  tileLimit: collaboratorSettings.tileLimit,
                },
              });
            }}
          />
          <FormControlLabel
            labelPlacement="start"
            value="queue"
            control={<Radio />}
            label="Queue"
            checked={collaboratorSettings.editMode === "queue"}
            onChange={() => {
              edit.updateTilemap({
                collaboratorSettings: {
                  editMode: "queue",
                  timeLimit: collaboratorSettings.timeLimit,
                  tileLimit: collaboratorSettings.tileLimit,
                },
              });
            }}
          />
        </RadioGroup>
      </FormControl>
      <TextField
        label="Time Limit"
        fullWidth
        size="small"
        value={collaboratorSettings.timeLimit}
        onChange={(e) => {
          if (
            isNaN(Number(e.target.value)) ||
            Number(e.target.value) > 120 ||
            Number(e.target.value) < 0
          ) {
            snack.showErrorMessage(
              "Please Enter A Time Between 120 To 0 Minutes"
            );
            return;
          }
          if (Number(e.target.value) === 0)
            snack.showInfoMessage(
              "0 Minutes Means Collaborators Can Edit For As Long As They Want"
            );
          edit.updateTilemap({
            collaboratorSettings: {
              editMode: collaboratorSettings.editMode,
              timeLimit: Math.floor(Number(e.target.value)),
              tileLimit: collaboratorSettings.tileLimit,
            },
          });
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">minutes</InputAdornment>
          ),
        }}
      />
      <TextField
        label="Tile Limit"
        fullWidth
        size="small"
        value={collaboratorSettings.tileLimit}
        onChange={(e) => {
          if (
            isNaN(Number(e.target.value)) ||
            Number(e.target.value) > 120 ||
            Number(e.target.value) < 0
          ) {
            snack.showErrorMessage(
              "Please Enter A Number Between 120 To 0 Tiles"
            );
            return;
          }
          if (Number(e.target.value) === 0)
            snack.showInfoMessage(
              "0 Tiles Means Collaborators Can Use As Many Tiles As They Want"
            );
          edit.updateTilemap({
            collaboratorSettings: {
              editMode: collaboratorSettings.editMode,
              timeLimit: collaboratorSettings.timeLimit,
              tileLimit: Math.floor(Number(e.target.value)),
            },
          });
        }}
        InputProps={{
          endAdornment: <InputAdornment position="start">tiles</InputAdornment>,
        }}
      />
    </Stack>
  );
};

export default CollaboratorSettingsSelector;
