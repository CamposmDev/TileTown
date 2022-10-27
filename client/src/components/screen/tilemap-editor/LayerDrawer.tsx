import { Add, ControlPointDuplicate, CopyAll, Copyright, Delete, Layers, Settings } from "@mui/icons-material"
import { Button, Divider, Drawer, FormControl, FormControlLabel, IconButton, InputAdornment, List, ListItem, Radio, RadioGroup, Stack, TextField, Tooltip, Typography } from "@mui/material"

const LayerDrawer = () => {
    let numOfCollaborators = 2
    return (
        <Drawer open={true} anchor='right' variant='permanent' PaperProps={{sx: { mt: 15 }}}>
            <Stack pl={1} pr={1} direction='row' alignItems='center' width={300}>
                <Typography flexGrow={1}>Layer</Typography>
                <Tooltip title='Add Layer' arrow>
                    <IconButton color='primary'><Add/></IconButton>
                </Tooltip>
                <Tooltip title='Duplicate Layer' arrow>
                    <IconButton color='primary'><Layers/></IconButton>
                </Tooltip>
                <Tooltip title='Delete Layer' arrow>
                    <IconButton color='error'><Delete/></IconButton>
                </Tooltip>
            </Stack>
            <Divider/>
            <Stack p={1} spacing={2}>

            </Stack>
            <Stack pl={1} pr={1} direction='row' alignItems='center'>
                <Typography flexGrow={1}>Collaborators&ensp;({numOfCollaborators})</Typography>
                <Tooltip title='Add Collaborator' arrow>
                    <IconButton color='primary'><Add/></IconButton>
                </Tooltip>
            </Stack>
            <Divider/>
            <Stack p={1}>
                <List>
                    <ListItem>
                        
                    </ListItem>
                </List>
            </Stack>
            <Stack pl={1} pr={1} direction='row' alignItems='center'>
                <Typography flexGrow={1}>Collaborator Settings</Typography>
                {/* <Tooltip arrow> */}
                    <IconButton color='primary'><Settings/></IconButton>
                {/* </Tooltip> */}
            </Stack>
            <Divider/>
            <Stack pl={1} pr={1} spacing={1} direction='column' alignItems='center'>
                <FormControl>
                    <RadioGroup row={true}>
                        <FormControlLabel
                            labelPlacement='start'
                            value='free-edit'
                            control={<Radio/>}
                            label='Free Edit'
                        />
                        <FormControlLabel
                            labelPlacement='start'
                            value='queue'
                            control={<Radio/>}
                            label='Queue'
                        />
                    </RadioGroup>
                </FormControl>
                <TextField label='Time Limit' fullWidth size='small' 
                    InputProps={{
                        endAdornment: <InputAdornment position="start">minutes</InputAdornment>,
                    }}/>
                <TextField label='Tile Limit' fullWidth size='small' 
                    InputProps={{
                        endAdornment: <InputAdornment position="start">tiles</InputAdornment>,
                    }}/>
            </Stack>
        </Drawer>
    )
}

export default LayerDrawer